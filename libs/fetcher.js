import axios from "axios";

const fetcher = (url, params) =>
  axios.post(url, params).then((res) => res.data);

export default fetcher;
