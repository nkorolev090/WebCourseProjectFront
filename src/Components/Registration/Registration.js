import React, { useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Space, Dropdown, Button, Table } from "antd";
import { STATUS } from "../../enums";
import RegistrationUpdate from "../RegistrationUpdate/RegistrationUpdate";
import "./Style.css";

const Registration = ({
  registrations,
  setRegistrations,
  removeRegistration,
  updateRegistration,
  user,
}) => {
  const columns = [
    {
      title: "Дата создания",
      dataIndex: "reg_date",
      key: "reg_date",
    },
    {
      title: "Статус записи",
      key: "status_name",
      render: (record) => (
        <Dropdown
          menu={{ items: STATUS(RegistrationUpdate, updateRegistration, record), selectable: true, defaultSelectedKeys: `${record.status}` }}
        >
          <a>
            <Space>
              {record.status_name}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
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

  useEffect(() => {
    const getRegistrations = async () => {
      setRegistrations(null);
      const requestOptions = {
        method: "GET",
      };
      if (user.userRole != undefined) {
        return await fetch(`api/Registrations`, requestOptions)
          .then((response) => response.json())
          .then(
            (data) => {
              console.log("Data:", data);
              setRegistrations(data);
            },
            (error) => {
              console.log(error);
            }
          );
      }
    };

    getRegistrations();
  }, [setRegistrations]);

  const deleteItem = async (id) => {
    const requestOptions = {
      method: "DELETE",
    };
    return await fetch(`api/Registrations/${id}`, requestOptions).then(
      (response) => {
        if (response.ok) {
          removeRegistration(id);
        }
      },
      (error) => console.log(error)
    );
  };

  return (
    <React.Fragment>
      <h3>Список записей</h3>
      {registrations != null && (
        <Table dataSource={registrations} columns={columns} />
      )}
    </React.Fragment>
  );
};
export default Registration;
