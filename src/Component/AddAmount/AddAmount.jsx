import React, { useState, useEffect, forwardRef } from "react";
import Navbar from "../Navbar/Navbar";
import "./AddAmount.css";
import { useParams, useHistory } from "react-router-dom";
import firebaseDb from "../../firebase";

const initialState = {
  amount: "",
  reason: "",
  time: "",
  date: "",
};
function AddAmount() {
  const { id } = useParams();
  const auth = localStorage.getItem("id");
  const history = useHistory();
  const [amt, setAmt] = useState(initialState);
  const [user, setUser] = useState(initialState);

  useEffect(() => {
    getAllData();
    loadDate();
  }, []);

  const getAllData = async () => {
    const userRef = await firebaseDb.database().ref(`Accounts/${id}`);
    userRef.on("value", (snapshot) => {
      const user = snapshot.val();
      const userList = [];
      for (let id in user) {
        userList.push({ id, ...user[id] });
      }
      setUser(userList);
    });
  };

  const loadDate = async () => {
    var today = await new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    setAmt({ ...amt, ["date"]: today });
  };

  const handleChange = (e) => {
    setAmt({ ...amt, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let number = 0;
    for (let d in user) {
      number = number + 1;
    }
    const userRef = await firebaseDb
      .database()
      .ref(`Accounts/${id}/${number + 1}`);
    userRef.on("value", async () => {
      await userRef.set(amt);
    });
    alert("Amount added succcessfully");
    // setAmt(initialState)
    history.push(`/profile/${id}`);
  };

  if (auth == id) {
    return (
      <div>
        <Navbar />
        <div className="Add">
          <div className="container addContainer">
            <div className="row addTitle">
              <h1>Add Amount</h1>
            </div>
            <div className="row addInput">
              <div className="col-md-6 addInputs">
                <input
                  placeholder="Ex: 100"
                  name="amount"
                  type="text"
                  className="form-control loginInput"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="col-md-6 addInputs">
                <input
                  placeholder="Ex: Pani Puri"
                  name="reason"
                  className="form-control loginInput"
                  id="exampleInputPassword1"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="row addButton">
              <button onClick={(e) => handleSubmit(e)}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>{history.push("/login")}</div>;
  }
}

export default AddAmount;
