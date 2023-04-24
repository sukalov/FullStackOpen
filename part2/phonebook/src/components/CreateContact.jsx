import Input from './Input'
import Button from './Button'

const CreateContact = ({ addPerson, handlerName, handlerNumber, name, number }) =>
        <>
            <h3>Create new contact</h3>
            <form onSubmit={addPerson}>
                <Input caption='name:' handler={handlerName} value={name} required={true} />
                <Input caption='number:' handler={handlerNumber} value={number} required={true} />
                <br />
                <Button type='submit' text='Add contact' />
            </form>
        </>

export default CreateContact