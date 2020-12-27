import React from "react";
import { Breadcrumb, CompareTable, Layout } from "../../components";

const Compare = (props) => {
  const dummyData = Array(5).fill({
    image: "https://picsum.photos/212/200",
    name: "Protection Plan for MacBook Air / 13 inch MacBook Pro",
    price: "$250.00",
    availability: "In stock",

    sku: "5487FB8/44",
    weight: "500g",
    color: "Red",
    description: [
      "Intel Core i5 processors (13-inch model)",
      "Intel Iris Graphics 6100 (13-inch model)",
      "Flash storage",
      "Up to 10 hours of battery life2 (13-inch model)",
      "Force Touch trackpad (13-inch model)",
    ],
  });

  const render = () => {
    console.log("ahihi-props: ", props);
    return (
      <Layout>
        <Breadcrumb />
        <div className="container">
          <CompareTable
            data={dummyData}
            onClickAddToCart={(index, product) => {
              // do something...
            }}
            onClickRemove={(index, product) => {
              // do something...
            }}
          />
        </div>
      </Layout>
    );
  };

  return render();
};

export default Compare;
