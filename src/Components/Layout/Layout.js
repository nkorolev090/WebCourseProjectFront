import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Layout as LayoutAntd, Menu } from "antd";
const { Header, Content, Footer } = LayoutAntd;

const items = [
  {
    label: <Link to={"/"}>Главная</Link>,
    key: "1",
  },
  {
    label: <Link to={"/registrations"}>Записи</Link>,
    key: "2",
  },
  {
    label: <Link to={"/login"}>Вход</Link>,
    key: "3",
  },
  {
    label: <Link to={"/logoff"}>Выход</Link>,
    key: "4",
  },
  {
    label: <Link to={"/reguser"}>Зарегистрироваться</Link>,
    key: "5",
  },
];

const Layout = ({ user }) => {
  return (
    <LayoutAntd>
      <Header style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}>
        <div
          style={{
            float: "right",
            color: "rgba(255, 255, 255, 0.65)",
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
        </div>
        <Menu theme="dark" mode="horizontal" items={items} className="menu" />
      </Header>
      <Content className="site-layout" style={{ padding: "0 50px" }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: "center" }}>AutoService ©2024</Footer>
    </LayoutAntd>
  );
};
export default Layout;
