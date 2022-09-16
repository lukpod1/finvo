import axios from "axios";

import { AUTH_USER_TOKEN_KEY } from '../utils/constants'

const instance = axios.create({
  headers: {
    "Authorization": `Bearer ${localStorage.getItem(AUTH_USER_TOKEN_KEY)}`
  }
})

export default instance;
