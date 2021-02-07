import React from 'react';
import { Layout } from '../../components';
import { ListProduct } from '../../components/Products/ListProduct';
import { CategoryHeader } from './CategoryHeader';

const params = [
  { categoryIds: [56] },
  { categoryIds: [31], page: 4 },
  { categoryIds: [38] },
  { categoryIds: [34] },
  { categoryIds: [82], page: 2 },
  { categoryIds: [91] }
];

export default function HomePage() {
  return (
    <Layout staticSideBar={true}>
      <div className="container my-8">
        <CategoryHeader>
          Điện thoại - máy tính bảng
        </CategoryHeader>
        <ListProduct params={params[0]} />

        <CategoryHeader>Laptop - Thiết bị IT</CategoryHeader>
        <ListProduct params={params[1]} />
        
        <CategoryHeader>Điện Gia Dụng</CategoryHeader>
        <ListProduct params={params[3]} />

        <CategoryHeader>Điện tử - Điện lạnh</CategoryHeader>
        <ListProduct params={params[2]} />

        <CategoryHeader>Phụ kiện - Thiết bị số</CategoryHeader>
        <ListProduct params={params[4]} />

        <CategoryHeader>Đồ chơi, Mẹ & Bé</CategoryHeader>
        <ListProduct params={params[5]} />

      </div>
    </Layout>
  )
}