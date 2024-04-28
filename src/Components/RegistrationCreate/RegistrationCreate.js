import React, { useEffect, useState } from "react";
import { notification, Form, DatePicker, Select, Space, Table, Button } from "antd";
import { CAR, BREAKDOWN, SLOTS_COLUMNS, CART_COLUMNS } from "../../enums";
import moment from "moment";

const RegistrationCreate = ({ addRegistration, user }) => {
  const [slots, setSlots] = useState([]);
  const [cart_slots, setCartSlots] = useState([]);
  const [breakdowns, setBreakdowns] = useState([]);
  const [cars, setCars] = useState([]);
  const [dateSlot, setDate] = useState(moment().format("DD-MM-YYYY"));
  const [breakdown_id, setBreakdownId] = useState("1");
  const [car_id, setCarId] = useState(null);

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Запись создана',
        placement: 'bottomRight',
    });
  };

  const toCart = (slot) => {
    console.log("toCart", slot.id);

    setSlots(slots.filter(({ id }) => id !== slot.id));

    var slot_breakdown = breakdowns.find(b => b.id == breakdown_id);

    var cart_slot ={
      id: slot.id,
      breakdown_id: breakdown_id,
      breakdown_name: slot_breakdown.title,
      cost: slot_breakdown.price,
      mechanic_id: slot.mechanic_id,
      mechanic_name: slot.mechanic_name,
      start_time: slot.start_time,
      start_date: slot.start_date,
      finish_time: slot.finish_time,
      finish_date: slot.finish_date,
    }

    setCartSlots([...cart_slots, cart_slot]);
  };

  const toSlots = (slot) => {
    setCartSlots(cart_slots.filter(({ id }) => id !== slot.id));
  };

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

  const handleSubmit = () => {
    const car_value = car_id;

    var slots_price = 0;
    cart_slots.forEach(s => {
        slots_price += s.cost;
    })
    const registration = {
      car_id: car_value,
      status: 1,
      reg_date: moment().format("DD-MM-YYYY"),
      reg_price: slots_price,
    };

    const request = {
      registration: registration,
      slots: cart_slots,
    };

    console.log(JSON.stringify(request));

    const createRegistration = async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
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
            openNotificationWithIcon('success');
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
            <Table dataSource={slots} columns={SLOTS_COLUMNS(toCart)} />
          )}
          <h3>Корзина</h3>
          {slots != null && (
            <Table dataSource={cart_slots} columns={CART_COLUMNS(toSlots)} />
          )}
          <Form
          onFinish={handleSubmit}>
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
                filterOption={filterOption}
              >
                {cars != null && CAR(cars)}
              </Select>
            </Form.Item>
            {contextHolder}
            <Button type="primary" htmlType="submit">Создать</Button>
          </Form>
        </Space>
      </>
    </React.Fragment>
  );
};
export default RegistrationCreate;
