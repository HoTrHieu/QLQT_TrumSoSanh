/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { ProductService, SearchService } from "../../../core/services";
import { formatVND } from "../../../utils/functions";
import { Layout } from "../../components";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const ProductDetail = (props) => {
  const query = useQuery();
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [product, setProduct] = useState(null);
  useEffect(() => {
    ProductService.getProductDetailById(query.get("id")).then((res) => {
      setProduct(res.data);
    });

    SearchService.getSearchShop(query.get("id")).then((res) => {
      setRelatedProduct(res.data.items);
    });
  }, [query.get("id")]);

  const _onPressCompareButton = () => {
    const compareProducts = JSON.parse(
      localStorage.getItem("compareProducts") || "[]"
    );

    const isExists =
      undefined !==
      compareProducts.find((value, index) => value.id === product.id);

    if (isExists) {
      toast.warning("Sản phẩm đã sẵn sàng", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
    } else {
      localStorage.setItem(
        "compareProducts",
        JSON.stringify([...compareProducts, product])
      );
      toast.success("Đã thêm sản phẩm so sánh", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  const _onClickProductDetail = (id) => {
    props.history.push({
      pathname: "/product-detail",
      search: `?id=${id}`,
    });
  };

  const _renderProductInfo = () => {
    if (!product) {
      return (
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Đang tải...</h1>;
        </div>
      );
    }

    return (
      <div className="mb-xl-14 mb-6">
        <div className="row">
          <div className="col-md-5 mb-4 mb-md-0">
            <div
              id="sliderSyncingNav"
              className="js-slick-carousel u-slick mb-2"
            >
              <img
                className="img-fluid"
                src={product.imageSources[0]}
                alt="Image Description"
              />
            </div>
          </div>
          <div className="col-md-7 mb-md-6 mb-lg-0">
            <div className="mb-2">
              <div className="border-bottom mb-3 pb-md-1 pb-3">
                <h2 className="font-size-25 text-lh-1dot2">{product.name}</h2>
              </div>
              <span class="font-weight-bold font-size-20 text-gray-90">
                {formatVND(product.minPrice)}
              </span>
              <div className="flex-horizontal-center flex-wrap mb-4 mt-4">
                <a
                  className="btn btn-primary  rounded-lg font-weight-normal py-2  px-3 mb-1 mt-1 font-size-15"
                  onClick={_onPressCompareButton}
                >
                  <i className="ec ec-compare mr-2" />
                  Thêm so sánh
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const _renderListRelatedProduct = () => {
    return (relatedProduct || []).map((item, index) => {
      return (
        <li className="col-6 col-md-3 col-xl-2gdot4-only col-wd-2 product-item remove-divider-md-lg">
          <div className="product-item__outer h-100">
            <div className="product-item__inner px-xl-4 p-3">
              <div className="product-item__body pb-xl-2">
                <div className="mb-2">
                  <a
                    onClick={() => _onClickProductDetail(item.id)}
                    className="font-size-12 text-gray-5"
                  >
                    Nơi bán: {item.name}
                  </a>
                </div>
                <h5 className="mb-1 product-item__title">
                  <a
                    onClick={() => _onClickProductDetail(item.id)}
                    className="text-blue font-weight-bold"
                  >
                    {item.title}
                  </a>
                </h5>
                <div className="mb-2">
                  <a
                    onClick={() => _onClickProductDetail(item.id)}
                    className="d-block text-center"
                  >
                    <img
                      className="img-fluid"
                      src={item.imageSource}
                      alt="Image Description"
                    />
                  </a>
                </div>
                <div className="flex-center-between mb-1">
                  <div className="prodcut-price">
                    <div className="text-gray-100">{formatVND(item.price)}</div>
                  </div>
                  <div className="d-none d-xl-block prodcut-add-cart">
                    <a
                      onClick={_onPressCompareButton}
                      className="btn-add-cart btn-primary transition-3d-hover"
                    >
                      <i className="ec ec-compare" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      );
    });
  };

  return (
    <Layout showCompareButton>
      <main id="content" role="main">
        <div className="container mt-4 mb-4">
          {/* Single Product Body */}
          {_renderProductInfo()}
          {/* End Single Product Body */}

          {/* Related products */}
          <div className="mb-6">
            <div className="d-flex justify-content-between align-items-center border-bottom border-color-1 flex-lg-nowrap flex-wrap mb-4">
              <h3 className="section-title mb-0 pb-2 font-size-22">
                So sánh giá của {relatedProduct?.length || 0} nơi bán
              </h3>
            </div>
            <ul className="row list-unstyled products-group no-gutters">
              {_renderListRelatedProduct()}
              <li className="col-6 col-md-3 col-xl-2gdot4-only col-wd-2 product-item remove-divider-wd d-xl-none d-wd-block"></li>
              <li className="col-6 col-md-3 col-xl-2gdot4-only col-wd-2 product-item remove-divider-wd d-xl-none d-wd-block"></li>
            </ul>
          </div>
          {/* End Related products */}
        </div>
      </main>
    </Layout>
  );
};

export default ProductDetail;
