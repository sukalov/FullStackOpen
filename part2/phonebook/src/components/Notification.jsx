const Notification = ({ message, status }) => {
    const style = {
        backgroundColor: 'lightgrey',
        marginBlock: '10px',
        padding: '10px',
        borderRadius: '5px',
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translate(-50%, 0)'
    }
    if (status === 'good') {
        style.color = 'green';
        style.border = '2px solid green'
    } else {
        style.color = 'red';
        style.border = '4px solid red';
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