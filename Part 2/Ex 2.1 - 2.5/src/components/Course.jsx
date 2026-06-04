const Header = (props) => {
  console.log(props)
  return <h1>{props.name}</h1>
}

const Part = (props) => {
  console.log(props)
  return (
    <li>
      {props.name} {props.exercises}
    </li>
  )
}

const Content = (props) => {
  return (
    <div>
      <ul>
        {props.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
      </ul>
    </div>
  )
}


const Total = (props) => {
  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      Total of {total} exercises
    </div>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header name={props.course.name}/>
      <Content parts={props.course.parts}/>
      <Total parts={props.course.parts}/>
    </div>
  )
}

export default Course