import React from "react";

export function CategoryHeader(props) {
  return (
    <div className="flex items-center w-full mb-4" style={{ borderBottom: '1px solid #fed700' }}>
      <h3 className="px-4 py-2 font-bold rounded-t-lg" style={{ background: "#fed700" }}>
        {props.children}
      </h3>
      <a className="ml-auto hover:underline cursor-pointer" style={{ color: 'rgba(29, 78, 216)' }}>
        Xem thêm <span className="ml-2">&gt;</span>
      </a>
    </div>
  );
}
