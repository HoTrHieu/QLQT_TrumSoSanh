import React from "react";
import { Layout } from "../../components";
import { ListShop } from "./ListShop";
import { ProductDetail } from "./ProductDetail";

export default function ListShopPage(props) {
  const { productId } = props.match.params;
  return (
    <Layout>
      <div className="container my-8">
        <ProductDetail productId={productId} />
        <h4
          className="font-bold mb-2 pb-2"
          style={{ borderBottom: "1px solid #fed700" }}
        >
          <b
            className="px-4 py-2 font-bold rounded-t-lg"
            style={{ background: "#fed700" }}
          >
            So sánh giá giữa các cửa hàng
          </b>
        </h4>
        <ListShop productId={productId} />
      </div>
    </Layout>
  );
}
