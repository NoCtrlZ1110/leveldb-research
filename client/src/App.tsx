import React, { useState } from 'react';
import {
  Layout,
  Menu,
  Breadcrumb,
  Button,
  Row,
  InputNumber,
  Space,
} from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import './App.css';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    <Layout>
      <Header className="header text-white">
        HỆ QUẢN TRỊ CƠ SỞ DỮ LIỆU - DBMS - LEVEL DB
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>UET</Breadcrumb.Item>
          <Breadcrumb.Item>VNU</Breadcrumb.Item>
          <Breadcrumb.Item>Nhóm 17</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          className="site-layout-background"
          style={{ padding: '24px 0' }}
        >
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                icon={<NotificationOutlined />}
                title="subnav 3"
              >
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px' }}>{Body()}</Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        [Nhóm 17] - Nguyễn Văn Huy - Ngô Văn Hào - Phan Văn Minh
      </Footer>
    </Layout>
  );
}

const Body = () => {
  const [amount, setAmount] = useState();

  const onChange = (value: any) => {
    setAmount(value);
  };

  return (
    <>
      <b>Nhập số lượng bản ghi muốn lưu vào database</b>
      <Space></Space>
      <Row>
        <InputNumber
          value={amount}
          min={1}
          max={100000000}
          defaultValue={0}
          onChange={onChange}
          style={{ minWidth: '300px', marginRight: 20, marginTop: 20 }}
        />
        <Button
          type="primary"
          danger
          style={{ minWidth: '200px', marginRight: 20, marginTop: 20 }}
        >
          Import
        </Button>
      </Row>
    </>
  );
};

export default App;
