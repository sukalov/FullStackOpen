import dbService from "./dbService"

const deleteContact = (persons, set, setMessage, person) => {
    const personsUpd = [...persons]
    const index = personsUpd.indexOf(person)
    if (window.confirm(`Are you sure you want to delete ${person.name} from conacts?`)) {
        dbService.del(person)
            .then(res => {
                setMessage({message: 'Contact deleted successfully!', status:'good'});
                setTimeout(()=> setMessage({message: null}), 3000);
                personsUpd.splice(index, 0);
                set(personsUpd);
            })
            .catch(e => {
                setMessage({message: '404: contact already deleted'})
                setTimeout(()=> setMessage({message: null}), 3000)});
                personsUpd.splice(index, 1);
                set(personsUpd);
    }
}

export default deleteContact