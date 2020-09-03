import axios from "axios";
import ls from "local-storage";
import Cookies from 'js-cookie';


let tokenId = Cookies.get('fsadgsdfgsdgdsfg');
let ssoacr = Cookies.get('ssoacr');


const Axios = axios.create({
  baseURL: "http://192.168.0.104:3333",
  headers: {
    // Cookie: "BBSSOToken=" + tokenId + ";ssoacr=" + ssoacr + ";",
    // Cookie: "BBSSOToken=teste; ssoacr=www.google.com",
    // Authorization: "Bearer " + ls.get("token"),
    BBSSOToken:tokenId,
    ssoacr
  },
});

export default Axios;
