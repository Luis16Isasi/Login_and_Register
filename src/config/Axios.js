import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'https://api-login-register.herokuapp.com'
})

export default clienteAxios;