import axios from 'axios';

const defaultConfig = {
    baseURL: process.env.REACT_APP_ROOT_API_URL || 'http://localhost:5000',
    withCredentials: false,
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET,POST,PUT,DEL'
    }
};

const HttpService = axios.create(defaultConfig);

// config before request
// HttpService.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });

// config before response
// HttpService.interceptors.response.use(
//     (response: any) => {
//         const code =
//             response.data && response.data.code ? response.data.code : null;
//         const handlingExceptions: Array<any> = HandlingExceptions;
//         const accessExceptions: Array<any> = AccessExceptions;

//         if (code) {
//             switch (code) {
//                 case ErrorCode.ACCESS_DENIED:
//                     if (!accessExceptions.includes(response.config.url)) {
//                         console.error('redirect to access denied!!!');
//                     }
//                     break;

//                 case ErrorCode.FAIL:
//                     if (
//                         !handlingExceptions.find(item =>
//                             response.config.url.includes(item)
//                         )
//                     ) {
//                         if (response.data && response.data.msg) {
//                             //alert(response.data.msg);
//                         }
//                         //alert('error!!!');
//                     }
//                     break;

//                 case ErrorCode.FAIL_RELOAD:
//                     if (!handlingExceptions.includes(response.config.url)) {
//                         //alert('error and refresh!!!');
//                     }
//                     break;
//             }

//             return Promise.reject(response.data);
//         }

//         return Promise.resolve(response.data);
//     },
//     (error: any) => {
//         console.log('axios error: ', error, error.response);

//         const status = error.response ? error.response.status : null;

//         if (!status || status === ResponseStatus.UNAUTHORIZED) {
//             return (window.location.href = `${process.env.REACT_APP_ROOT_API_URL}/api/login`);
//         }

//         return Promise.reject(error);
//     }
// );

export default HttpService;
