import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../../core/services/api-services/AuthService";
import Swal from  'sweetalert2'

export default class Register extends React.Component {

  state = {
    email: '',
    password: '',
    confirmpassword: ''
  }

  handleChangeEmail = event => {
    this.setState({
      email: event.target.value
    });
  }
  handleChangePassword = event => {
    this.setState({
      password: event.target.value
    });
  }
  handleChangeConfirmPasswork = event => {
    this.setState({
      confirmpassword: event.target.value
    });
  }

  handleSubmit = event =>  {
    event.preventDefault();
    const password = this.state.password;
    const confirmpassword = this.state.confirmpassword;

    if(password != confirmpassword) {
      Swal.fire({
        icon: 'error',
        text: 'Mật khẩu xác nhận không chính xác !!!',
      })
    }
    else {
      const user = {
        email: this.state.email,
        password: this.state.password,
      }
      AuthService.checkExistEmail(user).then(res => {
        if(res.status == 200) {
          Swal.fire({
            icon: 'error',
            text: 'Email này đã tồn tại !!!',            
          })
        }
        else {
          AuthService.createUser(user).then(res => {
            Swal.fire({
              icon: 'success',
              text: 'Tạo thành công',
              html: 'Nhấn vào ' +
                    '<a href="/login">đây</a> ' +
                    'để đăng nhập !!!',
            })
          })
        }
      })
    }
  }

  render() {
    return (
      <div className="u-stats-progress__info_login u-header-sidebar__content">
        <form onSubmit={this.handleSubmit}>
          <div data-target-group="idForm" >
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
                  <input type="email" onChange={this.handleChangeEmail} className="form-control" placeholder="Email" required data-msg="Vui lòng nhập Email." data-error-class="u-has-error" data-success-class="u-has-success" />
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
                    <input type="password" onChange={this.handleChangePassword} className="form-control" placeholder="Password" required data-msg="Your password is invalid. Please try again." data-error-class="u-has-error" data-success-class="u-has-success" />
                </div>
              </div>
            </div>
            <div className="form-group">
                <div className="js-form-message js-focus-state">
                    <label className="sr-only" htmlFor="signupConfirmPassword">Confirm Password</label>
                    <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="signupConfirmPasswordLabel">
                        <span className="fas fa-key" />
                        </span>
                    </div>
                      <input type="password" onChange={this.handleChangeConfirmPasswork} className="form-control" placeholder="Confirm Password" required data-msg="Password does not match the confirm password." data-error-class="u-has-error" data-success-class="u-has-success" />
                    </div>
                </div>
            </div>

            <div className="mb-2">
              <button type="submit" className="btn btn-block btn-sm btn-primary transition-3d-hover">
                Đăng Ký
              </button>
            </div>
            <div className="text-center">
              <span className="text-dark">Bạn đã có tài khoản tại Trùm So Sánh ? </span>
              <Link to="/login">
                <span className="text-danger">Đăng Nhập</span>
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
