import Button from "./Button"
import dbService from "../services/dbService"

const ContactList = ({ persons, search, set }) => {
    const personsUpd = [...persons]
    const deleteContact = (person) => {
        const index = personsUpd.indexOf(person)
        if (window.confirm(`Are you sure you want to delete ${person.name} from conacts?`)) {
            dbService.del(person)
                .then(res => {
                    personsUpd.splice(index);
                    set(personsUpd);
                })
                .catch(e => console.log(e))
        }
    }
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
                    <td><Button text="delete" onClick={() => deleteContact(person)}/></td>
                </tr>
            )}
            </tbody>
            </table>
        </>
        )
}

export default ContactList