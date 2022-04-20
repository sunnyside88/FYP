import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";

import { useEffect, useState, createContext } from "react";
import { useSelector } from "react-redux";
ChartJS.register(ArcElement, Tooltip, Legend);

const ProductPie = () => {
  const { popularItems } = useSelector((state) => state.gis);

  const [products, setProducts] = useState({});
  const [data, setData] = useState(null);

  useEffect(() => {
    let bgColor = [
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(153, 102, 255, 0.2)",
    ];
    let borderColor = [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
    ];
    if (popularItems.length > 0) {
      let labels = [];
      let datas = [];
      popularItems[0].popularItems.map((x) => {
        labels.push(x._id);
        datas.push(x.total_qty);
      });
      let dataset = [
        {
          label: "Popular Products",
          data: datas,
          backgroundColor: bgColor.slice(0, labels.length),
          borderColor: borderColor.slice(0, labels.length),
          borderWidth: 1,
        },
      ];
      setData({
        labels: labels,
        datasets: dataset,
      });
    }
  }, [popularItems]);
  console.log(data,"xxxdata");
  return (
    <div
      style={{
        padding: 10,
        width:500,
      }}
    >
      {data ? (
        <Pie
          width={500}
          height={250}
          options={{
            maintainAspectRatio: false,
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
          data={data}
        />
      ) : null}
    </div>
  );
};

export default ProductPie;
