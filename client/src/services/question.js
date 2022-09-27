import axios from 'axios'
const baseUrl = '/api/questions'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAllPersonal = async () => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.get(baseUrl, config)
  return response.data
}

const getAllUser = async () => {
  const response = await axios.get(`${baseUrl}/all`)
  return response.data
}

const getAllExternal = async () => {
  const response = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple')
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}
export default { setToken, getAllPersonal, getAllUser, getAllExternal, create, update, deleteBlog }