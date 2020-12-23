const db = require('../utils/db');

module.exports = {

    search(keyWord) {
        console.log('key: ', keyWord)
        //xử lý kết hợp vs module crawl data
        const data = [
            {
                name: 'Điện thoại iPhone 12 128GB',
                priceRoot: 26990000,
                priceSale: 24990000,
                percentDiscount: 0,
                img: 'https://bachlongmobile.com/media/catalog/product/cache/1/image/040ec09b1e35df139433887a97daa66f/i/p/iphone-12-pro-2_3.png',
                linkRoot: 'https://www.thegioididong.com/dtdd/iphone-12-128gb',
            },
            {
                name: 'Điện thoại iPhone 12 128GB',
                priceRoot: 26990000,
                priceSale: 24990000,
                percentDiscount: 20,
                img: 'https://bachlongmobile.com/media/catalog/product/cache/1/image/040ec09b1e35df139433887a97daa66f/i/p/iphone-12-pro-2_3.png',
                linkRoot: 'https://www.thegioididong.com/dtdd/iphone-12-128gb',
            },
            {
                name: 'Điện thoại iPhone 12 128GB',
                priceRoot: 26990000,
                priceSale: 24990000,
                percentDiscount: 15,
                img: 'https://bachlongmobile.com/media/catalog/product/cache/1/image/040ec09b1e35df139433887a97daa66f/i/p/iphone-12-pro-2_3.png',
                linkRoot: 'https://www.thegioididong.com/dtdd/iphone-12-128gb',
            },
            {
                name: 'Điện thoại iPhone 12 128GB',
                priceRoot: 26990000,
                priceSale: 24990000,
                percentDiscount: 0,
                img: 'https://bachlongmobile.com/media/catalog/product/cache/1/image/040ec09b1e35df139433887a97daa66f/i/p/iphone-12-pro-2_3.png',
                linkRoot: 'https://www.thegioididong.com/dtdd/iphone-12-128gb',
            }
        ];

        return data;
    }
}