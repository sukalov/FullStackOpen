
const Header = (props) =>(
  <h1>{props.course}</h1>
)

const Part = (props) => (
  <p>{props.part} {props.exercises}</p>
)

const Content = (props) => (
      <div>
        <Part part={props.data[0]} exercises={props.data[1]}/>
        <Part part={props.data[2]} exercises={props.data[3]}/>
        <Part part={props.data[4]} exercises={props.data[5]}/>
      </div>
    )

const Total = (props) => (
  <p>Number of exercises {props.exercisesTotal}</p>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content data={[part1, exercises1, part2, exercises2, part3, exercises3]} />
      <Total exercisesTotal = {exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App