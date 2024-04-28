import React, { useEffect, useState } from "react";
import { Typography, Flex, Image, Table, Space, Row, Col } from "antd";
import { BREAKDOWN_COLUMNS } from "../../enums";

const Main = () => {
  const [breakdowns, setBreakdowns] = useState([]);

  useEffect(() => {
    const getBreakdowns = async () => {
      setBreakdowns(null);
      const requestOptions = {
        method: "GET",
      };

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
    };
    getBreakdowns();
  }, []);

  return (
    <React.Fragment>
      <>
        <Space direction="vertical">
          <Flex
            style={{ marginBottom: "10px", width: "100%" }}
            justify="center"
          >
            <Typography.Title justify="center" level={3}>
              Главная страница
            </Typography.Title>
          </Flex>
          <>
            <Row style={{ marginBottom: "10px", width: "100%" }} gutter={20}>
              <Col span={12}>
                <Typography.Paragraph>
                  Ваша машина неисправна? Обращайтесь к нам! Мы — команда
                  профессионалов, которая поможет вам в решении любой проблемы с
                  автомобилем. У нас есть всё необходимое оборудование для
                  проведения диагностики и ремонта любой сложности. Наш
                  приоритет — качество работы и удовлетворённость клиента. Мы
                  предоставляем гарантию на многие виды услуг. Записывайтесь
                  прямо сейчас!
                </Typography.Paragraph>
              </Col>
              <Col span={12}>
                <Image src="https://findesk.ru/upload/iblock/d7a/d7a6bb0c7f9f7427c93076f597538764.jpg" />
              </Col>
            </Row>
          </>

          <Flex
            style={{ marginBottom: "10px", width: "100%" }}
            justify="center"
          >
            <Typography.Title justify="center" level={5}>
              Перечень услуг
            </Typography.Title>
          </Flex>
          <Table
            dataSource={breakdowns}
            columns={BREAKDOWN_COLUMNS(breakdowns)}
          />
        </Space>
      </>
    </React.Fragment>
  );
};
export default Main;
