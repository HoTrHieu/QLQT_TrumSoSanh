import axios from 'axios';
import React, { useCallback } from 'react';
import { Error } from '../../components/Error/Error';
import { Loading } from '../../components/Loading/Loading';
import { useQuery } from '../../hooks/useQuery';
import { Formatter } from '../../utils/Formatter';

export function ProductDetail(props) {
  const fetchProduct = useCallback(async () => {
    const { data } = await axios.get('/api/v1/product/detail-by-id/' + props.productId);
    return data;
  }, [props.productId]);
  
  const { loading, error, data } = useQuery(fetchProduct);

  if (loading) return <Loading />;
  if (error) return <Error />;
  
  return (
    <div className="flex pb-4">
      <div>
        <img width="256" src={data.imageSources[0]} alt={data.name} />
      </div>
      <div className="px-4">
        <h3 className="mt-2 text-lg font-bold mt-4">{data.name}</h3>
        <p className="text-xs mt-2">Từ <b className="text-red-400">{Formatter.formatVND(data.minPrice)}</b> đến <b className="text-red-400">{Formatter.formatVND(data.maxPrice)}</b></p>
        <p className="text-xs">Có <b>{data.totalShop}</b> shop đang bán</p>
      </div>
    </div>
  )
}