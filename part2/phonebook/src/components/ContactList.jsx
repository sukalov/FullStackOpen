const ContactList = ({ persons, search }) => {
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
                </tr>
            )}
            </tbody>
            </table>
        </>
        )
}

export default ContactList