import { Table } from "antd";

import { useEffect, useState, createContext } from "react";
import { useSelector } from "react-redux";
import ProductTableSchema from "../../schema/dashboard/ProductTableSchema";

const ProductTable = () => {
  const { products } = useSelector((state) => state.products);
  const [formattedData, setFormattedData] = useState([])

  useEffect(()=>{
      if(products.length>0){
          const data = products[0].products.filter(x=>x.stock_qty<10)
          setFormattedData(data)
      }
  },[products])

  return (
    <div
      style={{
        padding: 10,
        width:500,
      }}
    >
      <Table
        columns={ProductTableSchema}
        dataSource={formattedData}
        pagination={{ pageSize: 50 }}
        scroll={{ y: 240 }}
        size='small'
      />
      ,
    </div>
  );
};

export default ProductTable;
