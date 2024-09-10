/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import db from '../Config/Firebase'
import './Home.css';

const TeacherList = () => {
  const [teacherList, setTeacherList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "teachers"));
        const dataArr = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTeacherList(dataArr);
      } catch (error) {
        console.error("Error fetching teachers: ", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = async (id) => {
    const newFirstName = prompt("Enter new first name:");
    const newLastName = prompt("Enter new last name:");
    const newEmail = prompt("Enter new email:");
    const newPassword = prompt("Enter new password:");
    const newGender = prompt("Enter new gender (male/female):");

    if (newFirstName && newLastName && newEmail && newPassword && newGender) {
      try {
        const docRef = doc(db, "teachers", id);
        await updateDoc(docRef, {
          firstName: newFirstName,
          lastName: newLastName,
          email: newEmail,
          password: newPassword,
          gender: newGender
        });

        setTeacherList(prevList => prevList.map((teacher) =>
          teacher.id === id ? { id, firstName: newFirstName, lastName: newLastName, email: newEmail, password: newPassword, gender: newGender } : teacher
        ));
      } catch (error) {
        console.error("Error updating teacher: ", error);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        const docRef = doc(db, "teachers", id);
        await deleteDoc(docRef);
        setTeacherList(prevList => prevList.filter((teacher) => teacher.id !== id));
      } catch (error) {
        console.error("Error deleting teacher: ", error);
      }
    }
  };

  return (
    <div className="home">
      <h1>Teacher List</h1>
      <button className="register-button" onClick={() => navigate("/teacher-register")}>Register New Teacher</button>
      <table className="teacher-list-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {teacherList.length > 0 ? (
            teacherList.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.firstName}</td>
                <td>{teacher.lastName}</td>
                <td>{teacher.email}</td>
                <td>{teacher.gender}</td>
                <td>
                  <button onClick={() => handleEdit(teacher.id)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(teacher.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No teachers available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherList;
