import  { useState, useEffect } from 'react';
import "./CoalHauling.css";
import { makeStyles, Card } from "@fluentui/react-components";
import Transaksi from "../../services/inputCoalHauling";
import { useParams } from "react-router-dom";

const useStyles = makeStyles({
  caption: {
    fontSize: "16px",
    textAlign: "center",
  },
});

const CardDataHaulingVertical = () => {
  const value = useParams();
  const styles = useStyles();
  const [data, setData] = useState({
    totalData: 0,
    dataHopper: 0,
    dataOverflow: 0,
    dataECF: 0,
    dataMiddleStock: 0,
    dataSekurau: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataTypes = [
          "getDataTotal",
          "getDataHopper",
          "getDataOverflow",
          "getDataECF",
          "getDataMiddleStock",
          "getDataSekurau",
        ];

        const fetchedData = await Promise.all(
          dataTypes.map(type => Transaksi[type](value.tanggal))
        );

        const newData = Object.fromEntries(
          fetchedData.map((result, index) => [
            dataTypes[index].replace('getData', '').toLowerCase(),
            result.result[0].total ?? 0,
          ])
        );

        setData(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [value.tanggal]);

  return (
    <div className="form-wrapper" style={{ marginBottom: "0" }}>
      <div className="card-base">
        <div className="row">
          {Object.keys(data).map((type, index) => (
            <div key={index} className="col-12">
              <Card className="card-data">
                <span className={styles.card}>{ type === 'total' ? 'Total Hauling' : type === 'hopper' ? `Total ${type}`:`Hauling To ${type}`}</span>
                <p className={styles.caption}>
                  <b>
                    {data[type]} <small>Ton</small>
                  </b>
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// const CardDataHaulingVertical = () => {
//   const value = useParams();
//   const styles = useStyles();
//   const [totalData, setTotalData] = useState(0);
//   const [dataHopper, setDataHopper] = useState(0);
//   const [dataOverflow, setDataOverflow] = useState(0);
//   const [dataECF, setDataECF] = useState(0);
//   const [dataMiddleStock, setDataMiddleStock] = useState(0);
//   const [dataSekurau, setDataSekurau] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const dataCard = await Transaksi.getDataTotal(value.tanggal);        
//         const dataHopper = await Transaksi.getDataHopper(value.tanggal);
//         const dataOverflow = await Transaksi.getDataOverflow(value.tanggal);
//         const dataECF = await Transaksi.getDataECF(value.tanggal);
//         const dataMiddleStock = await Transaksi.getDataMiddleStock(value.tanggal);
//         const dataSekurau = await Transaksi.getDataSekurau(value.tanggal);

//         setTotalData(dataCard.result[0].total ?? 0);
//         setDataHopper(dataHopper.result[0].total ?? 0);
//         setDataOverflow(dataOverflow.result[0].total ?? 0);
//         setDataECF(dataECF.result[0].total ?? 0);
//         setDataMiddleStock(dataMiddleStock.result[0].total ?? 0);
//         setDataSekurau(dataSekurau.result[0].total ?? 0);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [value.tanggal]);

//   return (
//     <>
//       <div className="form-wrapper" style={{ marginBottom: "0" }}>
//         <div className="card-base">
//           <Card style={{ marginBottom: "10px" }} className="card-data-full">
//             <span className={styles.card}>Total Hauling</span>
//             <p className={styles.caption}>
//               <b>
//                 {totalData} <small>Ton</small>
//               </b>
//             </p>
//           </Card>
//           <div className="row">
//             <div className="col-12">
//               <Card className="card-data">
//                 <span className={styles.card}>Hauling To Hopper</span>
//                 <p className={styles.caption}>
//                   <b>
//                     {dataHopper} <small>Ton</small>
//                   </b>
//                 </p>
//               </Card>
//             </div>
//             <div className="col-12">
//               <Card className="card-data">
//                 <span className={styles.card}>Hauling To OverFlow</span>
//                 <p className={styles.caption}>
//                   <b>
//                     {dataOverflow} <small>Ton</small>
//                   </b>
//                 </p>
//               </Card>
//             </div>
//             <div className="col-12">
//               <Card className="card-data">
//                 <span className={styles.card}>Hauling To ECF</span>
//                 <p className={styles.caption}>
//                   <b>
//                     {dataECF} <small>Ton</small>
//                   </b>
//                 </p>
//               </Card>
//             </div>
//             <div className="col-12">
//               <Card className="card-data">
//                 <span className={styles.card}>Hauling To MiddleStock</span>
//                 <p className={styles.caption}>
//                   <b>
//                     {dataMiddleStock} <small>Ton</small>
//                   </b>
//                 </p>
//               </Card>
//             </div>
//             <div className="col-12">
//               <Card className="card-data">
//                 <span className={styles.card}>Hauling To Sekurau</span>
//                 <p className={styles.caption}>
//                   <b>
//                     {dataSekurau} <small>Ton</small>
//                   </b>
//                 </p>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };


export default CardDataHaulingVertical;
