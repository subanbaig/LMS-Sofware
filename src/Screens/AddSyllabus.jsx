// src/Screens/AddSyllabus.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from '../Config/Firebase';
import { collection, addDoc } from "firebase/firestore";
import './AddSyllabus.css';

const AddSyllabus = () => {
  const [subjectName, setSubjectName] = useState("");
  const [className, setClassName] = useState("");
  const [course, setCourse] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "syllabus"), { subjectName, className, course });
      localStorage.setItem("syllabus", JSON.stringify({ id: docRef.id, subjectName, className, course }));
      alert("Syllabus added successfully!");
      navigate("/syllabus-list");
    } catch (error) {
      console.error("Error adding syllabus:", error);
    }
  };

  return (
    <div className="add-syllabus">
      <h2>Add New Syllabus</h2>
      <form onSubmit={handleSubmit} className="add-syllabus-form">
        <label>Subject Name:</label>
        <input
          type="text"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          required
        />
        <label>Class:</label>
        <input
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
        />
        <label>Course:</label>
        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        >
          <option value="">Select a course</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Programming Fundamentals">Programming Fundamentals</option>
          <option value="Computer Vision">Computer Vision</option>
        </select>
        <button type="submit">Add Syllabus</button>
      </form>
    </div>
  );
};

export default AddSyllabus;
