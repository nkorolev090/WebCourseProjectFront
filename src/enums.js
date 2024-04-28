import { Checkbox, Button, Select } from "antd";
import React from "react";

const statuses = [
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
  {
    id: "5",
    name: "Гарантийный ремонт",
  },
];

export const STATUS = (RegistrationUpdate, updateRegistration, record) =>
  statuses.map((status) => (
    <Select.Option key={`${status.id}`} value={`${status.id}`}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          const registration = {
            id: record.id,
            car_id: record.car_id,
            info: record.info,
            status: status.id,
            status_name: status.name,
          };
          RegistrationUpdate(updateRegistration, registration);
        }}
      >
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
    <Select.Option
      key={`${car.id}`}
      value={`${car.id}`}
      label={car.br_mod}
    >
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
      <Checkbox onChange={(e) => toCart(record) && console.log(record, e.target.checked)} />
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
    title: "В корзину",
    key: "out_cart",
    render: (record) => (
      <Checkbox defaultChecked = {true} onChange={(e) => toSlots(record) && console.log(record, e.target.checked)} />
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
  deleteItem
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
      <Select defaultValue={`${record.status}`}>
        {STATUS(RegistrationUpdate, updateRegistration, record)}
      </Select>
    ),
  },
  {
    title: "Автомобиль",
    dataIndex: "car_name",
    key: "car_name",
  },
  {
    title: "Ифнормация",
    dataIndex: "info",
    key: "info",
  },
  {
    title: "Стоимость",
    dataIndex: "reg_price",
    key: "reg_price",
  },
  {
    title: "Удалить запись",
    key: "action",
    render: (record) => {
      console.log("Delete", record.id);
      return (
        <Button type="primary" onClick={() => deleteItem(record.id)}>
          Удалить
        </Button>
      );
    },
  },
];
