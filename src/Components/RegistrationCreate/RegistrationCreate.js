import React, { useEffect, useState } from "react";
import { DatePicker, Select, Table } from "antd";
import  { SLOTS_COLUMNS}  from "../../enums";
import moment from "moment";

const RegistrationCreate = ({ addRegistration, slots, setSlots, user }) => {

  const [dateSlot, setDate] = useState(moment().format("DD-MM-YYYY"));
  const [breakdown_id, setBreakdownId] = useState("1");

  useEffect(() => {
  const getRegistrations = async () => {
    setSlots(null);
    const requestOptions = {
      method: "GET",
    };
    if (user.userRole != undefined && dateSlot != null && breakdown_id != null) {
      return await fetch(`api/Slots/byDateBreakdown?date=${dateSlot}&breakdown_id=${breakdown_id}`, requestOptions)
        .then((response) => response.json())
        .then(
          (data) => {
            console.log("Data:", data);
            setSlots(data);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
  getRegistrations();
}, [dateSlot, breakdown_id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const car_value = e.target.elements.car_id.value;
    const status_value = e.target.elements.status.value;
    const info_value = e.target.elements.info.value;

    const registration = {
      car_id: car_value,
      info: info_value,
      status: status_value,
    };

    console.log(JSON.stringify(registration));

    const createRegistration = async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registration),
      };
      const response = await fetch(
        "api/Registrations/",

        requestOptions
      );

      return await response.json().then(
        (data) => {
          console.log(data);
          if (response.ok) {
            addRegistration(data);
          }
        },
        (error) => console.log(error)
      );
    };

    createRegistration();
  };

  // const onDateChange = async (date, dateString) => {
  //   await setDate(dateString)
  //   console.log("Date", dateSlot)
  //   dateSlot !=undefined && breakdown_id != undefined && getSlots()
  // };

  // const onBreakdownChange = async(breakdownId) =>{
  //   await setBreakdownId(breakdownId)
  //   console.log("Breakdown", breakdown_id)
  //   dateSlot !=undefined && breakdown_id != undefined && getSlots()
  // }

  return (
    <React.Fragment>
      <>
        <h3>Создание новой записи</h3>
        <Select
          defaultValue = "1"
          onChange={e => setBreakdownId(e)}
        >
          <Select.Option key = "1" value = "1"/>
          <Select.Option key = "2" value = "2"/>
        </Select>
        <DatePicker onChange={(date, dateString) => dateString != "" ? setDate(dateString) : setDate(moment().format("DD-MM-YYYY"))} />
        {slots != null && <Table dataSource={slots} columns= {SLOTS_COLUMNS()} />}

        <form onSubmit={handleSubmit}>
          <label>Id автомобиля: </label>
          <input
            type="number"
            name="car_id"
            placeholder="Введите Id автомобиля:"
          />
          <label>Id статуса: </label>
          <input
            type="number"
            name="status"
            placeholder="Введите Id статуса:"
          />
          <label>Информация: </label>
          <input type="text" name="info" placeholder="Введите информацию:" />
          <button type="submit">Создать</button>
        </form>
      </>
    </React.Fragment>
  );
};
export default RegistrationCreate;
