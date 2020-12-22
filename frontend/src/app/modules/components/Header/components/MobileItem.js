import * as React from "react";
import { Link } from 'react-router-dom';

const MobileItem = (props) => {

    const render = () => {
        return (
            <div className="col col-xl-auto text-right text-xl-left pl-0 pl-xl-3 position-static">
                <div className="d-inline-flex">
                    <ul className="d-flex list-unstyled mb-0 align-items-center">
                        <li className="col d-xl-none px-2 px-sm-3 position-static">
                        <Link to="#" className="font-size-22 text-gray-90 text-lh-1 btn-text-secondary">
                            <span className="ec ec-search" />
                        </Link>
                        <div className="dropdown-menu dropdown-unfold dropdown-menu-right left-0 mx-2">
                            <form className="js-focus-state input-group px-3">
                            <input className="form-control" type="search" placeholder="Search Product" />
                            <div className="input-group-append">
                                <button className="btn btn-primary px-3" type="button"><i className="font-size-18 ec ec-search" /></button>
                            </div>
                            </form>
                        </div>
                        </li>
                        <li className="col d-xl-none px-2 px-sm-3">
                            <Link to="#" className="text-gray-90" data-toggle="tooltip" data-placement="top" title="My Account">
                                <i className="font-size-22 ec ec-user" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    return render()
}

export default MobileItem;