import React, { useEffect, useState } from "react";
import { Form, DatePicker, Select, Space, Table } from "antd";
import { CAR, BREAKDOWN, SLOTS_COLUMNS } from "../../enums";
import moment from "moment";

const RegistrationCreate = ({ addRegistration, user }) => {
  const [slots, setSlots] = useState([]);
  const [breakdowns, setBreakdowns] = useState([]);
  const [cars, setCars] = useState([]);
  const [dateSlot, setDate] = useState(moment().format("DD-MM-YYYY"));
  const [breakdown_id, setBreakdownId] = useState("1");
  const [car_id, setCarId] = useState(null);

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
  
  useEffect(() => {
    const getCars = async () => {
      setCars(null);
      const requestOptions = {
        method: "GET",
      };
      if (
        user.userRole != undefined &&
        dateSlot != null &&
        breakdown_id != null
      ) {
        return await fetch(`api/Cars`, requestOptions)
          .then((response) => response.json())
          .then(
            (data) => {
              console.log("Data:", data);
              setCars(data);
            },
            (error) => {
              console.log(error);
            }
          );
      }
    };
    getCars();
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();

    const car_value = car_id;
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
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

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

          <Form onSubmit={handleSubmit}>
            <Form.Item
              label="Автомобиль"
              name="car"
              rules={[
                { required: true, message: "Пожалуйста выберете автомобиль" },
              ]}
            >
              <Select
              style={{
                minWidth: 200,
              }}
              showSearch
              placeholder="Выберете автомобиль"
              optionFilterProp="children"
              onChange={(e) => setCarId(e)}
              filterOption={filterOption}>
                { cars != null && CAR(cars)}
              </Select>
            </Form.Item>
            {/*<input
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
            <button type="submit">Создать</button> */}
          </Form>
        </Space>
      </>
    </React.Fragment>
  );
};
export default RegistrationCreate;
