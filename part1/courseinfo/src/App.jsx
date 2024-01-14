


const Header = ({ course }) => {
  return (
    <div><h1>{course.name}</h1></div>

  )
}

const Part1 = ({ course }) => {
  const parts = course.parts
  return (
    <div>
      <p>
        {parts[0].name} {parts[0].excercises}
      </p>
    </div>

  )
}

const Part2 = ({ course }) => {
  const parts = course.parts
  return (
    <div>
      <p>
        {parts[1].name} {parts[1].excercises}
      </p>
    </div>

  )
}

const Part3 = ({ course }) => {
  const parts = course.parts
  return (
    <div>
      <p>
        {parts[2].name} {parts[2].excercises}
      </p>
    </div>

  )
}

const Content = ({ course }) => {
  return (
    <div>

      <Part1 course={course} />
      <Part2 course={course} />
      <Part3 course={course} />


    </div>
  )
}

const Total = ({ course }) => {
  const parts = course.parts
  return (
    <div><p>Numer of excercises {parts[0].excercises + parts[1].excercises + parts[2].excercises}</p>
    </div>
  )
}



function App() {
  const course = {
    name: "Half Stack application development",
    parts: [{
      name: "Fundamentals of React",
      excercises: 10
    },
    {
      name: 'Using props to pass data',
      excercises: 7
    },
    {
      name: 'State of a component',
      excercises: 14
    }]
  }



  return (

    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App
