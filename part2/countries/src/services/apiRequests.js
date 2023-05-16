import axios from 'axios';
const url = 'https://restcountries.com/v3.1/'

const getAll = () => {
    const result = axios.get(`${url}all`)
    return result.then(res => res.data)
}

export {
    getAll
}