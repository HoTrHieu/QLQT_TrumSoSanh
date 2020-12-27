import * as React from "react";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  const renderDropdownMenu = () => {
    const dummyData = [
      {
        title: "item 1",
        to: "#",
      },
      {
        title: "item 2",
        to: "#",
      },
      {
        title: "item 3",
        to: "#",
      },
      {
        title: "item 4",
        to: "#",
      },
    ];
    return (
      <ul className="navbar-nav u-header__navbar-nav">
        {dummyData.map((item) => (
          <li
            className="nav-item u-header__nav-item"
            data-event="hover"
            data-position="left"
          >
            <Link
              to={item.to}
              className="nav-link u-header__nav-link font-weight-bold"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  const render = () => {
    return (
      <div className="col-md-auto d-none d-xl-block">
        <div className="max-width-270 min-width-270">
          <div id="basicsAccordion">
            <div className="card border-0">
              <div
                className="card-header card-collapse border-0"
                id="basicsHeadingOne"
              >
                <button
                  type="button"
                  className="btn-link btn-remove-focus btn-block d-flex card-btn py-3 text-lh-1 px-4 shadow-none btn-primary rounded-top-lg border-0 font-weight-bold text-gray-90"
                  data-toggle="collapse"
                  data-target="#basicsCollapseOne"
                  aria-expanded="true"
                  aria-controls="basicsCollapseOne"
                >
                  <span className="ml-0 text-gray-90 mr-2">
                    <span className="fa fa-list-ul" />
                  </span>
                  <span className="pl-1 text-gray-90">Tất cả bộ ngành</span>
                </button>
              </div>
              <div
                id="basicsCollapseOne"
                className="vertical-menu collapse"
                aria-labelledby="basicsHeadingOne"
                data-parent="#basicsAccordion"
              >
                <div className="card-body p-0">
                  <nav className="js-mega-menu navbar navbar-expand-xl u-header__navbar u-header__navbar--no-space hs-menu-initialized">
                    <div
                      id="navBar"
                      className="collapse navbar-collapse u-header__navbar-collapse"
                    >
                      {renderDropdownMenu()}
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return render();
};

export default Sidebar;
