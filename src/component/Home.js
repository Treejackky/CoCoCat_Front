import { Route, Routes, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

import Appbar from "../Appbar";

export default function Dashboard() {
  // axios fetch data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numcat, setNumcat] = useState(1);
  const [numcamera, setNumcamera] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   let num_cat = parseInt(JSON.parse(localStorage.getItem("number_of_cats")));
  //   let num_camera = parseInt(JSON.parse(localStorage.getItem("number_of_cameras")));
  //   setNumcat(num_cat);
  //   setNumcamera(num_camera);

  // },[numcat, numcamera]);


  const fetchData = async () => {
    axios.get("http://localhost:8700/v1/room").then((res) => {
      setData(res.data.body);
      setLoading(false);
      console.log(res.data.body);
    });
  };

  const saveToLocalStorage = (index) => {
    localStorage.setItem("data", JSON.stringify(data[index]));

    const res = JSON.parse(localStorage.getItem("data"));
    // console.log(index);
    
  };

  const handleTimeChange = (e) => {
    setNumcat(e.numcat);
    setNumcamera(e.numcamera);
    console.log(e);
  }


  return (
    <>
    <Appbar 
      handleAppbar={(e) => handleTimeChange(e)}   
    />
      <h1>Dashboard</h1>
      {/* {numcamera}
      {numcat} */}
      {data.map((item, index) => (
        <div key={index}>
          <h2>{item.room_name}</h2>
          {numcamera > item.cameras*(Math.ceil((numcat)/item.number_of_cats)) ? <p> จำนวนกล้องไม่เพียงพอ </p> : <p>สามารถใช้กล้องได้มากสุด {item.cameras} ตัว ต่อ 1 ห้อง</p>}
          {numcat > item.number_of_cats*item.number_of_rooms ? <p> ต้องการ {Math.ceil((numcat)/item.number_of_cats)} ห้อง แต่เหลือเพียง {item.number_of_rooms} ห้องว่าง</p>: ""}
          <p> ประเภท : {item.type}</p>
          <p> ขนาด : {item.size} เมตร </p>
          <p> จำนวนแมว : {item.number_of_cats} สูงสุด</p>
          <p> ราคา : {item.price} บาท </p>
          <p> ห้องที่ว่าง {item.number_of_rooms} ห้อง </p>
          <p> จำนวนกล้อง : {item.cameras}</p>
          <p> คำอธิบาย : {item.description}</p>
          <p> เวลาเริ่มเช็คอิน : จาก: 08:00 ถึง เวลาเช็คเอาท์ : 17:00</p>
           

          {item.image.map((img, index) => (
            <img
              key={index}
              src={
                "https://szrepoqlfkcnlfdeicse.supabase.co/storage/v1/object/public/rooms/" +
                item.type +
                "/" +
                img
              }
              alt={item.type}
              width={200}
              height={200}
            />
          ))}


        
          <div>
            <Link to={`/detail/${item.type}`}>
              <button onClick={()=>{saveToLocalStorage(index)}}>จองที่พัก</button>{" "}
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
<></>;
