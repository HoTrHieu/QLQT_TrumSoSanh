import React from "react";
import {Link} from 'react-router-dom';

const Breadcrumb = (props) => {
  const render = () => {
    return (
      <div className="bg-gray-13 bg-md-transparent">
        <div className="container">
          <div className="my-md-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-3 flex-nowrap flex-xl-wrap overflow-auto overflow-xl-visble">
                <li className="breadcrumb-item flex-shrink-0 flex-xl-shrink-1">
                  <Link to="/home">Home</Link>
                </li>
                <li className="breadcrumb-item flex-shrink-0 flex-xl-shrink-1 active" aria-current="page">
                  Compare
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    );
  };

  return render();
};

export default Breadcrumb;
