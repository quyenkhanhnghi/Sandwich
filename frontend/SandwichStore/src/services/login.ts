import axios from "axios";
import { AxiosResponse } from "axios";

const baseURL = "/api/v1/user/";

const login = async (payload: { name: string; password: string }) => {
  const URL = `${baseURL}login`;
  return axios.post(URL, payload).then((res: AxiosResponse) => res.data);
};

const validateToken = async (token: string) => {
  const URL = `${baseURL}login`;
  let validate = false;
  await axios
    .get(URL, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => (validate = true))
    .catch((err) => (validate = false));
  return validate;
};

const register = async (payload: {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
}) => {
  return axios.post(baseURL, payload).then(res => res.data);
};

const service = { login, validateToken, register };
export default service;
