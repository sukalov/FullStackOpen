const Input = ({caption, handler, value, required, tel=false}) =>
    <>
        {!tel ? 
            <div className="input-grid">
                {caption}<input type='text' onChange={handler} value={value} required={required} />
            </div> :
            <div className="input-grid" style={{marginBottom: '-8px'}}>
                {caption}<input type='tel' pattern="[\(]{0,1}\d{3}[\)\s\-]{0,2}\d{3}[\s\-]{0,2}\d{2}[\s\-]{0,1}\d{2}" onChange={handler} value={value} required={required} />
            </div> 
        }
    </>

export default Input