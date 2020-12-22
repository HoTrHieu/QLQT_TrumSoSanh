// import axios from 'axios';
// import {
//     AccessExceptions,
//     ErrorCode,
//     HandlingExceptions,
//     ResponseStatus
// } from '../../models/app';

// const defaultConfig = {
//     baseURL: process.env.REACT_APP_ROOT_API_URL,
//     withCredentials: true
// };

// const HttpService = axios.create(defaultConfig);

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

// export default HttpService;
