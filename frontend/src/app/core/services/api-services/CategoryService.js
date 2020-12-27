import HttpService from './HttpService';

const ApiPath = {
    GET_ALL: '/api/v1/category/all',
    POST_CATEGORY: '/api/v1/category',
    ///api/v1/category/update-status/{id}
    UPDATE_CATEGORY: '/api/v1/category/update-status'

}

class CategoryService {
    getAll() {
        const url = `${ApiPath.GET_ALL}`
        return HttpService.get(url);
    }
}

export default new CategoryService();