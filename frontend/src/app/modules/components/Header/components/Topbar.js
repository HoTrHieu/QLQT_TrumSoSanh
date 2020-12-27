import * as React from "react";
import { Link } from 'react-router-dom';


const Topbar = (props) => {

    const render = () => {
        return (
            <div className="u-header-topbar py-2 d-none d-xl-block">
            <div className="container">
                <div className="d-flex align-items-center">
                <div className="topbar-left">
                    <Link to="/" className="text-gray-110 font-size-13 hover-on-dark">Welcome to Trùm So Sánh</Link>
                </div>
                <div className="topbar-right ml-auto">
                    <ul className="list-inline mb-0">
                        <li className="list-inline-item mr-0 u-header-topbar__nav-item u-header-topbar__nav-item-border">
                        <Link to="/login" className="u-header-topbar__nav-link">
                            <i className="ec ec-user mr-1" /> Register <span className="text-gray-50">or</span> Sign in
                        </Link>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
        )
    }

    return render()
}

export default Topbar;