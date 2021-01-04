import HttpService from './HttpService';

const ApiPath = {
    GET_ROOT_CATEGORY: '/api/v1/category/root-categories',
    GET_CHILDRENT_CATEGORY: '/api/v1/category/all',
    POST_CATEGORY: '/api/v1/category',
    ///api/v1/category/update-status/{id}
    UPDATE_CATEGORY: '/api/v1/category/update-status'

}

class CategoryService {
    getChildCategory() {
        const url = `${ApiPath.GET_CHILDRENT_CATEGORY}`
        return HttpService.get(url);
    }

    getRootCategory() {
        const url = `${ApiPath.GET_ROOT_CATEGORY}`
        return HttpService.get(url);
    }
}

export default new CategoryService();