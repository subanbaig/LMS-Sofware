import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import './SubjectAdd.css';

const SubjectAdd = () => {
  const [subjectName, setSubjectName] = useState("");
  const [classNumber, setClassNumber] = useState("");
  const [course, setCourse] = useState("");
  const navigate = useNavigate();

  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      const newSubject = { subjectName, classNumber, course };
      await addDoc(collection(db, "subjects"), newSubject);

      // Store in local storage
      const storedSubjects = JSON.parse(localStorage.getItem("subjects")) || [];
      localStorage.setItem("subjects", JSON.stringify([...storedSubjects, newSubject]));

      navigate("/subject-list");
    } catch (error) {
      console.error("Error adding subject:", error);
    }
  };

  return (
    <div className="add-subject">
      <h1>Add New Subject</h1>
      <form onSubmit={handleAddSubject}>
        <input
          type="text"
          placeholder="Enter Subject Name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter Class"
          value={classNumber}
          onChange={(e) => setClassNumber(e.target.value)}
          required
        />
        <div className="radio-group">
          <h3>Select Course:</h3>
          <label>
            <input
              type="radio"
              name="course"
              value="Information Technology"
              checked={course === "Information Technology"}
              onChange={(e) => setCourse(e.target.value)}
              required
            />
            Information Technology
          </label>
          <label>
            <input
              type="radio"
              name="course"
              value="Programming Fundamentals"
              checked={course === "Programming Fundamentals"}
              onChange={(e) => setCourse(e.target.value)}
            />
            Programming Fundamentals
          </label>
          <label>
            <input
              type="radio"
              name="course"
              value="Computer Vision"
              checked={course === "Computer Vision"}
              onChange={(e) => setCourse(e.target.value)}
            />
            Computer Vision
          </label>
        </div>
        <button type="submit">Add Subject</button>
      </form>
    </div>
  );
};

export default SubjectAdd;
