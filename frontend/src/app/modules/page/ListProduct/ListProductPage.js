import React, { useMemo } from "react";
import { Layout } from "../../components";
import { ListProduct } from "../../components/Products/ListProduct";
import { ListAddress } from "./ListAddress";
import { ListBrand } from "./ListBrand";

export default function ListProductPage(props) {
  const { type, id } = props.match.params;
  const params = useMemo(() => {
    const params = {
      pageSize: 40,
    };
    switch (type) {
      case "c":
        params.categoryIds = [id];
        break;
      case "b":
        params.brandIds = [id];
        break;
      case "s":
        params.searchTerm = id;
        break;
    }
    return params;
  }, [type, id]);

  return (
    <Layout staticSideBar={true}>
      <div className="flex container my-8">
        <div className="w-1/4 mr-5">
          <h3 className="mb-4 text-lg font-bold">Bộ lọc sản phẩm</h3>
          {type !== "s" ? (
            <>
              <h4
                className="font-bold mb-2 pb-2"
                style={{ borderBottom: "1px solid #fed700" }}
              >
                <b
                  className="px-4 py-2 font-bold rounded-t-lg"
                  style={{ background: "#fed700" }}
                >
                  Thương hiệu
                </b>
              </h4>
              <ListBrand categoryId={id} />
            </>
          ) : (
            ""
          )}
          <h4
            className="font-bold mt-4 mb-2 pb-2"
            style={{ borderBottom: "1px solid #fed700" }}
          >
            <b
              className="px-4 py-2 font-bold rounded-t-lg"
              style={{ background: "#fed700" }}
            >
              Địa chỉ nơi bán
            </b>
          </h4>
          <ListAddress />
          <h4
            className="font-bold mt-4 mb-2 pb-2"
            style={{ borderBottom: "1px solid #fed700" }}
          >
            <b
              className="px-4 py-2 font-bold rounded-t-lg"
              style={{ background: "#fed700" }}
            >
              Khoảng giá
            </b>
          </h4>
          <div className="relative mt-4">
            <div
              className="absolute h-4 w-4 rounded-full bg-white"
              style={{ border: "1px solid #fed700", left: -1, top: -4 }}
            ></div>
            <div className="w-full h-2" style={{ background: "#fed700" }}></div>
            <div
              className="absolute h-4 w-4 rounded-full bg-white"
              style={{ border: "1px solid #fed700", right: 0, top: -4 }}
            ></div>
          </div>
          <div className="flex mt-2">
            <b>0 đồng</b>
            <b className="ml-auto">200 triệu đồng</b>
          </div>
        </div>
        <div className="w-3/4">
          <ListProduct detail={true} params={params} />
        </div>
      </div>
    </Layout>
  );
}
