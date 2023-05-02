import axios from 'axios';
const url = 'http://localhost:3001/persons';

const getAll = () => {
    const result = axios.get(url)
    return result.then(res => res.data);
}

const create = newPerson => {
    const result = axios.post(url, newPerson)
    return result.then(res => res.data);
}

const update = (person) => {
    const result = axios.put(`${url}/${person.id}`, person)
    return result.then(res => res.data);
}

const del = (person) => {
    const result = axios.delete(`${url}/${person.id}`)
    return result.then(res => res.data);

}

export default {getAll, create, update, del}