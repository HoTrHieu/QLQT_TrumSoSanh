/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import {
  Slider,
  Layout,
  Banner,
  SpecialOffer,
  Product,
} from "./../../components";
import { ProductService, SearchService } from "./../../../core/services";

const Home = (props) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [onSaleProducts, setOnSaleProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  const [featuredProductPage, setFeaturedProductPage] = useState(1);
  const [onSaleProductPage, setOnSaleProductPage] = useState(1);
  const [onTopProductPage, setOnTopProductPage] = useState(1);

  const [currentTabIndex, setCurrentTabIndex] = useState(0); // 0: đặc sắc, 1: giảm giá, 2: xếp hạng cao nhất

  useEffect(() => {
    ProductService.getProductSearch({
      page: featuredProductPage,
      pageSize: 3,
      searchTerm: "macbook",
    }).then((res) => {
      setFeaturedProducts(res.data.items);
    });

    ProductService.getProductSearch({
      page: onSaleProductPage,
      pageSize: 3,
      searchTerm: "Tủ lạnh",
    }).then((res) => {
      setOnSaleProducts(res.data.items);
    });

    ProductService.getProductSearch({
      page: onTopProductPage,
      pageSize: 3,
      searchTerm: "Iphone 12",
    }).then((res) => {
      setTopProducts(res.data.items);
    });
  }, [featuredProductPage, onSaleProductPage, onTopProductPage]);

  const _onPressPreviousPageButton = () => {
    currentTabIndex === 0
      ? setFeaturedProductPage(Math.max(1, featuredProductPage - 1))
      : currentTabIndex === 1
      ? setOnSaleProductPage(Math.max(1, onSaleProductPage - 1))
      : setOnTopProductPage(Math.max(1, onTopProductPage - 1));
  };

  const _onPressNextPageButton = () => {
    currentTabIndex === 0
      ? setFeaturedProductPage(Math.max(1, featuredProductPage + 1))
      : currentTabIndex === 1
      ? setOnSaleProductPage(Math.max(1, onSaleProductPage + 1))
      : setOnTopProductPage(Math.max(1, onTopProductPage + 1));
  };

  const _onPageInputChange = (e) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      currentTabIndex === 0
        ? setFeaturedProductPage(Math.max(1, Number(e.target.value)))
        : currentTabIndex === 1
        ? setOnSaleProductPage(Math.max(1, Number(e.target.value)))
        : setOnTopProductPage(Math.max(1, Number(e.target.value)));
    }
  };

  const render = () => {
    return (
      <Layout showCompareButton>
        {/* <Slider></Slider> */}
        <div className="container">
          {/* <Banner></Banner> */}
          <div className="mb-5">
            <div className="row">
              {/* <SpecialOffer></SpecialOffer> */}
              <Product
                {...props}
                onTabChanged={(index) => setCurrentTabIndex(index)}
                featuredProducts={featuredProducts}
                onSaleProducts={onSaleProducts}
                topProducts={topProducts}
              />
            </div>
            <div
              style={{
                justifyContent: "center",
                display: "flex",
              }}
            >
              <a
                className="btn btn-primary  rounded-lg font-weight-normal py-2  px-3 mb-1 mt-1 font-size-15"
                // href="#"
                onClick={_onPressPreviousPageButton}
              >
                {"<"}
              </a>
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  marginRight: 20,
                  marginLeft: 20,
                }}
              >
                <input
                  value={
                    currentTabIndex === 0
                      ? featuredProductPage
                      : currentTabIndex === 1
                      ? onSaleProductPage
                      : onTopProductPage
                  }
                  style={{
                    width: 40,
                    textAlign: "center",
                  }}
                  type="text"
                  className="border-1 height-40"
                  onChange={_onPageInputChange}
                />
              </div>
              <a
                className="btn btn-primary  rounded-lg font-weight-normal py-2  px-3 mb-1 mt-1 font-size-15"
                // href="#"
                onClick={_onPressNextPageButton}
              >
                {">"}
              </a>
            </div>
          </div>
        </div>
      </Layout>
    );
  };

  return render();
};

export default Home;
