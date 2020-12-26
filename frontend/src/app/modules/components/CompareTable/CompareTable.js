import React from "react";
import { Link } from "react-router-dom";

const CompareTable = (props) => {
  const renderProductImageRow = (data) => {
    return (
      <tr>
        <th className="min-width-200">Sản phẩm</th>
        {data.map((product, index) => {
          return (
            <td key={index}>
              <Link to="#" className="product d-block">
                <div className="product-compare-image">
                  <div className="d-flex mb-3">
                    <img
                      className="img-fluid mx-auto"
                      src={product.image}
                      alt="Description"
                    />
                  </div>
                </div>
                <h3 className="product-item__title text-blue font-weight-bold mb-3">
                  {product.name}
                </h3>
              </Link>
              <div className="text-warning mb-2">
                <small className="fas fa-star" />
                <small className="fas fa-star" />
                <small className="fas fa-star" />
                <small className="fas fa-star" />
                <small className="fas fa-star" />
              </div>
            </td>
          );
        })}
      </tr>
    );
  };

  const renderProductPriceRow = (data) => {
    return (
      <tr>
        <th>Giá</th>
        {data.map((product, index) => {
          return (
            <td key={index}>
              <div className="product-price">{product.price}</div>
            </td>
          );
        })}
      </tr>
    );
  };

  const renderAvailabilityRow = (data) => {
    return (
      <tr>
        <th>Có sẵn</th>
        {data.map((product, index) => {
          return (
            <td key={index}>
              <span>{product.availability}</span>
            </td>
          );
        })}
      </tr>
    );
  };

  const renderDescriptionRow = (data) => {
    return (
      <tr>
        <th>Mô tả</th>
        {data.map((product, index) => {
          return (
            <td key={index}>
              <ul>
                {product.description.map((item, idx) => {
                  return (
                    <li key={idx}>
                      <span className="">{item}</span>
                    </li>
                  );
                })}
              </ul>
            </td>
          );
        })}
      </tr>
    );
  };

  const renderAddToCartButtonRow = (data) => {
    const { onClickAddToCart } = props;
    return (
      <tr>
        <th>Thêm vào giỏ hàng</th>
        {data.map((product, index) => {
          return (
            <td key={index}>
              <div className="">
                <Link
                  to="#"
                  className="btn btn-soft-secondary mb-3 mb-md-0 font-weight-normal px-5 px-md-3 px-xl-5"
                  onClick={(e) => {
                    e.preventDefault();
                    onClickAddToCart && onClickAddToCart(index, product);
                  }}
                >
                  Thêm
                </Link>
              </div>
            </td>
          );
        })}
      </tr>
    );
  };

  const renderSkuRow = (data) => {
    return (
      <tr>
        <th>Sku</th>
        {data.map((product, index) => {
          return <td key={index}>{product.sku}</td>;
        })}
      </tr>
    );
  };

  const renderWeightRow = (data) => {
    return (
      <tr>
        <th>Trọng lượng</th>
        {data.map((product, index) => {
          return <td key={index}>{product.weight}</td>;
        })}
      </tr>
    );
  };

  const renderColorRow = (data) => {
    return (
      <tr>
        <th>Màu sắc</th>
        {data.map((product, index) => {
          return <td key={index}>{product.color}</td>;
        })}
      </tr>
    );
  };

  const renderRemoveButtonRow = (data) => {
    const { onClickRemove } = props;
    return (
      <tr>
        <th>Loại bỏ</th>
        {data.map((product, index) => {
          return (
            <td key={index} className="text-center">
              <Link
                to="#"
                className="text-gray-90"
                onClick={(e) => {
                  e.preventDefault();
                  onClickRemove && onClickRemove(index, product);
                }}
              >
                <i className="fa fa-times" />
              </Link>
            </td>
          );
        })}
      </tr>
    );
  };

  const render = () => {
    const { data } = props;
    return (
      <div className="table-responsive table-bordered table-compare-list mb-10 border-0">
        <table className="table">
          <tbody>
            {renderProductImageRow(data)}
            {renderProductPriceRow(data)}
            {renderAvailabilityRow(data)}
            {renderDescriptionRow(data)}
            {renderAddToCartButtonRow(data)}
            {renderSkuRow(data)}
            {renderWeightRow(data)}
            {renderColorRow(data)}
            {renderRemoveButtonRow(data)}
          </tbody>
        </table>
      </div>
    );
  };
  return render();
};

export default CompareTable;
