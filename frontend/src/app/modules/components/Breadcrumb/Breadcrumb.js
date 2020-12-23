import React from "react";
const Breadcrumb = (props) => {
  const render = () => {
    return (
      <div class="bg-gray-13 bg-md-transparent">
        <div class="container">
          <div class="my-md-3">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb mb-3 flex-nowrap flex-xl-wrap overflow-auto overflow-xl-visble">
                <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1">
                  <a href="../home/index.html">Home</a>
                </li>
                <li
                  class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1 active"
                  aria-current="page"
                >
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
