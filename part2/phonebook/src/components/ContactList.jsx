import Button from "./Button"
import deleteContact from "../services/deleteContact"

const ContactList = ({ persons, search, set, setMessage }) => {
    return (
        <>
            <h3>Contacts</h3>
            <table>
            <tbody>
                {persons
                .filter(person => 
                person.name.toLowerCase()
                .match(search.toLowerCase()) !== null
                )
                .map(person =>
                <tr key={person.id}>
                    <td> {person.name}</td>
                    <td> {person.number}</td>
                    <td><Button text="delete" onClick={() => deleteContact(persons, set, setMessage, person)}/></td>
                </tr>
            )}
            </tbody>
            </table>
        </>
        )
}

export default ContactList