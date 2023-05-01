import axios from 'axios';
const url = 'http://localhost:3001/persons';

const getAll = () => {
    const result = axios.get(url)
    return result.then(res => res.data).catch(e => console.log(e));
}

const create = newPerson => {
    const result = axios.post(url, newPerson)
    return result.then(res => res.data).catch(e => console.log(e));
}

const update = (person) => {
    const result = axios.put(`${url}/${person.id}`, person)
    return result.then(res => res.data).catch(e => console.log(e));
}

export default {getAll, create, update}