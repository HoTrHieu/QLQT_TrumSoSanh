import HttpService from './HttpService';

const ApiPath = {
    GET_PRODUCT_SEARCH: '/api/v1/product/search'
}

class ProductService {
    getProductSearch({page, pageSize, searchTerm, brandIds, categoryIds}) {
        const url = `${ApiPath.GET_PRODUCT_SEARCH}?page=${page}&pageSize=${pageSize}${searchTerm? `&searchTerm=${searchTerm}`: ''}${brandIds? `&brandIds=${brandIds}`: ''}${categoryIds? `&categoryIds=${categoryIds}`: ''}`
        return HttpService.get(url);
    }
}

export default new ProductService();