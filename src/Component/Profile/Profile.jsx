import React, { useState, useEffect } from "react";
import "./Profile.css";
import userImage from "./userImage.png";
import { useHistory, useParams } from "react-router-dom";
import firebaseDb from "../../firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../Navbar/Navbar";
const initialValue = {
  name: "",
  _ID: "",
  username: "",
  email: "",
};

function Profile() {
  const [data, setData] = useState();
  const [myDate, setMyDate] = useState("");
  const [startDate, setStartDate] = useState("");
  useEffect(() => {
    getAllData();
  }, []);
  useEffect(() => {
    setDate();
  }, [startDate]);
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

  const { id } = useParams();
  const [user, setUser] = useState(initialValue);

  const history = useHistory();
  const auth = localStorage.getItem("id");
  useEffect(() => {
    loadUserDetails();
  }, []);

  const deleteUserData = async () => {
    const userRef = firebaseDb.database().ref(`Contacts/${id}`);
    userRef.remove();
    localStorage.clear();
    history.push("/login");
  };

  const loadUserDetails = async () => {
    const userRef = await firebaseDb.database().ref(`Contacts/${id}`);
    userRef.on("value", (snapshot) => {
      setUser(snapshot.val());
    });
  };

  const handleClick = () => {
    history.push(`/edit/${id}`);
  };

  const displayAccount = (user) => {
    return (
      <div className="profileDataInfos">
        <div className="col-4 profileAmount">{user.amount}</div>
        <div className="col-4 profileUsed">{user.reason}</div>
        <div className="col-4 profileDate">{user.date}</div>
      </div>
    );
  };

  const goToEdit = () => {
    history.push(`/edit/${id}`);
  };
  if (id == auth) {
    return (
      <div className="Profile">
        <Navbar />
        <div className="container">
          <div className="row profileProfile">
            <div className="col-sm-4 profileImage">
              {/* <img src={user} alt="" /> */}
              <img src={userImage} alt="" />
            </div>
            <div className="col-sm-8 profileInfo">
              <h1>
                {user.name} {user.username}
              </h1>
              <h4>User ID: {user._ID}</h4>
              <h4>{user.email}</h4>
              <button onClick={goToEdit}>Edit</button>
            </div>
          </div>
          <div className="row profileAllTransactions">
            <div className="col-5 profileAll">
              <h3>All transactions</h3>
            </div>
            <div className="col-7 profileSelectDate">
              Choose date :
              {/* <input
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              value={startDate}
               type="date" /> */}
              <DatePicker
                selected={startDate}
                value={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                className="profileDisplayDate"
              />
            </div>
          </div>
          <div className="row profileDatas">
            <div className="profileDataInfos">
              <div className="col-4 profileAmount">Amount</div>
              <div className="col-4 profileUsed">User for</div>
              <div className="col-4 profileDate">Date</div>
            </div>
          </div>
          <div className="row profileDatas">
            {/* <div className="profileDataInfos"> */}
            {data
              ? data
                  .filter((data) => myDate == data.date)
                  .map((user) => displayAccount(user))
              : "Please select a date"}
            {/* </div> */}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>{history.push("/login")}</div>;
  }
}

export default Profile;
