import axios from 'axios';
const url = '/api/persons';

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
    return result.then(res => {
        return res.data});
}

const del = (person) => {
    const result = axios.delete(`${url}/${person.id}`)
    return result
}

// eslint-disable-next-line
export default {getAll, create, update, del}