import Input from './Input'
import Button from './Button'
import Validation from './Validation'

const CreateContact = ({ addPerson, handlerName, handlerNumber, name, number, numberValidation}) =>
        <>
            <h3>Create new contact</h3>
            <form onSubmit={addPerson} style={{position: 'relative'}}>
                <Input caption='name:' handler={handlerName} value={name} required={true} />
                <Input caption='number:' handler={handlerNumber} value={number} required={true} tel={true}/>
                {number === '' || <Validation status={numberValidation}></Validation>}
                <br />
                <Button type='submit' text='Add contact' />
            </form>
        </>

export default CreateContact