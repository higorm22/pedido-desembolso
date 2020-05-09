 
import axios from 'axios';
import ls from 'local-storage';

const Axios = axios.create({
  baseURL: 'http://192.168.0.101:3333',
  headers: {
    Authorization: 'Bearer ' + ls.get('token'),
  },
});

export default Axios;