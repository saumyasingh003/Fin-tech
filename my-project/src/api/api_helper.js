import axios from "axios"

const token = localStorage.getItem('token');

//apply base url for axios
//const API_URL = "http://ec2-3-109-133-160.ap-south-1.compute.amazonaws.com:8082/api"
const API_URL = "http://fintech-backend-c9xf.onrender.com/api"
const axiosApi = axios.create({
  baseURL: API_URL,
})

axiosApi.defaults.headers.common["Authorization"] = "Bearer "+ token

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function get(url,params, config = {}) {

  if (params) {
    var queryString = params
        ? Object.keys(params)
              .map((key) => key + '=' + params[key])
              .join('&')
        : '';
    return  axiosApi.get(`${url}?${queryString}`, {...config}).then(response => response.data);
} else {
   return  axiosApi.get(`${url}`,{...config}).then(response => response.data);
}
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
    .catch(err=>err.response)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}

//samjhao to ho kya rha h ...api helper h ye axios ka...simple yaha se required method jaise get put post delete ko import kr lo..or use kro...headers wagira dalne ka baar baar jrurt nhi hia or na authorization token wagira..ek hi file iska sara configuration hai..simple import and use  to login ke liye kya karna hoga ...jaise register kiye h..backend me dekho pehle login krne ke liye kya kya chahiye payload me..or whi same keyword use krna h tmhe..jaise abhi login me email or password h..usse login hoga...bt agar tmhe username se krna h login, then bakckend me change krna hoga login funcition me