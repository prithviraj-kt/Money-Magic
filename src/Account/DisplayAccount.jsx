import React, { useEffect, useState } from "react";
import firebaseDb from "../firebase";
import { useParams, useHistory } from "react-router-dom";
import "./Display.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Account() {
  const [data, setData] = useState();
  const [myDate, setMyDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const auth = localStorage.getItem("id");
  const history = useHistory();
  useEffect(() => {
    getAllData();
  }, []);
  useEffect(() => {
    setDate();
  }, [startDate]);
  const { id } = useParams();
  const getAllData = async () => {
    const userRef = await firebaseDb.database().ref(`Accounts/${id}`);
    userRef.on("value", (snapshot) => {
      const user = snapshot.val();
      const userList = [];
      for (let id in user) {
        userList.push({ id, ...user[id] });
      }
      setData(userList);
    });
  };

  var newDate = "";

  const handleClick = async (user) => {
    const userRef = await firebaseDb.database().ref(`Accounts/${id}/${user}`);
    userRef.remove();
  };

  const setDate = () => {
    let myDate = startDate;
    let mm = myDate.toString().slice(4, 7);
    let dd = myDate.toString().slice(8, 10);
    let yy = myDate.toString().slice(11, 15);

    let monthNum = 0;
    switch (mm) {
      case "Jan":
        monthNum = 1;
        break;
      case "Feb":
        monthNum = 2;
        break;
      case "Mar":
        monthNum = 3;
        break;
      case "Apr":
        monthNum = 4;
        break;
      case "May":
        monthNum = 5;
        break;
      case "Jun":
        monthNum = 6;
        break;
      case "Jul":
        monthNum = 7;
        break;
      case "Aug":
        monthNum = 8;
        break;
      case "Sep":
        monthNum = 9;
        break;
      case "Oct":
        monthNum = 10;
        break;
      case "Nov":
        monthNum = 11;
        break;
      case "Dec":
        monthNum = 12;
        break;
      default:
      // alert("Invalid data entered");
    }

    newDate = dd + "/" + monthNum + "/" + yy;
    // alert(newDate);
    setMyDate(newDate);
  };

  // const count = (user) => {
  //   alert(newDate)
  //   alert(user.date)
  //   if(newDate == user.date){
  //     alert("Yohho")
  //   }
  // }

  const displayAccount = (user) => {
    return (
      <div>
        <div className="">
          <div className="row">
            <div className="col-2">{user.id}</div>
            <div className="col-2">{user.reason}</div>
            <div className="col-2">{user.amount}</div>
            {/* <div className="col-2">{user.time}</div> */}
            <div className="col-2">{user.date}</div>
            <div className="col-2">
              <button onClick={() => handleClick(user.id)}>Delete Data</button>
              {/* <button onClick={() => click(user)}>Click Me</button>
                <button onClick={() => count(user)}>Count</button> */}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (id == auth) {
    return (
      <div>
        <div className="container">
          <div className="row">
            <h1>Your accounts</h1>
          </div>
          <div className="row">
            <DatePicker
              selected={startDate}
              value={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className="row displayHeading">
            <div className="disId1 col-2">
              <b>ID</b>
            </div>
            <div className="disId2 col-2">
              <b>SPEND FOR</b>
            </div>
            <div className="disId3 col-2">
              <b>AMOUNT</b>
            </div>
            {/* <div className="disId4 col-2">
              <b>Time</b>
            </div> */}
            <div className="disId5 col-2">
              <b>Date</b>
            </div>
          </div>
          <div className="row">
            {data
              ? data
                  .filter((data) => myDate == data.date)
                  .map((user) => displayAccount(user))
              : "Please select a date"}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>{history.push("/login")}</div>;
  }
}

export default Account;
