import React, { useEffect, useState } from "react";
import {
  notification,
  Form,
  DatePicker,
  Select,
  Space,
  Table,
  Button,
} from "antd";
import { CAR, BREAKDOWN, SLOTS_COLUMNS, CART_COLUMNS } from "../../enums";
import moment from "moment";

const RegistrationCreate = ({ addRegistration, user }) => {
  const [slots, setSlots] = useState([]); //для хранения слотов
  const [cart_slots, setCartSlots] = useState([]); //для хранения слотов в корзинне
  const [breakdowns, setBreakdowns] = useState([]);//для хранения услуг
  const [cars, setCars] = useState([]);//для хранения автомобилей
  const [dateSlot, setDate] = useState(moment().format("DD-MM-YYYY"));//для хранения выбранной даты
  const [breakdown_id, setBreakdownId] = useState("1");//для хранения выбранной услуги
  const [car_id, setCarId] = useState(null);//для хранения выбранного авто

  const [api, contextHolder] = notification.useNotification();//для хранения состояния уведомления

  const removeSlot= (removeId) =>
    setSlots(slots.filter(({ id }) => id !== removeId));

  const openNotificationWithIcon = (type, message) => {//показ уведомления
    api[type]({
      message: message,
      placement: "bottomRight",
    });
  };

  const toCart = async (slot) => {//перемещения слота в корзину
    try {
      const requestOptions = {
        method: "PUT",
        headers: { "Authorization": "Bearer "+localStorage.getItem("jwt_token")}
      };
      return await fetch(`/api/Cart/AddCartItem?slotId=${slot.id}&breakdownId=${breakdown_id}`, requestOptions).then(
        (response) => {
          if (response.ok) {
            removeSlot(slot.id)
          } else {
            {
              contextHolder;
            }
            openNotificationWithIcon("warning", "Услуга не добавлена", "");
          }
        },
        (error) => console.log(error)
      );
    } catch (error) {
      console.log("Put error", error);
    }
    // console.log("toCart", slot.id);

    // setSlots(slots.filter(({ id }) => id !== slot.id));

    // var slot_breakdown = breakdowns.find((b) => b.id == breakdown_id);

    // var cart_slot = {
    //   id: slot.id,
    //   breakdown_id: breakdown_id,
    //   breakdown_name: slot_breakdown.title,
    //   cost: slot_breakdown.price,
    //   mechanic_id: slot.mechanic_id,
    //   mechanic_name: slot.mechanic_name,
    //   start_time: slot.start_time,
    //   start_date: slot.start_date,
    //   finish_time: slot.finish_time,
    //   finish_date: slot.finish_date,
    // };

    // setCartSlots([...cart_slots, cart_slot]);
  };

  const toSlots = (slot) => {//перемещения слота из корзины
    if (slot.breakdown_id == breakdown_id) {
      var _slot = {
        id: slot.id,
        mechanic_id: slot.mechanic_id,
        mechanic_name: slot.mechanic_name,
        start_time: slot.start_time,
        start_date: slot.start_date,
        finish_time: slot.finish_time,
        finish_date: slot.finish_date,
      };
      setSlots([...slots, _slot]);
    }
    setCartSlots(cart_slots.filter(({ id }) => id !== slot.id));
  };

  useEffect(() => {//получение слотов
    const getSlots = async () => {
      setSlots(null);
      try {
        const requestOptions = {
          method: "GET",
          headers: { "Authorization": "Bearer "+ localStorage.getItem("jwt_token")}
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
      } catch (error) {
        console.log("Get slots error", error);
      }
    };
    getSlots();
  }, [dateSlot, breakdown_id]);

  useEffect(() => {//получение услуг
    const getBreakdowns = async () => {
      setBreakdowns(null);
      try {
        const requestOptions = {
          method: "GET",
        };
        if (
          user.userRole != undefined &&
          dateSlot != null &&
          breakdown_id != null
        ) {
          return await fetch(`api/Breakdowns/everything`, requestOptions)
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
      } catch (error) {
        console.log("Get breakdowns error", error);
      }
    };
    getBreakdowns();
  }, []);

  useEffect(() => {//получение автомобилей
    const getCars = async () => {
      setCars(null);
      try {
        const requestOptions = {
          method: "GET",
          headers: { "Authorization": "Bearer "+ localStorage.getItem("jwt_token")}
        };
        if (
          user.userRole != undefined &&
          dateSlot != null &&
          breakdown_id != null
        ) {
          return await fetch(`api/Cars/GetCars`, requestOptions)
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
      } catch (error) {
        console.log("Get cars error", error);
      }
    };
    getCars();
  }, []);

  const handleSubmit = () => {//создание записи
    try {
      if (cart_slots.length > 0) {
        const car_value = car_id;

        var slots_price = 0;
        cart_slots.forEach((s) => {
          slots_price += s.cost;
        });
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
            headers: { "Authorization": "Bearer "+ localStorage.getItem("jwt_token"), "Content-Type": "application/json" },
            body: JSON.stringify(request),
          };
          const response = await fetch(
            "api/Registrations/PostRegistration",

            requestOptions
          );

          return await response.json().then(
            (data) => {
              console.log(data);
              if (response.ok) {
                addRegistration(data);
                openNotificationWithIcon("success", "Запись создана");
                setCartSlots(null);
              }
            },
            (error) => console.log(error)
          );
        };

        createRegistration();
      }
      else{
        console.log("Registration dont create!")
        openNotificationWithIcon("warning", "Запись не создана");
      }
    } catch (error) {
      console.log("Create registration error");
    }
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <React.Fragment>
      <>
        <h3 style={{ color: "GrayText" }}>Создание новой записи</h3>
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
          <h3 style={{ color: "GrayText" }}>Корзина</h3>
          {slots != null && (
            <Table dataSource={cart_slots} columns={CART_COLUMNS(toSlots)} />
          )}
          <Form onFinish={handleSubmit}>
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
            <Button type="primary" htmlType="submit">
              Создать
            </Button>
          </Form>
        </Space>
      </>
    </React.Fragment>
  );
};
export default RegistrationCreate;
