import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { signOut } from "firebase/auth";
import { db, auth } from "../config/firebase";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import './Home.css';

const Home = () => {
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "students"));
      const dataArr = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDataList(dataArr);
    };

    fetchData();
  }, []);

  const handleEdit = async (id) => {
    const newFirstName = prompt("Enter new first name:");
    const newLastName = prompt("Enter new last name:");
    const newEmail = prompt("Enter new email:");
    const newPassword = prompt("Enter new password:");
    const newGender = prompt("Enter new gender (boy/girl):");

    if (newFirstName && newLastName && newEmail && newPassword && newGender) {
      const docRef = doc(db, "students", id);
      await updateDoc(docRef, { firstName: newFirstName, lastName: newLastName, email: newEmail, password: newPassword, gender: newGender });

      setDataList(prevDataList =>
        prevDataList.map(data =>
          data.id === id ? { id, firstName: newFirstName, lastName: newLastName, email: newEmail, password: newPassword, gender: newGender } : data
        )
      );
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "students", id));
    setDataList(prevDataList => prevDataList.filter(data => data.id !== id));
  };

  return (
    <div className="home">
      <h1>Student List</h1>
      <table>
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
          {dataList.map(data => (
            <tr key={data.id}>
              <td>{data.firstName}</td>
              <td>{data.lastName}</td>
              <td>{data.email}</td>
              <td>{data.gender}</td>
              <td><button onClick={() => handleEdit(data.id)}>Edit</button></td>
              <td><button onClick={() => handleDelete(data.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="register-button" onClick={() => navigate("/register")}>Register New Student</button>
    </div>
  );
};

export default Home;
