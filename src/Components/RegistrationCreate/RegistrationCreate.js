import React, { useEffect, useState } from "react";
import { DatePicker, Select, Space, Table } from "antd";
import { BREAKDOWN, SLOTS_COLUMNS } from "../../enums";
import moment from "moment";

const RegistrationCreate = ({ addRegistration, user }) => {
  const [slots, setSlots] = useState([]);
  const [breakdowns, setBreakdowns] = useState([]);
  const [dateSlot, setDate] = useState(moment().format("DD-MM-YYYY"));
  const [breakdown_id, setBreakdownId] = useState("1");

  useEffect(() => {
    const getSlots = async () => {
      setSlots(null);
      const requestOptions = {
        method: "GET",
      };
      if (
        user.userRole != undefined &&
        dateSlot != null &&
        breakdown_id != null
      ) {
        return await fetch(
          `api/Slots/byDateBreakdown?date=${dateSlot}&breakdown_id=${breakdown_id}`,
          requestOptions
        )
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
    };
    getSlots();
  }, [dateSlot, breakdown_id]);

  useEffect(() => {
    const getBreakdowns = async () => {
      setBreakdowns(null);
      const requestOptions = {
        method: "GET",
      };
      if (
        user.userRole != undefined &&
        dateSlot != null &&
        breakdown_id != null
      ) {
        return await fetch(`api/Breakdowns`, requestOptions)
          .then((response) => response.json())
          .then(
            (data) => {
              console.log("Data:", data);
              setBreakdowns(data);
            },
            (error) => {
              console.log(error);
            }
          );
      }
    };
    getBreakdowns();
  }, []);

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

  const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <React.Fragment>
      <>
        <h3>Создание новой записи</h3>
        <Space
          direction="vertical"
          size="middle"
          style={{
            display: "flex",
          }}
        >
          <Space>
            <Select
              style={{
                minWidth: 200,
              }}
              showSearch
              placeholder="Выберете вид работ"
              optionFilterProp="children"
              onChange={(e) => setBreakdownId(e)}
              filterOption={filterOption}
            >
              {breakdowns != null && BREAKDOWN(breakdowns)}
            </Select>
            <DatePicker
              placeholder="Выберете дату"
              onChange={(date, dateString) =>
                dateString != ""
                  ? setDate(dateString)
                  : setDate(moment().format("DD-MM-YYYY"))
              }
            />
          </Space>
          {slots != null && (
            <Table dataSource={slots} columns={SLOTS_COLUMNS()} />
          )}

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
        </Space>
      </>
    </React.Fragment>
  );
};
export default RegistrationCreate;
