import * as React from "react";
import { Link } from "react-router-dom";

const Product = (props) => {
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
                  className="nav-link active "
                  id="pills-one-example1-tab"
                  data-toggle="pill"
                  href="#pills-one-example1"
                  role="tab"
                  aria-controls="pills-one-example1"
                  aria-selected="true"
                >
                  <div className="d-md-flex justify-content-md-center align-items-md-center">
                    Featured
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link "
                  id="pills-two-example1-tab"
                  data-toggle="pill"
                  href="#pills-two-example1"
                  role="tab"
                  aria-controls="pills-two-example1"
                  aria-selected="false"
                >
                  <div className="d-md-flex justify-content-md-center align-items-md-center">
                    On Sale
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link "
                  id="pills-three-example1-tab"
                  data-toggle="pill"
                  href="#pills-three-example1"
                  role="tab"
                  aria-controls="pills-three-example1"
                  aria-selected="false"
                >
                  <div className="d-md-flex justify-content-md-center align-items-md-center">
                    Top Rated
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
              <ul className="row list-unstyled products-group no-gutters">
                <li className="col-6 col-wd-3 col-md-4 product-item">
                  <div className="product-item__outer h-100">
                    <div className="product-item__inner px-xl-4 p-3">
                      <div className="product-item__body pb-xl-2">
                        <div className="mb-2">
                          <a
                            href="../shop/product-categories-7-column-full-width.html"
                            className="font-size-12 text-gray-5"
                          >
                            Speakers
                          </a>
                        </div>
                        <h5 className="mb-1 product-item__title">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="text-blue font-weight-bold"
                          >
                            Wireless Audio System Multiroom 360 degree Full base
                            audio
                          </a>
                        </h5>
                        <div className="mb-2">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="d-block text-center"
                          >
                            <img
                              className="img-fluid"
                              src="../../assets/img/212X200/img1.jpg"
                              alt="Image Description"
                            />
                          </a>
                        </div>
                        <div className="flex-center-between mb-1">
                          <div className="prodcut-price">
                            <div className="text-gray-100">$685,00</div>
                          </div>
                          <div className="d-none d-xl-block prodcut-add-cart">
                            <a
                              href="../shop/single-product-fullwidth.html"
                              className="btn-add-cart btn-primary transition-3d-hover"
                            >
                              <i className="ec ec-add-to-cart" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="product-item__footer">
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
                      </div>
                    </div>
                  </div>
                </li>
                <li className="col-6 col-wd-3 col-md-4 product-item">
                  <div className="product-item__outer h-100">
                    <div className="product-item__inner px-xl-4 p-3">
                      <div className="product-item__body pb-xl-2">
                        <div className="mb-2">
                          <a
                            href="../shop/product-categories-7-column-full-width.html"
                            className="font-size-12 text-gray-5"
                          >
                            Speakers
                          </a>
                        </div>
                        <h5 className="mb-1 product-item__title">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="text-blue font-weight-bold"
                          >
                            Tablet White EliteBook Revolve 810 G2
                          </a>
                        </h5>
                        <div className="mb-2">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="d-block text-center"
                          >
                            <img
                              className="img-fluid"
                              src="../../assets/img/212X200/img2.jpg"
                              alt="Image Description"
                            />
                          </a>
                        </div>
                        <div className="flex-center-between mb-1">
                          <div className="prodcut-price d-flex align-items-center flex-wrap position-relative">
                            <ins className="font-size-20 text-red text-decoration-none mr-2">
                              $1999,00
                            </ins>
                            <del className="font-size-12 tex-gray-6 position-absolute bottom-100">
                              $2 299,00
                            </del>
                          </div>
                          <div className="d-none d-xl-block prodcut-add-cart">
                            <a
                              href="../shop/single-product-fullwidth.html"
                              className="btn-add-cart btn-primary transition-3d-hover"
                            >
                              <i className="ec ec-add-to-cart" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="product-item__footer">
                        <div className="border-top pt-2 flex-center-between flex-wrap">
                          <a
                            href="../shop/compare.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-compare mr-1 font-size-15" />{" "}
                            Compare
                          </a>
                          <a
                            href="../shop/wishlist.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-favorites mr-1 font-size-15" />{" "}
                            Add to Wishlist
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="col-6 col-wd-3 col-md-4 product-item remove-divider-xl">
                  <div className="product-item__outer h-100">
                    <div className="product-item__inner px-xl-4 p-3">
                      <div className="product-item__body pb-xl-2">
                        <div className="mb-2">
                          <a
                            href="../shop/product-categories-7-column-full-width.html"
                            className="font-size-12 text-gray-5"
                          >
                            Speakers
                          </a>
                        </div>
                        <h5 className="mb-1 product-item__title">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="text-blue font-weight-bold"
                          >
                            Purple Solo 2 Wireless
                          </a>
                        </h5>
                        <div className="mb-2">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="d-block text-center"
                          >
                            <img
                              className="img-fluid"
                              src="../../assets/img/212X200/img3.jpg"
                              alt="Image Description"
                            />
                          </a>
                        </div>
                        <div className="flex-center-between mb-1">
                          <div className="prodcut-price">
                            <div className="text-gray-100">$685,00</div>
                          </div>
                          <div className="d-none d-xl-block prodcut-add-cart">
                            <a
                              href="../shop/single-product-fullwidth.html"
                              className="btn-add-cart btn-primary transition-3d-hover"
                            >
                              <i className="ec ec-add-to-cart" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="product-item__footer">
                        <div className="border-top pt-2 flex-center-between flex-wrap">
                          <a
                            href="../shop/compare.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-compare mr-1 font-size-15" />{" "}
                            Compare
                          </a>
                          <a
                            href="../shop/wishlist.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-favorites mr-1 font-size-15" />{" "}
                            Add to Wishlist
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="col-6 col-wd-3 col-md-4 product-item remove-divider-wd">
                  <div className="product-item__outer h-100">
                    <div className="product-item__inner px-xl-4 p-3">
                      <div className="product-item__body pb-xl-2">
                        <div className="mb-2">
                          <a
                            href="../shop/product-categories-7-column-full-width.html"
                            className="font-size-12 text-gray-5"
                          >
                            Speakers
                          </a>
                        </div>
                        <h5 className="mb-1 product-item__title">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="text-blue font-weight-bold"
                          >
                            Smartphone 6S 32GB LTE
                          </a>
                        </h5>
                        <div className="mb-2">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="d-block text-center"
                          >
                            <img
                              className="img-fluid"
                              src="../../assets/img/212X200/img4.jpg"
                              alt="Image Description"
                            />
                          </a>
                        </div>
                        <div className="flex-center-between mb-1">
                          <div className="prodcut-price">
                            <div className="text-gray-100">$685,00</div>
                          </div>
                          <div className="d-none d-xl-block prodcut-add-cart">
                            <a
                              href="../shop/single-product-fullwidth.html"
                              className="btn-add-cart btn-primary transition-3d-hover"
                            >
                              <i className="ec ec-add-to-cart" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="product-item__footer">
                        <div className="border-top pt-2 flex-center-between flex-wrap">
                          <a
                            href="../shop/compare.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-compare mr-1 font-size-15" />{" "}
                            Compare
                          </a>
                          <a
                            href="../shop/wishlist.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-favorites mr-1 font-size-15" />{" "}
                            Add to Wishlist
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="col-6 col-wd-3 col-md-4 product-item">
                  <div className="product-item__outer h-100">
                    <div className="product-item__inner px-xl-4 p-3">
                      <div className="product-item__body pb-xl-2">
                        <div className="mb-2">
                          <a
                            href="../shop/product-categories-7-column-full-width.html"
                            className="font-size-12 text-gray-5"
                          >
                            Speakers
                          </a>
                        </div>
                        <h5 className="mb-1 product-item__title">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="text-blue font-weight-bold"
                          >
                            Widescreen NX Mini F1 SMART NX
                          </a>
                        </h5>
                        <div className="mb-2">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="d-block text-center"
                          >
                            <img
                              className="img-fluid"
                              src="../../assets/img/212X200/img5.jpg"
                              alt="Image Description"
                            />
                          </a>
                        </div>
                        <div className="flex-center-between mb-1">
                          <div className="prodcut-price">
                            <div className="text-gray-100">$685,00</div>
                          </div>
                          <div className="d-none d-xl-block prodcut-add-cart">
                            <a
                              href="../shop/single-product-fullwidth.html"
                              className="btn-add-cart btn-primary transition-3d-hover"
                            >
                              <i className="ec ec-add-to-cart" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="product-item__footer">
                        <div className="border-top pt-2 flex-center-between flex-wrap">
                          <a
                            href="../shop/compare.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-compare mr-1 font-size-15" />{" "}
                            Compare
                          </a>
                          <a
                            href="../shop/wishlist.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-favorites mr-1 font-size-15" />{" "}
                            Add to Wishlist
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="col-6 col-wd-3 col-md-4 product-item remove-divider-xl">
                  <div className="product-item__outer h-100">
                    <div className="product-item__inner px-xl-4 p-3">
                      <div className="product-item__body pb-xl-2">
                        <div className="mb-2">
                          <a
                            href="../shop/product-categories-7-column-full-width.html"
                            className="font-size-12 text-gray-5"
                          >
                            Speakers
                          </a>
                        </div>
                        <h5 className="mb-1 product-item__title">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="text-blue font-weight-bold"
                          >
                            Full Color LaserJet Pro M452dn
                          </a>
                        </h5>
                        <div className="mb-2">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="d-block text-center"
                          >
                            <img
                              className="img-fluid"
                              src="../../assets/img/212X200/img6.jpg"
                              alt="Image Description"
                            />
                          </a>
                        </div>
                        <div className="flex-center-between mb-1">
                          <div className="prodcut-price">
                            <div className="text-gray-100">$685,00</div>
                          </div>
                          <div className="d-none d-xl-block prodcut-add-cart">
                            <a
                              href="../shop/single-product-fullwidth.html"
                              className="btn-add-cart btn-primary transition-3d-hover"
                            >
                              <i className="ec ec-add-to-cart" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="product-item__footer">
                        <div className="border-top pt-2 flex-center-between flex-wrap">
                          <a
                            href="../shop/compare.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-compare mr-1 font-size-15" />{" "}
                            Compare
                          </a>
                          <a
                            href="../shop/wishlist.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-favorites mr-1 font-size-15" />{" "}
                            Add to Wishlist
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="col-6 col-wd-3 col-md-4 product-item d-xl-none d-wd-block remove-divider-xl">
                  <div className="product-item__outer h-100">
                    <div className="product-item__inner px-xl-4 p-3">
                      <div className="product-item__body pb-xl-2">
                        <div className="mb-2">
                          <a
                            href="../shop/product-categories-7-column-full-width.html"
                            className="font-size-12 text-gray-5"
                          >
                            Speakers
                          </a>
                        </div>
                        <h5 className="mb-1 product-item__title">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="text-blue font-weight-bold"
                          >
                            GameConsole Destiny Special Edition
                          </a>
                        </h5>
                        <div className="mb-2">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="d-block text-center"
                          >
                            <img
                              className="img-fluid"
                              src="../../assets/img/212X200/img7.jpg"
                              alt="Image Description"
                            />
                          </a>
                        </div>
                        <div className="flex-center-between mb-1">
                          <div className="prodcut-price">
                            <div className="text-gray-100">$685,00</div>
                          </div>
                          <div className="d-none d-xl-block prodcut-add-cart">
                            <a
                              href="../shop/single-product-fullwidth.html"
                              className="btn-add-cart btn-primary transition-3d-hover"
                            >
                              <i className="ec ec-add-to-cart" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="product-item__footer">
                        <div className="border-top pt-2 flex-center-between flex-wrap">
                          <a
                            href="../shop/compare.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-compare mr-1 font-size-15" />{" "}
                            Compare
                          </a>
                          <a
                            href="../shop/wishlist.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-favorites mr-1 font-size-15" />{" "}
                            Add to Wishlist
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="col-6 col-wd-3 col-md-4 product-item d-xl-none d-wd-block remove-divider-wd">
                  <div className="product-item__outer h-100">
                    <div className="product-item__inner px-xl-4 p-3">
                      <div className="product-item__body pb-xl-2">
                        <div className="mb-2">
                          <a
                            href="../shop/product-categories-7-column-full-width.html"
                            className="font-size-12 text-gray-5"
                          >
                            Speakers
                          </a>
                        </div>
                        <h5 className="mb-1 product-item__title">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="text-blue font-weight-bold"
                          >
                            Camera C430W 4k Waterproof
                          </a>
                        </h5>
                        <div className="mb-2">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="d-block text-center"
                          >
                            <img
                              className="img-fluid"
                              src="../../assets/img/212X200/img8.jpg"
                              alt="Image Description"
                            />
                          </a>
                        </div>
                        <div className="flex-center-between mb-1">
                          <div className="prodcut-price">
                            <div className="text-gray-100">$685,00</div>
                          </div>
                          <div className="d-none d-xl-block prodcut-add-cart">
                            <a
                              href="../shop/single-product-fullwidth.html"
                              className="btn-add-cart btn-primary transition-3d-hover"
                            >
                              <i className="ec ec-add-to-cart" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="product-item__footer">
                        <div className="border-top pt-2 flex-center-between flex-wrap">
                          <a
                            href="../shop/compare.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-compare mr-1 font-size-15" />{" "}
                            Compare
                          </a>
                          <a
                            href="../shop/wishlist.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-favorites mr-1 font-size-15" />{" "}
                            Add to Wishlist
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div
              className="tab-pane fade pt-2"
              id="pills-two-example1"
              role="tabpanel"
              aria-labelledby="pills-two-example1-tab"
            >
              <ul className="row list-unstyled products-group no-gutters">
                <li className="col-6 col-wd-3 col-md-4 product-item">
                  <div className="product-item__outer h-100">
                    <div className="product-item__inner px-xl-4 p-3">
                      <div className="product-item__body pb-xl-2">
                        <div className="mb-2">
                          <a
                            href="../shop/product-categories-7-column-full-width.html"
                            className="font-size-12 text-gray-5"
                          >
                            Speakers
                          </a>
                        </div>
                        <h5 className="mb-1 product-item__title">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="text-blue font-weight-bold"
                          >
                            Tablet White EliteBook Revolve 810 G2
                          </a>
                        </h5>
                        <div className="mb-2">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="d-block text-center"
                          >
                            <img
                              className="img-fluid"
                              src="../../assets/img/212X200/img2.jpg"
                              alt="Image Description"
                            />
                          </a>
                        </div>
                        <div className="flex-center-between mb-1">
                          <div className="prodcut-price">
                            <div className="text-gray-100">$685,00</div>
                          </div>
                          <div className="d-none d-xl-block prodcut-add-cart">
                            <a
                              href="../shop/single-product-fullwidth.html"
                              className="btn-add-cart btn-primary transition-3d-hover"
                            >
                              <i className="ec ec-add-to-cart" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="product-item__footer">
                        <div className="border-top pt-2 flex-center-between flex-wrap">
                          <a
                            href="../shop/compare.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-compare mr-1 font-size-15" />{" "}
                            Compare
                          </a>
                          <a
                            href="../shop/wishlist.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-favorites mr-1 font-size-15" />{" "}
                            Add to Wishlist
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="col-6 col-wd-3 col-md-4 product-item">
                  <div className="product-item__outer h-100">
                    <div className="product-item__inner px-xl-4 p-3">
                      <div className="product-item__body pb-xl-2">
                        <div className="mb-2">
                          <a
                            href="../shop/product-categories-7-column-full-width.html"
                            className="font-size-12 text-gray-5"
                          >
                            Speakers
                          </a>
                        </div>
                        <h5 className="mb-1 product-item__title">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="text-blue font-weight-bold"
                          >
                            Purple Solo 2 Wireless
                          </a>
                        </h5>
                        <div className="mb-2">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="d-block text-center"
                          >
                            <img
                              className="img-fluid"
                              src="../../assets/img/212X200/img3.jpg"
                              alt="Image Description"
                            />
                          </a>
                        </div>
                        <div className="flex-center-between mb-1">
                          <div className="prodcut-price">
                            <div className="text-gray-100">$685,00</div>
                          </div>
                          <div className="d-none d-xl-block prodcut-add-cart">
                            <a
                              href="../shop/single-product-fullwidth.html"
                              className="btn-add-cart btn-primary transition-3d-hover"
                            >
                              <i className="ec ec-add-to-cart" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="product-item__footer">
                        <div className="border-top pt-2 flex-center-between flex-wrap">
                          <a
                            href="../shop/compare.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-compare mr-1 font-size-15" />{" "}
                            Compare
                          </a>
                          <a
                            href="../shop/wishlist.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-favorites mr-1 font-size-15" />{" "}
                            Add to Wishlist
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="col-6 col-wd-3 col-md-4 product-item remove-divider-xl">
                  <div className="product-item__outer h-100">
                    <div className="product-item__inner px-xl-4 p-3">
                      <div className="product-item__body pb-xl-2">
                        <div className="mb-2">
                          <a
                            href="../shop/product-categories-7-column-full-width.html"
                            className="font-size-12 text-gray-5"
                          >
                            Speakers
                          </a>
                        </div>
                        <h5 className="mb-1 product-item__title">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="text-blue font-weight-bold"
                          >
                            Smartphone 6S 32GB LTE
                          </a>
                        </h5>
                        <div className="mb-2">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="d-block text-center"
                          >
                            <img
                              className="img-fluid"
                              src="../../assets/img/212X200/img4.jpg"
                              alt="Image Description"
                            />
                          </a>
                        </div>
                        <div className="flex-center-between mb-1">
                          <div className="prodcut-price">
                            <div className="text-gray-100">$685,00</div>
                          </div>
                          <div className="d-none d-xl-block prodcut-add-cart">
                            <a
                              href="../shop/single-product-fullwidth.html"
                              className="btn-add-cart btn-primary transition-3d-hover"
                            >
                              <i className="ec ec-add-to-cart" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="product-item__footer">
                        <div className="border-top pt-2 flex-center-between flex-wrap">
                          <a
                            href="../shop/compare.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-compare mr-1 font-size-15" />{" "}
                            Compare
                          </a>
                          <a
                            href="../shop/wishlist.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-favorites mr-1 font-size-15" />{" "}
                            Add to Wishlist
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="col-6 col-wd-3 col-md-4 product-item remove-divider-wd">
                  <div className="product-item__outer h-100">
                    <div className="product-item__inner px-xl-4 p-3">
                      <div className="product-item__body pb-xl-2">
                        <div className="mb-2">
                          <a
                            href="../shop/product-categories-7-column-full-width.html"
                            className="font-size-12 text-gray-5"
                          >
                            Speakers
                          </a>
                        </div>
                        <h5 className="mb-1 product-item__title">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="text-blue font-weight-bold"
                          >
                            Widescreen NX Mini F1 SMART NX
                          </a>
                        </h5>
                        <div className="mb-2">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="d-block text-center"
                          >
                            <img
                              className="img-fluid"
                              src="../../assets/img/212X200/img5.jpg"
                              alt="Image Description"
                            />
                          </a>
                        </div>
                        <div className="flex-center-between mb-1">
                          <div className="prodcut-price">
                            <div className="text-gray-100">$685,00</div>
                          </div>
                          <div className="d-none d-xl-block prodcut-add-cart">
                            <a
                              href="../shop/single-product-fullwidth.html"
                              className="btn-add-cart btn-primary transition-3d-hover"
                            >
                              <i className="ec ec-add-to-cart" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="product-item__footer">
                        <div className="border-top pt-2 flex-center-between flex-wrap">
                          <a
                            href="../shop/compare.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-compare mr-1 font-size-15" />{" "}
                            Compare
                          </a>
                          <a
                            href="../shop/wishlist.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-favorites mr-1 font-size-15" />{" "}
                            Add to Wishlist
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="col-6 col-wd-3 col-md-4 product-item">
                  <div className="product-item__outer h-100">
                    <div className="product-item__inner px-xl-4 p-3">
                      <div className="product-item__body pb-xl-2">
                        <div className="mb-2">
                          <a
                            href="../shop/product-categories-7-column-full-width.html"
                            className="font-size-12 text-gray-5"
                          >
                            Speakers
                          </a>
                        </div>
                        <h5 className="mb-1 product-item__title">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="text-blue font-weight-bold"
                          >
                            Wireless Audio System Multiroom 360 degree Full base
                            audio
                          </a>
                        </h5>
                        <div className="mb-2">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="d-block text-center"
                          >
                            <img
                              className="img-fluid"
                              src="../../assets/img/212X200/img1.jpg"
                              alt="Image Description"
                            />
                          </a>
                        </div>
                        <div className="flex-center-between mb-1">
                          <div className="prodcut-price">
                            <div className="text-gray-100">$685,00</div>
                          </div>
                          <div className="d-none d-xl-block prodcut-add-cart">
                            <a
                              href="../shop/single-product-fullwidth.html"
                              className="btn-add-cart btn-primary transition-3d-hover"
                            >
                              <i className="ec ec-add-to-cart" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="product-item__footer">
                        <div className="border-top pt-2 flex-center-between flex-wrap">
                          <a
                            href="../shop/compare.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-compare mr-1 font-size-15" />{" "}
                            Compare
                          </a>
                          <a
                            href="../shop/wishlist.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-favorites mr-1 font-size-15" />{" "}
                            Add to Wishlist
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="col-6 col-wd-3 col-md-4 product-item remove-divider-xl">
                  <div className="product-item__outer h-100">
                    <div className="product-item__inner px-xl-4 p-3">
                      <div className="product-item__body pb-xl-2">
                        <div className="mb-2">
                          <a
                            href="../shop/product-categories-7-column-full-width.html"
                            className="font-size-12 text-gray-5"
                          >
                            Speakers
                          </a>
                        </div>
                        <h5 className="mb-1 product-item__title">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="text-blue font-weight-bold"
                          >
                            GameConsole Destiny Special Edition
                          </a>
                        </h5>
                        <div className="mb-2">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="d-block text-center"
                          >
                            <img
                              className="img-fluid"
                              src="../../assets/img/212X200/img7.jpg"
                              alt="Image Description"
                            />
                          </a>
                        </div>
                        <div className="flex-center-between mb-1">
                          <div className="prodcut-price">
                            <div className="text-gray-100">$685,00</div>
                          </div>
                          <div className="d-none d-xl-block prodcut-add-cart">
                            <a
                              href="../shop/single-product-fullwidth.html"
                              className="btn-add-cart btn-primary transition-3d-hover"
                            >
                              <i className="ec ec-add-to-cart" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="product-item__footer">
                        <div className="border-top pt-2 flex-center-between flex-wrap">
                          <a
                            href="../shop/compare.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-compare mr-1 font-size-15" />{" "}
                            Compare
                          </a>
                          <a
                            href="../shop/wishlist.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-favorites mr-1 font-size-15" />{" "}
                            Add to Wishlist
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="col-6 col-wd-3 col-md-4 product-item d-xl-none d-wd-block remove-divider-xl">
                  <div className="product-item__outer h-100">
                    <div className="product-item__inner px-xl-4 p-3">
                      <div className="product-item__body pb-xl-2">
                        <div className="mb-2">
                          <a
                            href="../shop/product-categories-7-column-full-width.html"
                            className="font-size-12 text-gray-5"
                          >
                            Speakers
                          </a>
                        </div>
                        <h5 className="mb-1 product-item__title">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="text-blue font-weight-bold"
                          >
                            Camera C430W 4k Waterproof
                          </a>
                        </h5>
                        <div className="mb-2">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="d-block text-center"
                          >
                            <img
                              className="img-fluid"
                              src="../../assets/img/212X200/img8.jpg"
                              alt="Image Description"
                            />
                          </a>
                        </div>
                        <div className="flex-center-between mb-1">
                          <div className="prodcut-price">
                            <div className="text-gray-100">$685,00</div>
                          </div>
                          <div className="d-none d-xl-block prodcut-add-cart">
                            <a
                              href="../shop/single-product-fullwidth.html"
                              className="btn-add-cart btn-primary transition-3d-hover"
                            >
                              <i className="ec ec-add-to-cart" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="product-item__footer">
                        <div className="border-top pt-2 flex-center-between flex-wrap">
                          <a
                            href="../shop/compare.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-compare mr-1 font-size-15" />{" "}
                            Compare
                          </a>
                          <a
                            href="../shop/wishlist.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-favorites mr-1 font-size-15" />{" "}
                            Add to Wishlist
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="col-6 col-wd-3 col-md-4 product-item d-xl-none d-wd-block remove-divider-wd">
                  <div className="product-item__outer h-100">
                    <div className="product-item__inner px-xl-4 p-3">
                      <div className="product-item__body pb-xl-2">
                        <div className="mb-2">
                          <a
                            href="../shop/product-categories-7-column-full-width.html"
                            className="font-size-12 text-gray-5"
                          >
                            Speakers
                          </a>
                        </div>
                        <h5 className="mb-1 product-item__title">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="text-blue font-weight-bold"
                          >
                            Full Color LaserJet Pro M452dn
                          </a>
                        </h5>
                        <div className="mb-2">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="d-block text-center"
                          >
                            <img
                              className="img-fluid"
                              src="../../assets/img/212X200/img6.jpg"
                              alt="Image Description"
                            />
                          </a>
                        </div>
                        <div className="flex-center-between mb-1">
                          <div className="prodcut-price">
                            <div className="text-gray-100">$685,00</div>
                          </div>
                          <div className="d-none d-xl-block prodcut-add-cart">
                            <a
                              href="../shop/single-product-fullwidth.html"
                              className="btn-add-cart btn-primary transition-3d-hover"
                            >
                              <i className="ec ec-add-to-cart" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="product-item__footer">
                        <div className="border-top pt-2 flex-center-between flex-wrap">
                          <a
                            href="../shop/compare.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-compare mr-1 font-size-15" />{" "}
                            Compare
                          </a>
                          <a
                            href="../shop/wishlist.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-favorites mr-1 font-size-15" />{" "}
                            Add to Wishlist
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div
              className="tab-pane fade pt-2"
              id="pills-three-example1"
              role="tabpanel"
              aria-labelledby="pills-three-example1-tab"
            >
              <ul className="row list-unstyled products-group no-gutters">
                <li className="col-6 col-wd-3 col-md-4 product-item">
                  <div className="product-item__outer h-100">
                    <div className="product-item__inner px-xl-4 p-3">
                      <div className="product-item__body pb-xl-2">
                        <div className="mb-2">
                          <a
                            href="../shop/product-categories-7-column-full-width.html"
                            className="font-size-12 text-gray-5"
                          >
                            Speakers
                          </a>
                        </div>
                        <h5 className="mb-1 product-item__title">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="text-blue font-weight-bold"
                          >
                            Wireless Audio System Multiroom 360 degree Full base
                            audio
                          </a>
                        </h5>
                        <div className="mb-2">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="d-block text-center"
                          >
                            <img
                              className="img-fluid"
                              src="../../assets/img/212X200/img1.jpg"
                              alt="Image Description"
                            />
                          </a>
                        </div>
                        <div className="flex-center-between mb-1">
                          <div className="prodcut-price">
                            <div className="text-gray-100">$685,00</div>
                          </div>
                          <div className="d-none d-xl-block prodcut-add-cart">
                            <a
                              href="../shop/single-product-fullwidth.html"
                              className="btn-add-cart btn-primary transition-3d-hover"
                            >
                              <i className="ec ec-add-to-cart" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="product-item__footer">
                        <div className="border-top pt-2 flex-center-between flex-wrap">
                          <a
                            href="../shop/compare.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-compare mr-1 font-size-15" />{" "}
                            Compare
                          </a>
                          <a
                            href="../shop/wishlist.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-favorites mr-1 font-size-15" />{" "}
                            Add to Wishlist
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="col-6 col-wd-3 col-md-4 product-item">
                  <div className="product-item__outer h-100">
                    <div className="product-item__inner px-xl-4 p-3">
                      <div className="product-item__body pb-xl-2">
                        <div className="mb-2">
                          <a
                            href="../shop/product-categories-7-column-full-width.html"
                            className="font-size-12 text-gray-5"
                          >
                            Speakers
                          </a>
                        </div>
                        <h5 className="mb-1 product-item__title">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="text-blue font-weight-bold"
                          >
                            Tablet White EliteBook Revolve 810 G2
                          </a>
                        </h5>
                        <div className="mb-2">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="d-block text-center"
                          >
                            <img
                              className="img-fluid"
                              src="../../assets/img/212X200/img2.jpg"
                              alt="Image Description"
                            />
                          </a>
                        </div>
                        <div className="flex-center-between mb-1">
                          <div className="prodcut-price">
                            <div className="text-gray-100">$685,00</div>
                          </div>
                          <div className="d-none d-xl-block prodcut-add-cart">
                            <a
                              href="../shop/single-product-fullwidth.html"
                              className="btn-add-cart btn-primary transition-3d-hover"
                            >
                              <i className="ec ec-add-to-cart" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="product-item__footer">
                        <div className="border-top pt-2 flex-center-between flex-wrap">
                          <a
                            href="../shop/compare.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-compare mr-1 font-size-15" />{" "}
                            Compare
                          </a>
                          <a
                            href="../shop/wishlist.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-favorites mr-1 font-size-15" />{" "}
                            Add to Wishlist
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="col-6 col-wd-3 col-md-4 product-item remove-divider-xl">
                  <div className="product-item__outer h-100">
                    <div className="product-item__inner px-xl-4 p-3">
                      <div className="product-item__body pb-xl-2">
                        <div className="mb-2">
                          <a
                            href="../shop/product-categories-7-column-full-width.html"
                            className="font-size-12 text-gray-5"
                          >
                            Speakers
                          </a>
                        </div>
                        <h5 className="mb-1 product-item__title">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="text-blue font-weight-bold"
                          >
                            Purple Solo 2 Wireless
                          </a>
                        </h5>
                        <div className="mb-2">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="d-block text-center"
                          >
                            <img
                              className="img-fluid"
                              src="../../assets/img/212X200/img3.jpg"
                              alt="Image Description"
                            />
                          </a>
                        </div>
                        <div className="flex-center-between mb-1">
                          <div className="prodcut-price">
                            <div className="text-gray-100">$685,00</div>
                          </div>
                          <div className="d-none d-xl-block prodcut-add-cart">
                            <a
                              href="../shop/single-product-fullwidth.html"
                              className="btn-add-cart btn-primary transition-3d-hover"
                            >
                              <i className="ec ec-add-to-cart" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="product-item__footer">
                        <div className="border-top pt-2 flex-center-between flex-wrap">
                          <a
                            href="../shop/compare.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-compare mr-1 font-size-15" />{" "}
                            Compare
                          </a>
                          <a
                            href="../shop/wishlist.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-favorites mr-1 font-size-15" />{" "}
                            Add to Wishlist
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="col-6 col-wd-3 col-md-4 product-item remove-divider-wd">
                  <div className="product-item__outer h-100">
                    <div className="product-item__inner px-xl-4 p-3">
                      <div className="product-item__body pb-xl-2">
                        <div className="mb-2">
                          <a
                            href="../shop/product-categories-7-column-full-width.html"
                            className="font-size-12 text-gray-5"
                          >
                            Speakers
                          </a>
                        </div>
                        <h5 className="mb-1 product-item__title">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="text-blue font-weight-bold"
                          >
                            Smartphone 6S 32GB LTE
                          </a>
                        </h5>
                        <div className="mb-2">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="d-block text-center"
                          >
                            <img
                              className="img-fluid"
                              src="../../assets/img/212X200/img4.jpg"
                              alt="Image Description"
                            />
                          </a>
                        </div>
                        <div className="flex-center-between mb-1">
                          <div className="prodcut-price">
                            <div className="text-gray-100">$685,00</div>
                          </div>
                          <div className="d-none d-xl-block prodcut-add-cart">
                            <a
                              href="../shop/single-product-fullwidth.html"
                              className="btn-add-cart btn-primary transition-3d-hover"
                            >
                              <i className="ec ec-add-to-cart" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="product-item__footer">
                        <div className="border-top pt-2 flex-center-between flex-wrap">
                          <a
                            href="../shop/compare.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-compare mr-1 font-size-15" />{" "}
                            Compare
                          </a>
                          <a
                            href="../shop/wishlist.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-favorites mr-1 font-size-15" />{" "}
                            Add to Wishlist
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="col-6 col-wd-3 col-md-4 product-item">
                  <div className="product-item__outer h-100">
                    <div className="product-item__inner px-xl-4 p-3">
                      <div className="product-item__body pb-xl-2">
                        <div className="mb-2">
                          <a
                            href="../shop/product-categories-7-column-full-width.html"
                            className="font-size-12 text-gray-5"
                          >
                            Speakers
                          </a>
                        </div>
                        <h5 className="mb-1 product-item__title">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="text-blue font-weight-bold"
                          >
                            Widescreen NX Mini F1 SMART NX
                          </a>
                        </h5>
                        <div className="mb-2">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="d-block text-center"
                          >
                            <img
                              className="img-fluid"
                              src="../../assets/img/212X200/img5.jpg"
                              alt="Image Description"
                            />
                          </a>
                        </div>
                        <div className="flex-center-between mb-1">
                          <div className="prodcut-price">
                            <div className="text-gray-100">$685,00</div>
                          </div>
                          <div className="d-none d-xl-block prodcut-add-cart">
                            <a
                              href="../shop/single-product-fullwidth.html"
                              className="btn-add-cart btn-primary transition-3d-hover"
                            >
                              <i className="ec ec-add-to-cart" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="product-item__footer">
                        <div className="border-top pt-2 flex-center-between flex-wrap">
                          <a
                            href="../shop/compare.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-compare mr-1 font-size-15" />{" "}
                            Compare
                          </a>
                          <a
                            href="../shop/wishlist.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-favorites mr-1 font-size-15" />{" "}
                            Add to Wishlist
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="col-6 col-wd-3 col-md-4 product-item remove-divider-xl">
                  <div className="product-item__outer h-100">
                    <div className="product-item__inner px-xl-4 p-3">
                      <div className="product-item__body pb-xl-2">
                        <div className="mb-2">
                          <a
                            href="../shop/product-categories-7-column-full-width.html"
                            className="font-size-12 text-gray-5"
                          >
                            Speakers
                          </a>
                        </div>
                        <h5 className="mb-1 product-item__title">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="text-blue font-weight-bold"
                          >
                            Full Color LaserJet Pro M452dn
                          </a>
                        </h5>
                        <div className="mb-2">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="d-block text-center"
                          >
                            <img
                              className="img-fluid"
                              src="../../assets/img/212X200/img6.jpg"
                              alt="Image Description"
                            />
                          </a>
                        </div>
                        <div className="flex-center-between mb-1">
                          <div className="prodcut-price">
                            <div className="text-gray-100">$685,00</div>
                          </div>
                          <div className="d-none d-xl-block prodcut-add-cart">
                            <a
                              href="../shop/single-product-fullwidth.html"
                              className="btn-add-cart btn-primary transition-3d-hover"
                            >
                              <i className="ec ec-add-to-cart" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="product-item__footer">
                        <div className="border-top pt-2 flex-center-between flex-wrap">
                          <a
                            href="../shop/compare.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-compare mr-1 font-size-15" />{" "}
                            Compare
                          </a>
                          <a
                            href="../shop/wishlist.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-favorites mr-1 font-size-15" />{" "}
                            Add to Wishlist
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="col-6 col-wd-3 col-md-4 product-item d-xl-none d-wd-block remove-divider-xl">
                  <div className="product-item__outer h-100">
                    <div className="product-item__inner px-xl-4 p-3">
                      <div className="product-item__body pb-xl-2">
                        <div className="mb-2">
                          <a
                            href="../shop/product-categories-7-column-full-width.html"
                            className="font-size-12 text-gray-5"
                          >
                            Speakers
                          </a>
                        </div>
                        <h5 className="mb-1 product-item__title">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="text-blue font-weight-bold"
                          >
                            GameConsole Destiny Special Edition
                          </a>
                        </h5>
                        <div className="mb-2">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="d-block text-center"
                          >
                            <img
                              className="img-fluid"
                              src="../../assets/img/212X200/img7.jpg"
                              alt="Image Description"
                            />
                          </a>
                        </div>
                        <div className="flex-center-between mb-1">
                          <div className="prodcut-price">
                            <div className="text-gray-100">$685,00</div>
                          </div>
                          <div className="d-none d-xl-block prodcut-add-cart">
                            <a
                              href="../shop/single-product-fullwidth.html"
                              className="btn-add-cart btn-primary transition-3d-hover"
                            >
                              <i className="ec ec-add-to-cart" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="product-item__footer">
                        <div className="border-top pt-2 flex-center-between flex-wrap">
                          <a
                            href="../shop/compare.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-compare mr-1 font-size-15" />{" "}
                            Compare
                          </a>
                          <a
                            href="../shop/wishlist.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-favorites mr-1 font-size-15" />{" "}
                            Add to Wishlist
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="col-6 col-wd-3 col-md-4 product-item d-xl-none d-wd-block remove-divider-wd">
                  <div className="product-item__outer h-100">
                    <div className="product-item__inner px-xl-4 p-3">
                      <div className="product-item__body pb-xl-2">
                        <div className="mb-2">
                          <a
                            href="../shop/product-categories-7-column-full-width.html"
                            className="font-size-12 text-gray-5"
                          >
                            Speakers
                          </a>
                        </div>
                        <h5 className="mb-1 product-item__title">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="text-blue font-weight-bold"
                          >
                            Camera C430W 4k Waterproof
                          </a>
                        </h5>
                        <div className="mb-2">
                          <a
                            href="../shop/single-product-fullwidth.html"
                            className="d-block text-center"
                          >
                            <img
                              className="img-fluid"
                              src="../../assets/img/212X200/img8.jpg"
                              alt="Image Description"
                            />
                          </a>
                        </div>
                        <div className="flex-center-between mb-1">
                          <div className="prodcut-price">
                            <div className="text-gray-100">$685,00</div>
                          </div>
                          <div className="d-none d-xl-block prodcut-add-cart">
                            <a
                              href="../shop/single-product-fullwidth.html"
                              className="btn-add-cart btn-primary transition-3d-hover"
                            >
                              <i className="ec ec-add-to-cart" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="product-item__footer">
                        <div className="border-top pt-2 flex-center-between flex-wrap">
                          <a
                            href="../shop/compare.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-compare mr-1 font-size-15" />{" "}
                            Compare
                          </a>
                          <a
                            href="../shop/wishlist.html"
                            className="text-gray-6 font-size-13"
                          >
                            <i className="ec ec-favorites mr-1 font-size-15" />{" "}
                            Add to Wishlist
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
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
