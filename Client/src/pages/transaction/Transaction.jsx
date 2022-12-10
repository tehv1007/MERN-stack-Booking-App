/* eslint-disable eqeqeq */
import React from "react";
import { Table, CardTitle } from "reactstrap";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import MiniHeader from "../../components/miniHeader/MiniHeader";
import MailList from "../../components/mailList/MailList";
import "./transaction.css";
import "../home/home.css";
import useFetch from "../../hooks/useFetch";

const formatDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("en-GB");
};

const Transaction = () => {
  const dataUser = JSON.parse(window.localStorage.getItem("user"));
  console.log(dataUser._id);
  const { data } = useFetch(
    `http://localhost:5000/api/transactions/${dataUser._id}`
  );

  console.log(data);
  return (
    <div>
      <Navbar />
      <MiniHeader />
      <div className="container">
        <div className="section_content">
          <div className="wrapper">
            <CardTitle className="h4 mb-4">Your Transaction</CardTitle>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Hotel</th>
                  <th>Room</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data != undefined
                  ? data.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.hotelName}</td>
                          <td>
                            {item.room.map((item) => {
                              return <span> {item} </span>;
                            })}
                          </td>
                          <td>
                            {formatDate(item.dateStart)} -{" "}
                            {formatDate(item.dateEnd)}
                          </td>
                          <td>{item.price}</td>
                          <td>{item.payment}</td>
                          <td>{item.status}</td>
                        </tr>
                      );
                    })
                  : ""}
              </tbody>
            </Table>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Transaction;
