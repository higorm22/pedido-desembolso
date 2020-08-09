import axios from "axios";
import ls from "local-storage";
import Cookies from 'js-cookie';


let tokenId = Cookies.get('BBSSOToken');
let ssoacr = Cookies.get('ssoacr');

axios.defaults.withCredentials = true;

const Axios = axios.create({
  baseURL: "http://192.168.0.104:80",
  headers: {
    Cookie: "BBSSOToken=" + tokenId + ";ssoacr=" + ssoacr + ";",
    Authorization: "Bearer " + ls.get("token"),
  },
});

export default Axios;
