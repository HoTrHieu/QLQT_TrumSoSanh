import axios from 'axios';
import React, { useCallback } from 'react';
import { Error } from '../../components/Error/Error';
import { Loading } from '../../components/Loading/Loading';
import { useQuery } from '../../hooks/useQuery';

export function ListBrand(props) {
  const fetchBrand = useCallback(async () => {
    const { data } = await axios.get('/api/v1/brand/get-by-category/' + props.categoryId);
    return data;
  }, [props.categoryId]);
  
  const { loading, error, data } = useQuery(fetchBrand);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="overflow-auto" style={{ height: '430px' }}>
      {data.map(category => (
        <div className="p-2 border-bottom">{category.name}</div>
      ))}
    </div>
  )
}