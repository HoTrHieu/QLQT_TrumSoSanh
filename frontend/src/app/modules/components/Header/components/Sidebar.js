import React, {useState, useEffect} from "react";
import { Link, withRouter } from "react-router-dom";
import { CategoryService } from './../../../../core/services';

const Sidebar = (props) => {
  const [rootCategory, setRootCategory] = useState();
  const [forcus, setForcus] = useState(false);

  useEffect(() => {
    CategoryService.getChildCategory().then(res=>{
      if(res.data) {
        const listCate = res.data.slice(0, 13).map(item => {
          return {
            ...item,
            isForcus: false
          }
        })
        setRootCategory(listCate);
      }
    })
  },[]);

  const renderChildCategory = (listCate) => {

    return (
      <div className="hs-mega-menu vmm-tfw u-header__sub-menu animated hs-position-left fadeOut">
        {/* <div className="vmm-bg">
          <img className="img-fluid" src="../../assets/img/500X400/img1.png" alt="Image Description" />
        </div> */}
        <div className="row u-header__mega-menu-wrapper">
          <div className="col mb-3 mb-sm-0">
            {/* <span className="u-header__sub-menu-title">Computers &amp; Accessories</span> */}
            <ul className="u-header__sub-menu-nav-group mb-3">
              {
                listCate.map((item, index) => (
                  <li key={index}>
                    <Link to={`/list-product/${item.id}`} className="nav-link u-header__sub-menu-nav-link">{item.name}</Link>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }

  const handleForcus = (type, id) => {
    const newCate = rootCategory.map(item => {
      if(item.id == id) {
        return {
          ...item,
          isForcus: type === 'forcus' ? true : false
        }
      } else {
        return item
      }
    })
    setRootCategory(newCate)
  }

  const render = () => {
    //hs-mega-menu-opened
    const cusClass = ['nav-item', 'hs-has-mega-menu', 'u-header__nav-item'];
    forcus && cusClass.push('hs-mega-menu-opened');

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
                  <span className="pl-1 text-gray-90">Danh sách loại mặt hàng</span>
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
                      {
                        rootCategory &&
                        <ul className="navbar-nav u-header__navbar-nav">
                          {
                            rootCategory.map((item, index) => ( 
                              // className="nav-item hs-has-mega-menu u-header__nav-item hs-mega-menu-opened"
                              <li key={index} className={`nav-item hs-has-mega-menu u-header__nav-item ${item.isForcus ? 'hs-mega-menu-opened' : ''}`}
                                onFocus={() => handleForcus('forcus',item.id)}
                                onBlur={() => setTimeout(() => {
                                  handleForcus('blur',item.id)
                                }, 500)}
                              >
                                <Link to="#" className="nav-link u-header__nav-link u-header__nav-link-toggle"
                                >{item.name}</Link>
                                  {renderChildCategory(item.children)}
                              </li>
                            ))
                          }
                        </ul>
                      }
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

export default withRouter(Sidebar);
