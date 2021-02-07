import axios from 'axios';
import React, { useCallback, useState } from 'react';
import qs from 'querystring';
import { Loading } from '../Loading/Loading';
import { Error } from '../Error/Error';
import { ProductItem } from './ProductItem';
import { useQuery } from '../../hooks/useQuery';
import Pagination from 'rc-pagination';
import { Scroller } from '../../utils/Scroller';

export function ListProduct(props) {
  const [page, setPage] = useState(1);
  const fetchData = useCallback(async () => {
    const params = qs.parse(window.location.search);
    const { data } = await axios.get('/api/v1/product/search', {
      params: {
        page: params.page || page,
        pageSize: 5,
        ...props.params
      }
    });
    return data;
  }, [props.params, page]);

  const { loading, error, data } = useQuery(fetchData);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      {props.detail ? (
        <div className="flex">
          <h3 className="mb-2">Tổng cộng <b>{data.total}</b> sản phẩm</h3>
          <p className="ml-auto">Trang thứ <b>{data.page}</b></p>
        </div>
      ) : ''}

      <div className="flex flex-wrap">
        {data.items.map(item => (
          <ProductItem className="w-1/5 mb-5" {...item} />
        ))}
      </div>

      {props.detail ? (
        <div className="flex justify-center">
          <Pagination 
            current={data.page}
            total={data.total}
            pageSize={data.pageSize}
            onChange={page => {
              setPage(page);
              Scroller.scrollToTop(700);
            }} />
        </div>
      ) : ''}
    </>
  )
}