import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../Config/Firebase';
import './SubjectList.css';

const SubjectList = () => {
  const [subjectList, setSubjectList] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "subjects"));
        const subjects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSubjectList(subjects);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, []);

  const handleEdit = async (id) => {
    const newSubjectName = prompt("Enter new subject name:");
    const newClass = prompt("Enter new class:");
    const newCourse = prompt("Enter new course (Information Technology/Programming Fundamentals/Computer Vision):");

    if (newSubjectName && newClass && newCourse) {
      try {
        const docRef = doc(db, "subjects", id);
        await updateDoc(docRef, {
          subjectName: newSubjectName,
          classNumber: newClass,
          course: newCourse
        });

        setSubjectList(subjectList.map(subject =>
          subject.id === id ? { id, subjectName: newSubjectName, classNumber: newClass, course: newCourse } : subject
        ));
      } catch (error) {
        console.error("Error updating subject:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      try {
        const docRef = doc(db, "subjects", id);
        await deleteDoc(docRef);
        setSubjectList(subjectList.filter(subject => subject.id !== id));
      } catch (error) {
        console.error("Error deleting subject:", error);
      }
    }
  };

  return (
    <div className="subject-list">
      <h1>Subject List</h1>
      <table>
        <thead>
          <tr>
            <th>Subject Name</th>
            <th>Class</th>
            <th>Course</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {subjectList.map(subject => (
            <tr key={subject.id}>
              <td>{subject.subjectName}</td>
              <td>{subject.classNumber}</td>
              <td>{subject.course}</td>
              <td>
                <button onClick={() => handleEdit(subject.id)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(subject.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubjectList;
