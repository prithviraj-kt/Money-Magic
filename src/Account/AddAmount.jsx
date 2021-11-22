import React, { useState, useEffect, forwardRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import firebaseDb from "../firebase";

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
    // loadTime();
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

  const loadTime = async () => {
    const d = await new Date();
    const time = `${d.getHours()} : ${d.getMinutes()}`;
    var dd = String(d.getDate()).padStart(2, "0");
    var mm = String(d.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = d.getFullYear();
    const date = dd + "/" + mm + "/" + yyyy;
    setAmt({ ...amt, ["date"]: date });
    setAmt({ ...amt, ["time"]: time });
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
    history.push(`/display/${id}`);
  };

  if (auth == id) {
    return (
      <div className=" container addamount">
        <div className="row">
          <h1>Add Amount</h1>
        </div>
        <form className="loginForm">
          <div className="mb-3">{(e) => handleChange(e)}</div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              <h4>Amount</h4>
            </label>
            <input
              name="amount"
              type="text"
              className="form-control loginInput"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-3 loginPassword">
            <label htmlFor="exampleInputPassword1" className="form-label">
              <h5>Reason</h5>
            </label>
            <input
              name="reason"
              className="form-control loginInput"
              id="exampleInputPassword1"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button onClick={(e) => handleSubmit(e)} className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  } else {
    return <div>{history.push("/login")}</div>;
  }
}

export default AddAmount;
