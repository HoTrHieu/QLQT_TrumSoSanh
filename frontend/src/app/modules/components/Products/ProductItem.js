import React from "react";
import { Link } from "react-router-dom";
import { Formatter } from "../../utils/Formatter";

export function ProductItem(props) {
  return (
    <Link 
      to={"/list-shop/" + props.id} 
      className={'hover:shadow-lg p-3 ' + props.className}>
      <div>
        <img width="256" src={props.imageSources[0]} alt={props.name} />
        <h3 className="mt-2">{props.name}</h3>
        <p className="text-xs mt-2">Từ <b className="text-red-400">{Formatter.formatVND(props.minPrice)}</b> đến <b className="text-red-400">{Formatter.formatVND(props.maxPrice)}</b></p>
        <p className="text-xs">Có <b>{props.totalShop}</b> shop đang bán</p>
      </div>
    </Link>
  );
}
