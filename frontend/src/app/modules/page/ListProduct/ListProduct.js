import React, { useState, useEffect } from "react";
import {
  Layout,
} from "../../components";
import { Link } from "react-router-dom";
import { ProductService } from "../../../core/services";

const ListProduct = (props) => {
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    ProductService.getProductSearch({page: 1,pageSize: 10,searchTerm: null,brandIds: null, categoryIds: props.match.params.id}).then(res=> {
        setListProduct(res.data.items)
    })
  }, [props.match.params.id]);

  const render = () => {
    return (
      <Layout>
          <main>
              <div className="container">
                <div className="mb-8">
                    <div className="tab-content">
                        <ul className="row list-unstyled products-group no-gutters">
                            {
                                listProduct.length > 0 &&
                                listProduct.map((item, index) => {
                                    return (
                                        <li key={index} className="col-6 col-md-3 col-xl-1gdot7 product-item">
                                            <div className="product-item__outer h-100">
                                                <div className="product-item__inner px-xl-4 p-3">
                                                <div className="product-item__body pb-xl-2">
                                                    <div className="mb-2"><Link to="#" className="font-size-12 text-gray-5">Speakers</Link></div>
                                                    <h5 className="mb-1 product-item__title"><Link to="#" className="text-blue font-weight-bold">{item.name}</Link></h5>
                                                    <div className="mb-2">
                                                    <Link to="#" className="d-block text-center"><img className="img-fluid" src={item.imageSources[0]} alt="Image Description" /></Link>
                                                    </div>
                                                    <div className="flex-center-between mb-1">
                                                    <div className="prodcut-price">
                                                        <div className="text-gray-100">{item.minPrice + 'đ'}</div>
                                                    </div>
                                                    <div className="d-none d-xl-block prodcut-add-cart">
                                                        <Link to="#" className="btn-add-cart btn-primary transition-3d-hover"><i className="ec ec-add-to-cart" /></Link>
                                                    </div>
                                                    </div>
                                                </div>
                                                <div className="product-item__footer">
                                                    <div className="border-top pt-2 flex-center-between flex-wrap">
                                                    <Link to="#" className="text-gray-6 font-size-13"><i className="ec ec-compare mr-1 font-size-15" /> Compare</Link>
                                                    <Link to="#" className="text-gray-6 font-size-13"><i className="ec ec-favorites mr-1 font-size-15" /> Wishlist</Link>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
              </div>
          </main>
      </Layout>
    );
  };

  return render();
};

export default ListProduct;
