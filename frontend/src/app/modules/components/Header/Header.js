/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Topbar, Menu, Sidebar, MobileItem } from "./components";
import { CategoryService } from "./../../../core/services";

const Header = (props) => {
  // const [listCategory, setListCategory] = useState();
  // useEffect(() => {
  //   CategoryService.getAll().then(res => {
  //     setListCategory(res.data);
  //     })
  // },[]);
  const handleSubmitInput = () => {
    const value = document.getElementById("searchproduct-item").value;
    props.history.push({
      pathname: "/list-product",
      search: `?searchTerm=${value}`,
    });
  };

  const render = () => {
    return (
      <header className="u-header u-header-left-aligned-nav">
        <div className="u-header__section">
          <Topbar></Topbar>
          <div className="py-2 py-xl-5 bg-primary-down-lg">
            <div className="container my-0dot5 my-xl-0">
              <div className="row align-items-center">
                <div className="col-auto">
                  <nav className="navbar navbar-expand u-header__navbar py-0 justify-content-xl-between max-width-270 min-width-270">
                    <Link className="" to="/">
                      <img
                        className="img-fluid"
                        src="../../assets/img/logo/logo.png"
                        alt="Image Description"
                      />
                    </Link>
                  </nav>
                </div>
                <div className="col d-none d-xl-block">
                  <div className="text-center">
                    <h2 className="font-size-15  font-weight-bold">
                      So sánh và tìm giá rẻ nhất
                    </h2>
                  </div>
                  <form className="js-focus-state">
                    <label className="sr-only" htmlFor="searchproduct">
                      Tìm Kiếm
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control py-2 pl-5 font-size-15 border-right-0 height-40 border-width-2 rounded-left-pill border-primary"
                        id="searchproduct-item"
                        placeholder="Tìm sản phẩm muốn so sánh giá"
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-primary height-40 py-2 px-3 rounded-right-pill"
                          type="button"
                          id="searchProduct1"
                          onClick={() => {
                            handleSubmitInput();
                          }}
                        >
                          <span className="ec ec-search font-size-24" />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="d-none d-xl-block col-md-auto">
                  <div className="d-flex col-mb-10">
                    <i className="ec ec-support font-size-50 text-primary" />
                    <div className="ml">
                      <div className="phone">
                        <strong>Hỗ trợ</strong>{" "}
                        <a href="tel:0868681051" className="text-gray-90">
                          (+84) 86 861 051
                        </a>
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
                <MobileItem></MobileItem>
              </div>
            </div>
          </div>
          {/* End Logo-Search-header-icons */}
          {/* Vertical-and-secondary-menu */}
          <div className="d-none d-xl-block container">
            <div className="row">
              <Sidebar></Sidebar>
              <Menu showCompareButton={props.showCompareButton}></Menu>
            </div>
          </div>
        </div>
      </header>
    );
  };

  return render();
};

export default withRouter(Header);
