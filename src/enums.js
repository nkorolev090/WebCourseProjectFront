import { Tag, Button, Select } from "antd";
import React from "react";

export const statuses = [
  {
    id: "1",
    name: "На обработке",
  },
  {
    id: "2",
    name: "Одобрена",
  },
  {
    id: "3",
    name: "Отклонена ",
  },
  {
    id: "4",
    name: "Завершена",
  },
];

export const STATUS = () =>
  statuses.map((status) => (
    <Select.Option key={`${status.id}`} value={`${status.id}`}>
      <a
        target="_blank"
        rel="noopener noreferrer">
        {status.name}
      </a>
    </Select.Option>
  ));

export const BREAKDOWN = (breakdowns) =>
  breakdowns.map((breakdown) => (
    <Select.Option
      key={`${breakdown.id}`}
      value={`${breakdown.id}`}
      label={breakdown.title}
    >
      {
        <a target="_blank" rel="noopener noreferrer">
          {breakdown.title}
        </a>
      }
    </Select.Option>
  ));

export const CAR = (cars) =>
  cars.map((car) => (
    <Select.Option key={`${car.id}`} value={`${car.id}`} label={car.br_mod}>
      {
        <a target="_blank" rel="noopener noreferrer">
          {car.br_mod}
        </a>
      }
    </Select.Option>
  ));

export const SLOTS_COLUMNS = (toCart) => [
  {
    title: "В корзину",
    key: "to_cart",
    render: (record) => (
      <Button
        onClick={() =>
          toCart(record)
        }
      >В корзину</Button>
    ),
  },
  {
    title: "Дата начала",
    dataIndex: "start_date",
    key: "start_date",
  },
  {
    title: "Время начала",
    key: "start_time",
    dataIndex: "start_time",
  },
  {
    title: "Дата конца",
    dataIndex: "finish_date",
    key: "finish_date",
  },
  {
    title: "Время конца",
    key: "finish_time",
    dataIndex: "finish_time",
  },
  {
    title: "ФИО механика",
    dataIndex: "mechanic_name",
    key: "mechanic_name",
  },
];

export const CART_COLUMNS = (toSlots) => [
  {
    title: "Убрать из корзины",
    key: "out_cart",
    render: (record) => (
      <Button
        onClick={() =>
          toSlots(record)
        }
      >Убрать</Button>
    ),
  },
  {
    title: "Дата начала",
    dataIndex: "start_date",
    key: "start_date",
  },
  {
    title: "Время начала",
    key: "start_time",
    dataIndex: "start_time",
  },
  {
    title: "Дата конца",
    dataIndex: "finish_date",
    key: "finish_date",
  },
  {
    title: "Время конца",
    key: "finish_time",
    dataIndex: "finish_time",
  },
  {
    title: "Вид работ",
    dataIndex: "breakdown_name",
    key: "breakdown_name",
  },
  {
    title: "ФИО механика",
    dataIndex: "mechanic_name",
    key: "mechanic_name",
  },
  {
    title: "Стоимость",
    dataIndex: "cost",
    key: "cost",
  },
];

export const REGISTRATION_COLUMNS = (
  RegistrationUpdate,
  updateRegistration,
  deleteItem,
  openRegInfo,
  user_role
) => [
  {
    title: "Дата создания",
    dataIndex: "reg_date",
    key: "reg_date",
  },
  {
    title: "Статус записи",
    key: "status_name",
    render: (record) => (
      <>
        {user_role == "mechanic" ? (
          <>
            <Select
              defaultValue={`${record.status}`}
              onChange={(e) => {
                var changedReg = record;
                changedReg.status = e;
                changedReg.status_name = statuses.find(s => s.id == e).name;
                RegistrationUpdate(updateRegistration, changedReg);
              }}
            >
              {STATUS()}
            </Select>
          </>
        ) : (
          <Tag color={"cyan-inverse"} key={record.status}>
            {record.status_name}
          </Tag>
        )}
      </>
    ),
  },
  {
    title: "Автомобиль",
    dataIndex: "car_name",
    key: "car_name",
  },
  {
    title: "Информация",
    dataIndex: "info",
    key: "info",
  },
  {
    title: "Стоимость",
    dataIndex: "reg_price",
    key: "reg_price",
  },
  {
    title: "Отменить запись",
    key: "action",
    render: (record) => {
      console.log("Delete", record.id);
      return (
        <Button type="default" onClick={() => deleteItem(record.id)}>
          Отменить
        </Button>
      );
    },
  },
  {
    title: "Детали",
    key: "action_details",
    render: (record) => {
      console.log("action_details", record.id);
      return (
        <Button type="primary" onClick={() => openRegInfo(record.id)}>
          Детальная информация
        </Button>
      );
    },
  },
];

export const BREAKDOWN_COLUMNS = () => [
  {
    title: "Название",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Информация",
    key: "info",
    dataIndex: "info",
  },
  {
    title: "Стоимость",
    key: "price",
    render: (record) => {
      return <div> {record.price + " ₽"} </div>;
    },
  },
  {
    title: "Гарантия (мес.)",
    dataIndex: "warranty",
    key: "warranty",
  },
];

export const REGISTRATION_SLOTS_COLUMNS = [
  {
    title: "Дата начала",
    dataIndex: "start_date",
    key: "start_date",
  },
  {
    title: "Время начала",
    key: "start_time",
    dataIndex: "start_time",
  },
  {
    title: "Дата конца",
    dataIndex: "finish_date",
    key: "finish_date",
  },
  {
    title: "Время конца",
    key: "finish_time",
    dataIndex: "finish_time",
  },
  {
    title: "Вид работ",
    dataIndex: "breakdown_name",
    key: "breakdown_name",
  },
  {
    title: "ФИО механика",
    dataIndex: "mechanic_name",
    key: "mechanic_name",
  },
  {
    title: "Стоимость",
    key: "cost",
    render: (record) => {
      return <div> {record.cost + " ₽"} </div>;
    },
  },
];
