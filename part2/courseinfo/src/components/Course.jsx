import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ courses }) => {
    return (
        <div>
          {courses.map(course => {
            return (
              <>
                <Header course={course.name} />
                <Content parts={course.parts} />
                <Total parts = {course.parts} />
              </>
            )
          })}
        </div>
      )
}

export default Course