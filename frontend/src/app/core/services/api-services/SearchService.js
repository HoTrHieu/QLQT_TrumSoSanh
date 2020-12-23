import HttpService from './HttpService';

const ApiPath = {
    SEARCH_BY_KEY_WORD: '/api/crawl/search'
}

class SearchService {
    getCrawByKeyWord(keyWord) {
        const url = `${ApiPath.SEARCH_BY_KEY_WORD}?keyWord=${keyWord}`
        return HttpService.get(url);
    }
}

export default new SearchService();