import React from 'react';
import { useQuery } from "../../hooks/useQuery"
import axios from 'axios';
import { Loading } from '../../components/Loading/Loading';
import { Error } from '../../components/Error/Error';

async function fetchAddresses() {
  const { data } = await axios.get('/api/v1/address/all');
  return data;
}

export function ListAddress() {
  const { loading, error, data } = useQuery(fetchAddresses);
  
  if (loading) return <Loading />;
  if (error) return <Error />;
  
  return (
    <div className="overflow-auto" style={{ height: '430px' }}>
      {data.map(address => (
        <div className="p-2 border-bottom">{address.name}</div>
      ))}
    </div>
  )
}