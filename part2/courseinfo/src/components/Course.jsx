import React from 'react'

const Header = ({ courseName }) => {
    return <h2>{courseName}</h2>
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}


const Content = ({ parts }) => {

    const totalEx = parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <div>
            {parts.map((part) => {
                return (
                    <Part key={part.id} part={part} />
                )
            })}
            <p>Total Exercises: {totalEx}</p>
        </div>
    )
}



const Course = ({ course }) => {
    console.log(course)
    return (
        <div>
            <Header courseName={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}

export default Course