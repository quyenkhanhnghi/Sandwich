import axios from "axios";

const URL = "/api/v1/sandwich";

export const fetchSandwich = async () => {
  return axios.get(URL).then(res => res.data);
}
