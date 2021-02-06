/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { formatVND } from "../../../utils/functions";

const Product = (props) => {
  const { featuredProducts, onSaleProducts, topProducts } = props;
  const _onClickProduct = (id) => {
    props.history.push({
      pathname: "/product-detail",
      search: `?id=${id}`,
    });
  };

  const _renderListProduct = (products) => {
    return (
      <ul className="row list-unstyled products-group no-gutters">
        {products.map((item) => {
          return (
            <li className="col-6 col-wd-3 col-md-4 product-item">
              <div className="product-item__outer h-100">
                <div className="product-item__inner px-xl-4 p-3">
                  <div className="product-item__body pb-xl-2">
                    {/* <div className="mb-2">
                  <a
                    href="../shop/product-categories-7-column-full-width.html"
                    className="font-size-12 text-gray-5"
                  >
                    Speakers
                  </a>
                </div> */}
                    <h5 className="mb-1 product-item__title">
                      <a
                        className="text-blue font-weight-bold"
                        onClick={() => _onClickProduct(item.id)}
                      >
                        {item.name}
                      </a>
                    </h5>
                    <div className="mb-2">
                      <a
                        onClick={() => _onClickProduct(item.id)}
                        className="d-block text-center"
                      >
                        <img
                          className="img-fluid"
                          src={item.imageSources[0]}
                          alt="Image Description"
                        />
                      </a>
                    </div>
                    <div className="flex-center-between mb-1">
                      <div className="prodcut-price">
                        <div className="text-gray-100">
                          {formatVND(item.minPrice)}
                        </div>
                      </div>
                      <div className="d-none d-xl-block prodcut-add-cart">
                        <a
                          className="btn-add-cart btn-primary transition-3d-hover"
                          onClick={() => {
                            const compareProducts = JSON.parse(
                              localStorage.getItem("compareProducts") || "[]"
                            );

                            const isExists =
                              undefined !==
                              compareProducts.find(
                                (value, index) => value.id === item.id
                              );

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
                                JSON.stringify([...compareProducts, item])
                              );
                              toast.success("Đã thêm sản phẩm so sánh", {
                                position: "top-right",
                                autoClose: 2000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                draggable: true,
                              });
                            }
                          }}
                        >
                          <i className="ec ec-compare" />
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* <div className="product-item__footer">
                <div className="border-top pt-2 flex-center-between flex-wrap">
                  <Link
                    to={"/compare"}
                    className="text-gray-6 font-size-13"
                    style={{ backgroundColor: "red" }}
                  >
                    <i className="ec ec-compare mr-1 font-size-15" />
                    Compare
                  </Link>
                  <a
                    href="../shop/wishlist.html"
                    className="text-gray-6 font-size-13"
                  >
                    <i className="ec ec-favorites mr-1 font-size-15" />{" "}
                    Add to Wishlist
                  </a>
                </div>
              </div> */}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  const render = () => {
    return (
      <div className="col">
        {/* Features Section */}
        <div className="">
          {/* Nav Classic */}
          <div className="position-relative bg-white text-center z-index-2">
            <ul
              className="nav nav-classic nav-tab justify-content-center"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item">
                <a
                  onClick={(e) => props.onTabChanged && props.onTabChanged(0)}
                  className="nav-link active "
                  id="pills-one-example1-tab"
                  data-toggle="pill"
                  href="#pills-one-example1"
                  role="tab"
                  aria-controls="pills-one-example1"
                  aria-selected="true"
                >
                  <div className="d-md-flex justify-content-md-center align-items-md-center">
                    Đặc sắc
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  onClick={(e) => props.onTabChanged && props.onTabChanged(1)}
                  className="nav-link "
                  id="pills-two-example1-tab"
                  data-toggle="pill"
                  href="#pills-two-example1"
                  role="tab"
                  aria-controls="pills-two-example1"
                  aria-selected="false"
                >
                  <div className="d-md-flex justify-content-md-center align-items-md-center">
                    Giảm Giá
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  onClick={(e) => props.onTabChanged && props.onTabChanged(2)}
                  className="nav-link "
                  id="pills-three-example1-tab"
                  data-toggle="pill"
                  href="#pills-three-example1"
                  role="tab"
                  aria-controls="pills-three-example1"
                  aria-selected="false"
                >
                  <div className="d-md-flex justify-content-md-center align-items-md-center">
                    Xếp hạng cao nhất
                  </div>
                </a>
              </li>
            </ul>
          </div>
          {/* End Nav Classic */}
          {/* Tab Content */}
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade pt-2 show active"
              id="pills-one-example1"
              role="tabpanel"
              aria-labelledby="pills-one-example1-tab"
            >
              {_renderListProduct(featuredProducts)}
            </div>
            <div
              className="tab-pane fade pt-2"
              id="pills-two-example1"
              role="tabpanel"
              aria-labelledby="pills-two-example1-tab"
            >
              {_renderListProduct(onSaleProducts)}
            </div>
            <div
              className="tab-pane fade pt-2"
              id="pills-three-example1"
              role="tabpanel"
              aria-labelledby="pills-three-example1-tab"
            >
              {_renderListProduct(topProducts)}
            </div>
          </div>
          {/* End Tab Content */}
        </div>
        {/* End Features Section */}
      </div>
    );
  };

  return render();
};

export default Product;
