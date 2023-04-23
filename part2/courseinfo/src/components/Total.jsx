const Total = ({ parts }) => (
    <h4>
        Total: {parts.reduce(
                    (sum, part) =>  
                    sum + part.exercises, 0)
                }
    </h4>
)

export default Total