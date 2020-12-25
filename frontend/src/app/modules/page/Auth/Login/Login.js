import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Login = (props) => {

  const render = () => {
    return (
      <div className="u-stats-progress__info_login u-header-sidebar__content">
        <form className="js-validate">
          <div id="login" data-target-group="idForm" >
            <header className="text-center mb-4">
              <img className="img-fluid" src="../../assets/img/logo/logo.png" alt="Image Description"  />
              <h2 className="h4 mb-0">So sánh và tìm giá rẻ nhất</h2>
            </header>
            <div className="form-group">
              <div className="js-form-message js-focus-state">
                <label className="sr-only" htmlFor="signinEmail">Email</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="signinEmailLabel">
                      <span className="fas fa-user" />
                    </span>
                  </div>
                  <input type="email" className="form-control" name="email" id="signinEmail" placeholder="Email" aria-label="Email" aria-describedby="signinEmailLabel" required data-msg="Please enter a valid email address." data-error-class="u-has-error" data-success-class="u-has-success" />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="js-form-message js-focus-state">
                <label className="sr-only" htmlFor="signinPassword">Password</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="signinPasswordLabel">
                      <span className="fas fa-lock" />
                    </span>
                  </div>
                  <input type="password" className="form-control" name="password" id="signupPassword" placeholder="Password" aria-label="Password" aria-describedby="signupPasswordLabel" required data-msg="Your password is invalid. Please try again." data-error-class="u-has-error" data-success-class="u-has-success" />
                </div>
              </div>
            </div>
            <div className="mb-2">
              <Link to="/">
                <button type="submit" className="btn btn-block btn-sm btn-primary transition-3d-hover">
                  Đăng Nhập
                </button>
              </Link>
            </div>
            <div className="text-center">
              <span className="text-dark">Bạn mới biết đến Trùm So Sánh ? </span>
              <Link to="/register">
                <span className="text-danger">Đăng Ký</span>
              </Link>
            </div>
            <div className="text-center">
              <span className="u-divider u-divider--xs u-divider--text mb-4">OR</span>
            </div>
            <div className="d-flex">
              <a className="btn btn-block btn-sm btn-soft-facebook transition-3d-hover mr-1" href="#">
                <span className="fab fa-facebook-square mr-1" />
                Facebook
              </a>
              <a className="btn btn-block btn-sm btn-soft-google transition-3d-hover ml-1 mt-0" href="#">
                <span className="fab fa-google mr-1" />
                Google
              </a>
            </div>
          </div>
        </form>
      </div>
    );
  };

  return render();
};

export default Login;

