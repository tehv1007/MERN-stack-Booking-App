import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";

const Reserve = ({ setOpen, hotelId, hotelName }) => {
  const navigate = useNavigate();
  const userData = JSON.parse(window.localStorage.getItem("user"));
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data } = useFetch(`http://localhost:5000/api/hotels/room/${hotelId}`);
  // console.log(data);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // Tính toán thời gian đặt phòng
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const dayDifference = (date1, date2) => {
    const timeDiff = Math.abs(Date.parse(date2) - Date.parse(date1));
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  };

  const days = dayDifference(dates[0].endDate, dates[0].startDate);
  // console.log(days);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());
    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    console.log(value, checked);

    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  // console.log(selectedRooms);

  let roomPriceSelected = [];
  let roomNumbers = [];

  const [inputs, setInputs] = useState({});
  for (let i = 0; i < selectedRooms.length; i++) {
    let temp = data.find((item) =>
      item.roomNumbers.some((roomNumber) =>
        selectedRooms[i].includes(roomNumber._id) ? true : false
      )
    );
    roomPriceSelected.push(temp.price);
    roomNumbers.push(
      temp.roomNumbers.find((roomNumber) => roomNumber._id === selectedRooms[i])
        .number
    );
  }

  // console.log(roomPriceSelected);
  // console.log(roomNumbers);

  const totalPrice =
    days *
    roomPriceSelected.reduce((accumulator, obj) => {
      return accumulator + obj;
    }, 0);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.post("http://localhost:5000/api/transactions", {
        ...inputs,
        user_id: userData._id,
        username: userData.username,
        hotel_id: hotelId,
        hotelName: hotelName,
        room: roomNumbers,
        dateStart: dates[0].startDate,
        dateEnd: dates[0].endDate,
        price: totalPrice,
        payment: e.target.payment.value,
        status: "Booked",
      });

      console.log(res.data);
      setInputs(res.data);
      alert("Transaction has been created successfully!");
      navigate("/transactions");
    } catch (err) {
      console.log(err);
    }

    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `http://localhost:5000/api/rooms/availability/${roomId}`,
            {
              dates: alldates,
            }
          );
          return res.data;
        })
      );
      setOpen(false);
      navigate("/transactions");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleClick}>
      <div className="reserve">
        <div className="rContainer">
          {/* Date + reserve info */}
          <div className="date-container">
            <div className="date-range">
              <h3 className="h4 mb-3 mt-3">Dates</h3>
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                minDate={new Date()}
              />
            </div>
            <div className="reserve-form">
              <h3 className="h4 mb-3 mt-3">Reserve Info</h3>
              <div className="form-inputs">
                <p>Your Full Name</p>
                <input
                  type="text"
                  name="fullname"
                  placeholder="Fullname"
                  defaultValue={userData.fullName}
                />
              </div>
              <div className="form-inputs">
                <p>Your Email</p>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  defaultValue={userData.email}
                />
              </div>
              <div className="form-inputs">
                <p>Your Phone Number</p>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  defaultValue={userData.phoneNumber}
                />
              </div>
              <div className="form-inputs">
                <p>Your Identity Card Number</p>
                <input type="text" name="identity" placeholder="Card Number" />
              </div>
            </div>
          </div>

          {/* Select rooms */}
          <div className="room-container">
            <h3 className="h4 mb-3 mt-3">Select Rooms</h3>
            <div className="room-list">
              {data.map((item) => (
                <div className="rItem" key={item._id}>
                  <div className="rItemInfo">
                    <div className="rTitle">{item.title}</div>
                    <div className="rDesc">{item.desc}</div>
                    <div className="rMax">
                      Max people: <b>{item.maxPeople}</b>
                    </div>
                    <div className="rPrice">{item.price}</div>
                  </div>
                  <div className="rSelectRooms">
                    {item.roomNumbers.map((roomNumber, i) => (
                      <div className="room" key={i}>
                        <label>{roomNumber.number}</label>
                        <input
                          type="checkbox"
                          value={roomNumber._id}
                          onChange={handleSelect}
                          disabled={!isAvailable(roomNumber)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="payment-container">
            <h4 className="bill">
              Total Bill: ${totalPrice} ({days} night)
            </h4>
            <div className="reserve-now">
              <div className="payment">
                <select className="form-select" defaultValue="" name="payment">
                  <option value="Payment">Select Payment Method</option>
                  <option value="cash">Cash</option>
                  <option value="credit">Credit Card</option>
                </select>
              </div>
              <div className="btn" xs={3}>
                <button type="submit" color="primary" className=" rButton">
                  Reserve Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Reserve;
