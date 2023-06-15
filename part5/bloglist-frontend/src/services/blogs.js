import axios from 'axios'
const url = 'http://localhost:3004/api/blogs'

const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

let token
const setToken = newToken => {
    if (newToken !== null) token = `Bearer ${newToken}`
    else token = null
}

const create = async newBlog=> {
    const config = {headers: { Authorization: token },}
    const response = await axios.post(url, newBlog, config)
    return response.data
}

const update = async (newBlog) => {
    const config = {headers: { Authorization: token }}
    const response = await axios.put(`${url}/${newBlog.id}`, newBlog, config)
    return response.data
}

const del = async blog => {
    const config = {headers: { Authorization: token }}
    const response = await axios.delete(`${url}/${blog.id}`, config)
    return response.status
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create, update, del }