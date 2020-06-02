 
import axios from 'axios';
import ls from 'local-storage';

const Axios = axios.create({
  baseURL: 'http://192.168.43.155:3333',
  //baseURL: 'http://192.168.0.104:3333',
  headers: {
    Authorization: 'Bearer ' + ls.get('token'),
  },
});

export default Axios;