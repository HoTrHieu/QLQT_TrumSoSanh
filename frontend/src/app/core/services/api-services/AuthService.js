import HttpService from './HttpService';
import axios from 'axios';

const ApiPath = {
    API_USER: '/api/users',
    API_CHECK_EMAIL: '/api/users/checkEmail',
    API_AUTH: '/api/auth',
}

class AuthService {
    checkExistEmail(user) {
        const url = `${ApiPath.API_CHECK_EMAIL}`;
        return HttpService.post(url, user);
    };
    createUser(user) {
        const url = `${ApiPath.API_USER}` ;
        return HttpService.post(url, user);
    };
    checkLogin(user) {
        const url = `${ApiPath.API_AUTH}`;
        return HttpService.post(url, user);
    };
}

export default new AuthService();