import React from 'react';
import './Course.css';




const Course = ({ course }) => {
    const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);
   
    return (
      <div>
    <h1>{course.name}</h1>
    <ul>
      {course.parts.map(part => (
        <li key={part.id}>
          {part.name}: {part.exercises} exercises
        </li>
      ))}
    </ul>
    <p><strong>Total of {totalExercises} exercises</strong></p>
  </div>
  )
}
  
  export default Course;