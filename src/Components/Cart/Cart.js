import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Table, 
  Tag, 
  Space, 
  Button, 
  Divider, 
  Typography, 
  Alert, 
  Spin, 
  Empty,
  Modal,
  message 
} from 'antd';
import { 
  ShoppingCartOutlined, 
  ClockCircleOutlined, 
  ToolOutlined, 
  UserOutlined, 
  CheckOutlined,
  WarningOutlined,
  DeleteOutlined 
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { confirm } = Modal;


const Cart = () => {
  const [cartData, setCartData] = useState({
    id: 0,
    total: 0,
    subtotal: 0,
    promocode_id: 0,
    promocode_title: '',
    discount_value: 0,
    available_cart_items: [],
    unavailable_cart_items: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removingId, setRemovingId] = useState(null);

  const fetchCartData = async () => {
    try {
      setLoading(true);
      const requestOptions = {
            method: "GET",
            headers: { "Authorization": "Bearer "+ localStorage.getItem("jwt_token")}
          };
        const response = await fetch('/api/Cart/GetCart', requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCartData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);
  const handleRemoveItem = (breakdownId) => {
    confirm({
      title: 'Remove this item from cart?',
      icon: <DeleteOutlined style={{ color: '#ff4d4f' }} />,
      content: 'Are you sure you want to remove this service from your cart?',
      okText: 'Remove',
      okType: 'danger',
      cancelText: 'Cancel',
      async onOk() {
        try {
          setRemovingId(breakdownId);
          const requestOptions = {
            method: "PUT",
            headers: { "Authorization": "Bearer "+ localStorage.getItem("jwt_token")}
          };
          const response = await fetch(`api/Cart/RemoveCartItem?breakdownId=${breakdownId}`, requestOptions);

          if (!response.ok) {
            throw new Error('Failed to remove item');
          }

          message.success('Item removed successfully');
          await fetchCartData(); // Refresh cart data
        } catch (err) {
          message.error(err.message);
        } finally {
          setRemovingId(null);
        }
      }
    });
  };


  const formatDateTime = (date, time) => {
    return `${date} ${time}`;
  };

  const availableColumns = [
    {
      title: 'Service Details',
      dataIndex: ['slot', 'breakdown_name'],
      key: 'service',
      render: (text, record) => (
        <Space direction="vertical">
          <Text strong>
            <ToolOutlined /> {text}
          </Text>
          {record.slot.breakdown_warranty > 0 && (
            <Tag color="green">Warranty: {record.slot.breakdown_warranty} months</Tag>
          )}
          {record.slot.breakdown_url && (
            <Button 
              type="link" 
              href={record.slot.breakdown_url} 
              target="_blank"
              icon={<CheckOutlined />}
            >
              Service details
            </Button>
          )}
        </Space>
      ),
    },
    {
      title: 'Mechanic',
      dataIndex: ['slot', 'mechanic_name'],
      key: 'mechanic',
      render: (text) => (
        <Tag icon={<UserOutlined />} color="blue">
          {text}
        </Tag>
      ),
    },
    {
      title: 'Time Slot',
      key: 'time',
      render: (_, record) => (
        <Space direction="vertical">
          <Text>
            <ClockCircleOutlined /> Start: {formatDateTime(record.slot.start_date, record.slot.start_time)}
          </Text>
          <Text>
            <ClockCircleOutlined /> End: {formatDateTime(record.slot.finish_date, record.slot.finish_time)}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Cost',
      dataIndex: ['slot', 'cost'],
      key: 'cost',
      render: (text) => `$${text.toFixed(2)}`,
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />}
            loading={removingId === record.slot.breakdown_id}
            onClick={() => handleRemoveItem(record.slot.breakdown_id)}
          >
            Remove
          </Button>
        ),
      },
  ];

  const unavailableColumns = [
    ...availableColumns.slice(0, -1), // Все кроме последней колонки (Action)
    {
      title: 'Status',
      key: 'status',
      render: () => (
        <Tag icon={<WarningOutlined />} color="error">
          Unavailable
        </Tag>
      ),
    },
  ];

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
      <Spin size="large" tip="Loading your cart..." />
    </div>
  );

  if (error) return (
    <Alert
      message="Error"
      description={`Failed to load cart: ${error}`}
      type="error"
      showIcon
      style={{ margin: '20px' }}
    />
  );

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2} style={{ marginBottom: '24px' }}>
        <ShoppingCartOutlined /> Your Cart
      </Title>

      <Card title="Order Summary" style={{ marginBottom: '24px' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text>Subtotal:</Text>
            <Text strong>${cartData.subtotal.toFixed(2)}</Text>
          </div>
          
          {cartData.discount_value > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text>Discount ({cartData.promocode_title}):</Text>
              <Text strong type="success">-${cartData.discount_value.toFixed(2)}</Text>
            </div>
          )}
          
          <Divider style={{ margin: '12px 0' }} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text strong>Total:</Text>
            <Title level={4} style={{ margin: 0 }}>${cartData.total.toFixed(2)}</Title>
          </div>
        </Space>
      </Card>

      {cartData.available_cart_items.length > 0 && (
        <>
          <Title level={4} style={{ marginBottom: '16px' }}>Available Services</Title>
          <Table
            columns={availableColumns}
            dataSource={cartData.available_cart_items}
            rowKey="id"
            pagination={false}
            bordered
          />
        </>
      )}

      {cartData.unavailable_cart_items.length > 0 && (
        <>
          <Title level={4} style={{ margin: '24px 0 16px 0' }}>Unavailable Services</Title>
          <Alert
            message="These services are no longer available"
            type="warning"
            showIcon
            style={{ marginBottom: '16px' }}
          />
          <Table
            columns={unavailableColumns}
            dataSource={cartData.unavailable_cart_items}
            rowKey="id"
            pagination={false}
            bordered
          />
        </>
      )}

      {cartData.available_cart_items.length === 0 && 
       cartData.unavailable_cart_items.length === 0 && (
        <Card>
          <Empty
            description="Your cart is empty"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </Card>
      )}

      {cartData.available_cart_items.length > 0 && (
        <div style={{ marginTop: '24px', textAlign: 'right' }}>
          <Button type="primary" size="large">
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;