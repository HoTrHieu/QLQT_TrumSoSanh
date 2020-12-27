import * as React from "react";
import { Link } from "react-router-dom";

const Menu = (props) => {
  const render = () => {
    return (
      <div className="col">
        <nav className="js-mega-menu navbar navbar-expand-md u-header__navbar u-header__navbar--no-space">
          <div
            id="navBar"
            className="collapse navbar-collapse u-header__navbar-collapse"
          >
            <ul className="navbar-nav u-header__navbar-nav">
              <li className="nav-item hs-has-mega-menu u-header__nav-item">
                <Link to="/" className="nav-link u-header__nav-link text-sale">
                  Trang chủ
                </Link>
              </li>
              <li className="nav-item u-header__nav-item">
                <Link className="nav-link u-header__nav-link" to="#">
                  Thương hiệu nổi bật
                </Link>
              </li>
              <li className="nav-item u-header__nav-item">
                <Link className="nav-link u-header__nav-link" to="#">
                  Phong cách thịnh hành
                </Link>
              </li>
              <li className="nav-item u-header__nav-item">
                <Link className="nav-link u-header__nav-link" to="#">
                  Thẻ quà tặng
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  };

  return render();
};

export default Menu;
