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

  useEffect(() => {
    ProductService.getProductSearch({
      page: 2,
      pageSize: 6,
      searchTerm: "macbook",
    }).then((res) => {
      setFeaturedProducts(res.data.items);
    });

    ProductService.getProductSearch({
      page: 2,
      pageSize: 6,
      searchTerm: "Tủ lạnh",
    }).then((res) => {
      setOnSaleProducts(res.data.items);
    });

    ProductService.getProductSearch({
      page: 2,
      pageSize: 6,
      searchTerm: "Iphone 12",
    }).then((res) => {
      setTopProducts(res.data.items);
    });
  }, []);
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
                featuredProducts={featuredProducts}
                onSaleProducts={onSaleProducts}
                topProducts={topProducts}
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  };

  return render();
};

export default Home;
