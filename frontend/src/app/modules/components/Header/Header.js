/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { Link } from 'react-router-dom';
import { Topbar, Menu, Sidebar, MobileItem } from './components';

const Header = (props) => {

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
                                    Trùm So Sánh
                                </Link>
                                </nav>
                            </div>
                            <div className="col d-none d-xl-block">
                                <form className="js-focus-state">
                                <label className="sr-only" htmlFor="searchproduct">Search</label>
                                <div className="input-group">
                                    <input type="text" className="form-control py-2 pl-5 font-size-15 border-right-0 height-40 border-width-2 rounded-left-pill border-primary" />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary height-40 py-2 px-3 rounded-right-pill" type="button" id="searchProduct1">
                                            <span className="ec ec-search font-size-24" />
                                        </button>
                                    </div>
                                </div>
                                </form>
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
                        <Menu></Menu>
                    </div>
                </div>
            </div>
            </header>
        )
    }

    return render()
}

export default Header;