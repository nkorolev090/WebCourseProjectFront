import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Layout as LayoutAntd, Menu, Space } from "antd";
const { Header, Content, Footer } = LayoutAntd;
import Image from "../../backgroundImage.png";

const items = (user) => [
  {
    label: <Link to={"/"}>Главная</Link>,
    key: "1",
  },
  user.userRole == "client" && {
    label: <Link to={"/registrations"}>Записи</Link>,
    key: "2",
  },
  user.userRole == "client" && {
    label: <Link to={"/registration_create"}>Создать запись</Link>,
    key: "3",
  },
  user.userRole == "client" && {
    label: <Link to={"/cart"}>Корзина</Link>,
    key: "4",
  },
  {
    label: <Link to={"/login"}>Вход</Link>,
    key: "5",
  },
  {
    label: <Link to={"/logoff"}>Выход</Link>,
    key: "6",
  },
  {
    label: <Link to={"/reguser"}>Зарегистрироваться</Link>,
    key: "7",
  },
];

const Layout = ({ user }) => {
  return (
    <LayoutAntd>
      <Header style={{ backgroundColor:'white', position: "sticky", top: 0, zIndex: 1, width: "100%" }}>
        <Space
          style={{
            float:'right',
            color:'gray',
          }}
        >
          {user.isAuthenticated ? (
            <h4>
              Пользователь:{" "}
              {user.userDTO != null ? user.userDTO.userName : "Гость"}
            </h4>
          ) : (
            <h4>Пользователь: Гость</h4>
          )}
        </Space>
        <Menu mode="horizontal" theme='light' items={items(user)} className="menu" />
      </Header>
      <Content className="site-layout" style={{ backgroundImage: 'url(' + Image + ')', backgroundSize: 'auto', padding: "0 50px", paddingBottom: "30px" }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: "center" }}>AutoService ©2024</Footer>
    </LayoutAntd>
  );
};
export default Layout;
