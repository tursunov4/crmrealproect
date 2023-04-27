
import axios from "axios";

const http = axios.create({
   baseURL :'http://vm4415096.25ssd.had.wf'
})
http.interceptors.request.use(
    (config) => {
     let token = sessionStorage.getItem('token');
     if(token){
         config.headers["Authorization"] = `Bearer ${token}`;
     }
    
      config.headers["Accept"] = "application/json";
      'resolve.fallback: { "http": require.resolve("stream-http") }'
      // resolve.fallback: { "http": false }
  
      // config.headers["Access-Control-Allow-Origin"] = "*";
      // config.headers["Content-Type"] = "multipart/form-data";
      // config.headers['Content-Type'] = "application/json"
      return config;
    },
    (error) => Promise.reject(error)
  );



export default http