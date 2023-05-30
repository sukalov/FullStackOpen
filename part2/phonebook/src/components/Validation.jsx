const Validation = ({status, newNumber}) => {
    const style = {
        paddingLeft: 30,
        textAlign: 'right',
        margin: 0,
        fontSize: 'small',
        position: 'absolute',
        right: '10px'
    }
    if (!status) {style.color = 'red'}
    else {style.color = 'green'}

    return (
        <p style={style}>
            The phone number must have 10 digits
        </p>
    )
}

export default Validation;