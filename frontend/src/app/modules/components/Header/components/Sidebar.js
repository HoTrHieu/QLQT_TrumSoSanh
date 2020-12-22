import * as React from "react";
import { Link } from 'react-router-dom';


const Sidebar = (props) => {

    const render = () => {
        return (
            <div className="col-md-auto d-none d-xl-block">
                <div className="max-width-270 min-width-270">
                    <div id="basicsAccordion">
                        <div className="card border-0">
                            <div className="card-header card-collapse border-0" id="basicsHeadingOne">
                            <button type="button" className="btn-link btn-remove-focus btn-block d-flex card-btn py-3 text-lh-1 px-4 shadow-none btn-primary rounded-top-lg border-0 font-weight-bold text-gray-90" data-toggle="collapse" data-target="#basicsCollapseOne" aria-expanded="true" aria-controls="basicsCollapseOne">
                                <span className="ml-0 text-gray-90 mr-2">
                                <span className="fa fa-list-ul" />
                                </span>
                                <span className="pl-1 text-gray-90">All Departments</span>
                            </button>
                            </div>
                            <div id="basicsCollapseOne" className="collapse show vertical-menu" aria-labelledby="basicsHeadingOne" data-parent="#basicsAccordion">
                            <div className="card-body p-0">
                                <nav className="js-mega-menu navbar navbar-expand-xl u-header__navbar u-header__navbar--no-space hs-menu-initialized">
                                <div id="navBar" className="collapse navbar-collapse u-header__navbar-collapse">
                                    <ul className="navbar-nav u-header__navbar-nav">
                                        <li className="nav-item u-header__nav-item" data-event="hover" data-position="left">
                                            <Link to="#" className="nav-link u-header__nav-link font-weight-bold">Value of the Day</Link>
                                        </li>
                                        <li className="nav-item u-header__nav-item" data-event="hover" data-position="left">
                                            <Link to="#" className="nav-link u-header__nav-link font-weight-bold">Top 100 Offers</Link>
                                        </li>
                                        <li className="nav-item u-header__nav-item" data-event="hover" data-position="left">
                                            <Link to="#" className="nav-link u-header__nav-link font-weight-bold">New Arrivals</Link>
                                        </li>
                                        <li className="nav-item u-header__nav-item" data-event="hover" data-position="left">
                                            <Link to="#" className="nav-link u-header__nav-link font-weight-bold">Computers &amp; Accessories</Link>
                                        </li>
                                        <li className="nav-item u-header__nav-item" data-event="hover" data-position="left">
                                            <Link to="#" className="nav-link u-header__nav-link font-weight-bold">Cameras, Audio &amp; Video</Link>
                                        </li>
                                        <li className="nav-item u-header__nav-item" data-event="hover" data-position="left">
                                            <Link to="#" className="nav-link u-header__nav-link font-weight-bold">Mobiles &amp; Tablets</Link>
                                        </li>
                                        <li className="nav-item u-header__nav-item" data-event="hover" data-position="left">
                                            <Link to="#" className="nav-link u-header__nav-link font-weight-bold">TV &amp; Audio</Link>
                                        </li>
                                    </ul>
                                </div>
                                </nav>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return render()
}

export default Sidebar;