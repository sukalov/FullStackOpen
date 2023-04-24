const Input = ({caption, handler, value, required}) => 
    <div>
        {caption}&nbsp;<input type='text' onChange={handler} value={value} required={required} />
    </div>

export default Input