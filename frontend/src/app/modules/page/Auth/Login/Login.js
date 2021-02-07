import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../../core/services/api-services/AuthService";
import Swal from  'sweetalert2'

export default class Login extends React.Component {

  state = {
    username: '',
    password: '',
  }

  handleChangeUsername = event => {
    this.setState({
      username: event.target.value
    });
  }
  handleChangePassword = event => {
    this.setState({
      password: event.target.value
    });
  }
  handleSubmit = event =>  {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
    }
    
    AuthService.checkLogin(user).then(res => {
      if(res.status === 201) {
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        window.location = '/';
      }
      else {
        Swal.fire({
          icon: 'error',
          text: 'Username hoặc mật khẩu chưa đúng !!!',
        })
      }
    });
  };

  render() {
    return (
      <div className="u-stats-progress__info_login u-header-sidebar__content">
        <form onSubmit={this.handleSubmit}>
          <div id="login" data-target-group="idForm" >
            <header className="text-center mb-4">
              <img className="img-fluid" src="../../assets/img/logo/logo.png" alt="Image Description"  />
              <h2 className="h4 mb-0">So sánh và tìm giá rẻ nhất</h2>
            </header>
            <div className="form-group">
              <div className="js-form-message js-focus-state">
                <label className="sr-only">Username</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <span className="fas fa-user" />
                    </span>
                  </div>
                  <input onChange={this.handleChangeUsername} className="form-control" placeholder="Username" required data-msg="Your username is invalid. Please try again." />
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
                  <input type="password" onChange={this.handleChangePassword} className="form-control" name="password" id="signupPassword" placeholder="Password" aria-label="Password" aria-describedby="signupPasswordLabel" required data-msg="Your password is invalid. Please try again." data-error-class="u-has-error" data-success-class="u-has-success" />
                </div>
              </div>
            </div>
            <div className="mb-2">
              <button type="submit" className="btn btn-block btn-sm btn-primary transition-3d-hover">
                Đăng Nhập
              </button>
            </div>
            <div className="text-center">
              <span className="text-dark">Bạn mới biết đến Trùm So Sánh ? </span>
              <Link to="/register">
                <span className="text-danger">Đăng Ký</span>
              </Link>
            </div>
            {/* <div className="text-center">
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
            </div> */}
          </div>
        </form>
      </div>
    );
  };
};

