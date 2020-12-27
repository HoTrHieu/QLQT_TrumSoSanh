import * as React from "react";
import { Link } from "react-router-dom";
import { Header, Slider } from "./../../components";

const Footer = (props) => {
  const render = () => {
    return (
      <footer>
        {/* Footer-newsletter */}
        <div className="bg-primary py-3">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7 mb-md-3 mb-lg-0">
                <div className="row align-items-center">
                  <div className="col-auto flex-horizontal-center">
                    <i className="ec ec-newsletter font-size-40" />
                    <h2 className="font-size-20 mb-0 ml-3">
                      Đăng ký nhận bản tin
                    </h2>
                  </div>
                  <div className="col my-4 my-md-0">
                    <h5 className="font-size-15 ml-4 mb-0">
                      .... và nhận{" "}
                      <strong>
                        phiếu giảm giá $ 20 cho lần mua sắm đầu tiên.
                      </strong>
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                {/* Subscribe Form */}
                <form className="js-validate js-form-message">
                  <label className="sr-only" htmlFor="subscribeSrEmail">
                    Địa chỉ Email
                  </label>
                  <div className="input-group input-group-pill">
                    <input
                      type="email"
                      className="form-control border-0 height-40"
                      name="email"
                      id="subscribeSrEmail"
                      placeholder="Địa chỉ Email"
                      aria-label="Email address"
                      aria-describedby="subscribeButton"
                      required
                      data-msg="Please enter a valid email address."
                    />
                    <div className="input-group-append">
                      <button
                        type="submit"
                        className="btn btn-dark btn-sm-wide height-40 py-2"
                        id="subscribeButton"
                      >
                        Đăng ký
                      </button>
                    </div>
                  </div>
                </form>
                {/* End Subscribe Form */}
              </div>
            </div>
          </div>
        </div>
        {/* End Footer-newsletter */}
        {/* Footer-bottom-widgets */}
        <div className="pt-4 pb-4 bg-gray-13">
          <div className="container">
            <div className="row align-items-center">
              <div className="mb-4">
                <Link to="/" className="d-inline-block">
                  <img
                    className="img-fluid"
                    src="../../assets/img/logo/logo.png"
                    alt="Image Description"
                  />
                </Link>
              </div>
              <div className="mb">
                <div className="row no-gutters">
                  <div className="col pl-3">
                    <h2 className="font-size-20 mb-0">
                      CÔNG TY CỔ PHẦN TRÙM SO SÁNH
                    </h2>
                    <div className="font-size-13 font-weight-bold">
                      Hotline so sánh giá giúp bạn:{" "}
                      <a href="tel:0868681051" className="text-90">
                        (+84) 86 861 051
                      </a>{" "}
                      (8h30 - 17h30){" "}
                    </div>
                    <div className="font-size-15 font-weight-Link">
                      Công cụ so sánh giá online - Không bán hàng
                    </div>
                    <div className="email">
                      E-mail:{" "}
                      <a
                        href="mailto:suport@trumsosanh.vn?subject=Help Need"
                        className="text-gray-90"
                      >
                        suport@trumsosanh.vn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Footer-bottom-widgets */}
      </footer>
    );
  };

  return render();
};

export default Footer;
