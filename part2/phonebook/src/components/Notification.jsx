const Notification = ({ message, status }) => {
    const style = {
        backgroundColor: 'lightgrey',
        marginBlock: '15px',
        paddingBlock: '5px',
        borderRadius: '5px'
    }
    if (status === 'good') {
        style.color = 'green';
        style.border = '3px solid green'
    } else {
        style.color = 'red';
        style.border = '5px solid red';
    }

    if (message === null) {
        return null;
    } else {
    return (
        <div style={style}>
            {message}
        </div>
    )}
}

export default Notification