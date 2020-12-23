import React from "react";
const CompareTable = (props) => {
  const renderProductImageRow = (data) => {
    return (
      <tr>
        <th className="min-width-200">Product</th>
        {data.map((product) => {
          return (
            <td>
              <a href="#" className="product d-block">
                <div className="product-compare-image">
                  <div className="d-flex mb-3">
                    <img
                      className="img-fluid mx-auto"
                      src={product.image}
                      alt="Image Description"
                    />
                  </div>
                </div>
                <h3 className="product-item__title text-blue font-weight-bold mb-3">
                  {product.name}
                </h3>
              </a>
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
        <th>Price</th>
        {data.map((product) => {
          return (
            <td>
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
        <th>Availability</th>
        {data.map((product) => {
          return (
            <td>
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
        <th>Description</th>
        {data.map((product) => {
          return (
            <td>
              <ul>
                {product.description.map((item) => {
                  return (
                    <li>
                      <span className>{item}</span>
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
        <th>Add to cart</th>
        {data.map((product, index) => {
          return (
            <td>
              <div className>
                <a
                  href="#"
                  className="btn btn-soft-secondary mb-3 mb-md-0 font-weight-normal px-5 px-md-3 px-xl-5"
                  onClick={(e) => {
                    e.preventDefault();
                    onClickAddToCart && onClickAddToCart(index, product);
                  }}
                >
                  Add to cart
                </a>
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
        {data.map((product) => {
          return <td>{product.sku}</td>;
        })}
      </tr>
    );
  };

  const renderWeightRow = (data) => {
    return (
      <tr>
        <th>Weight</th>
        {data.map((product) => {
          return <td>{product.weight}</td>;
        })}
      </tr>
    );
  };

  const renderColorRow = (data) => {
    return (
      <tr>
        <th>color</th>
        {data.map((product) => {
          return <td>{product.color}</td>;
        })}
      </tr>
    );
  };

  const renderRemoveButtonRow = (data) => {
    const { onClickRemove } = props;
    return (
      <tr>
        <th>Remove</th>
        {data.map((product, index) => {
          return (
            <td className="text-center">
              <a
                href="#"
                className="text-gray-90"
                onClick={(e) => {
                  e.preventDefault();
                  onClickRemove && onClickRemove(index, product);
                }}
              >
                <i className="fa fa-times" />
              </a>
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
