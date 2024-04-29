import React, { useEffect, useState } from "react";
import {
  notification,
  Typography,
  Tag,
  Button,
  Modal,
  Table,
  Form,
  Select,
} from "antd";
import {
  statuses,
  STATUS,
  CAR,
  REGISTRATION_SLOTS_COLUMNS,
  REGISTRATION_COLUMNS,
} from "../../enums";
import { HighlightOutlined } from "@ant-design/icons";
import RegistrationUpdate from "../RegistrationUpdate/RegistrationUpdate";
import "./Style.css";

const Registration = ({
  registrations,
  setRegistrations,
  removeRegistration,
  updateRegistration,
  user,
}) => {
  const [openRegInfo, setOpenRegInfo] = useState(false);
  const [slots, setSlots] = useState();
  const [selectedRegistration, setselectedRegistration] = useState();
  const [cars, setCars] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      placement: "bottomRight",
    });
  };

  useEffect(() => {
    const getRegistrations = async () => {
      setRegistrations(null);
      try {
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
      } catch (error) {
        console.log("Get registrations error", error);
      }
    };

    getRegistrations();
  }, [setRegistrations]);

  useEffect(() => {
    const getCars = async () => {
      setCars(null);
      try {
        const requestOptions = {
          method: "GET",
        };
        if (user.userRole != undefined) {
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
      } catch (error) {
        console.log("Get cars error", error);
      }
    };
    getCars();
  }, []);

  const getRegistrationInfo = async (reg_id) => {
    setSlots(null);
    setselectedRegistration(null);
    try {
      const requestOptions = {
        method: "GET",
      };
      if (user.userRole != undefined) {
        return await fetch(`api/Registrations/${reg_id}`, requestOptions)
          .then((response) => response.json())
          .then(
            (data) => {
              console.log("Data:", data);
              setSlots(data.slots);
              setselectedRegistration(data.registration);
              console.log(slots);
              setOpenRegInfo(true);
            },
            (error) => {
              console.log(error);
            }
          );
      }
    } catch (error) {
      console.log("Get registration details error", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const requestOptions = {
        method: "DELETE",
      };
      return await fetch(`api/Registrations/${id}`, requestOptions).then(
        (response) => {
          if (response.ok) {
            removeRegistration(id);
          } else {
            {
              contextHolder;
            }
            openNotificationWithIcon("warning", "Запись не удалена", "");
          }
        },
        (error) => console.log(error)
      );
    } catch (error) {
      console.log("Delete error", error);
    }
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <React.Fragment>
      <h3 style={{ color: "GrayText" }}>Список записей</h3>
      {registrations != null && (
        <Table
          dataSource={registrations}
          columns={REGISTRATION_COLUMNS(
            RegistrationUpdate,
            updateRegistration,
            deleteItem,
            getRegistrationInfo,
            user.userRole
          )}
        />
      )}

      <Modal
        title="Информация о записи"
        onCancel={() => setOpenRegInfo(false)}
        open={openRegInfo}
        width="80%"
        okButtonProps={{ disabled: true }}
        cancelButtonProps={{ disabled: true }}
        footer={[
          <Button key="back" onClick={() => setOpenRegInfo(false)}>
            Назад
          </Button>,
        ]}
      >
        {selectedRegistration != null && (
          <>
            <Table
              dataSource={slots}
              columns={REGISTRATION_SLOTS_COLUMNS}
            ></Table>
            <Form>
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
                  onChange={(e) => {
                    var changedReg = selectedRegistration;
                    changedReg.car_id = e;
                    RegistrationUpdate(updateRegistration, changedReg);
                  }}
                  filterOption={filterOption}
                  defaultValue={`${selectedRegistration.car_id}`}
                >
                  {cars != null && CAR(cars)}
                </Select>
              </Form.Item>
              <Form.Item
                label="Статус"
                name="status"
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста выберете статус записи",
                  },
                ]}
              >
                <>
                  {user.userRole == "client" ? (
                    <>
                      <Select
                        style={{
                          minWidth: 200,
                        }}
                        showSearch
                        placeholder="Выберете статус записи"
                        optionFilterProp="children"
                        onChange={(e) => {
                          var changedReg = selectedRegistration;
                          changedReg.status = e;
                          changedReg.status_name = statuses.find(
                            (s) => s.id == e
                          ).name;
                          RegistrationUpdate(updateRegistration, changedReg);
                        }}
                        filterOption={filterOption}
                        defaultValue={`${selectedRegistration.status}`}
                      >
                        {STATUS()}
                      </Select>
                    </>
                  ) : (
                    <Tag
                      color={"cyan-inverse"}
                      key={selectedRegistration.status}
                    >
                      {selectedRegistration.status_name}
                    </Tag>
                  )}
                </>
              </Form.Item>
              <Form.Item label="Информация" name="info">
                <Typography.Paragraph
                  editable={{
                    icon: <HighlightOutlined />,
                    tooltip: "Введите дополнительную информацию",
                    onChange: (e) => {
                      var changedReg = selectedRegistration;
                      changedReg.info = e;
                      RegistrationUpdate(updateRegistration, changedReg);
                    },
                  }}
                >
                  {selectedRegistration.info}
                </Typography.Paragraph>
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
    </React.Fragment>
  );
};
export default Registration;
