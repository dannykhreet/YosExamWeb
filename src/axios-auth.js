import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://mathyos-37290.firebaseio.com'
})


export default instance