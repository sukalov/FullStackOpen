const Input = ({caption, handler, value, required}) => 
    <div className="input-grid">
        {caption}<input type='text' onChange={handler} value={value} required={required} />
    </div>

export default Input