import axios from 'axios';
import Pagination from 'rc-pagination';
import React, { useCallback, useState } from 'react';
import { Error } from '../../components/Error/Error';
import { Loading } from '../../components/Loading/Loading';
import { useQuery } from '../../hooks/useQuery';
import { Formatter } from '../../utils/Formatter';
import { Scroller } from '../../utils/Scroller';

export function ListShop(props) {
  const [page, setPage] = useState(1);
  const fetchShops = useCallback(async () => {
    const { data } = await axios.get('/api/v1/shop/search', {
      params: {
        page,
        pageSize: 20,
        productId: props.productId
      }
    });
    return data;
  }, [props.productId, page]);

  const { loading, error, data } = useQuery(fetchShops);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="p-5">
      <div className="flex">
        <h3 className="mb-2">Tổng cộng <b>{data.total}</b> shop</h3>
        <p className="ml-auto">Trang thứ <b>{data.page}</b></p>
      </div>

      <div>
        {data.items.map(item => (
          <div className="flex p-4 border rounded mb-4 mt-2">
            <div className="mr-6">
              <img width="128" src={item.imageSource} alt={item.title} />
            </div>
            <a href={item.url} className="block" target="_blank">
              <h1><b className="text-blue-500">{item.name}</b></h1>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="">{item.description}</p>
              <p className="font-bold text-red-700">{Formatter.formatVND(item.price)}</p>
            </a>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Pagination 
          current={data.page}
          total={data.total}
          pageSize={data.pageSize}
          onChange={page => {
            setPage(page);
            Scroller.scrollToTop(400);
          }} />
      </div>
    </div>
  )
}