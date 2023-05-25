import dbService from "./dbService";

const filterAndSend = async (persons, newName, newNumber, set) => {
    const filter = persons.find(p => p.name === newName);
    const personsCopy = [...persons];
    const index = persons.indexOf(filter);

    if (filter) { // если такой человек уже есть
      if (filter.number === newNumber) { // если номер совпадает
        alert(`${newName}'s already in contacts with this number`)
    } else if // если номер не совпадает и человек подтвердит действие
    (window.confirm(`Are you sure you want to change the number for ${newName} from ${filter.number} to ${newNumber}`)) {
     const changedPerson = {name: filter.name, number: newNumber, id: filter.id}
     return dbService.update(changedPerson)
                     .then(res => {
                        personsCopy[index] = res;
                        set(personsCopy)
                        return res
                     })}
    } else {
    const newPerson = {name: newName, number: newNumber}
    return dbService.create(newPerson)
                    .then(res => {
                      set(personsCopy.concat(res))
                      return res
                    })
  } return new Promise (res => res)
}

export default filterAndSend