import React, { useEffect, useState } from "react";
import { Breadcrumb, CompareTable, Layout } from "../../components";

const Compare = (props) => {
  const [compareProducts, setCompareProducts] = useState(
    JSON.parse(localStorage.getItem("compareProducts"))
  );

  const render = () => {
    return (
      <Layout>
        <Breadcrumb />
        <div className="container">
          <CompareTable
            data={compareProducts}
            onClickAddToCart={(index, product) => {
              // do something...
            }}
            onClickRemove={(index, product) => {
              // do something...
              compareProducts.splice(index, 1);
              setCompareProducts([...compareProducts]);
              localStorage.setItem(
                "compareProducts",
                JSON.stringify(compareProducts)
              );
            }}
          />
        </div>
      </Layout>
    );
  };

  return render();
};

export default Compare;
