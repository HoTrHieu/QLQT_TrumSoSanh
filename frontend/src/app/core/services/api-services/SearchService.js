import HttpService from './HttpService';

const ApiPath = {
    SEARCH_BY_KEY_WORD: '/api/crawl/search',
    GET_SEARCH_TERM: '/api/v1/product/search'
}

class SearchService {
    getCrawByKeyWord(keyWord) {
        const url = `${ApiPath.SEARCH_BY_KEY_WORD}?keyWord=${keyWord}`
        return HttpService.get(url);
    }

    getSearchTerm(page = 1, pageSize = 10, searchTerm = '') {
        const url = `${ApiPath.GET_SEARCH_TERM}?page=${page}?pageSize=${pageSize}?searchTerm=${searchTerm}`;
        return HttpService.get(url);
    }
}

export default new SearchService();