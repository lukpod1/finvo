import axios from "axios";

import { AUTH_USER_TOKEN_KEY } from '../utils/constants'

const instance = axios.create()
instance.defaults.headers.common["Authorization"] = localStorage.getItem(AUTH_USER_TOKEN_KEY)

export default instance;
