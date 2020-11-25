import React, { useEffect, useState } from 'react';
import {
  Layout,
  Menu,
  Breadcrumb,
  Button,
  Row,
  InputNumber,
  Space,
  Card,
  Input,
} from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import './App.css';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://localhost:3005/socket';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const getDataByKey = (socket: SocketIOClient.Socket, key: string) => {
  socket.emit('getData', key);
};
const insertDataByKey = (
  socket: SocketIOClient.Socket,
  key: string,
  data: string
) => {
  socket.emit('putData', key, data);
};
const deleteDataByKey = (socket: SocketIOClient.Socket, key: string) => {
  socket.emit('delData', key);
};
const App = () => {
  const [response, setResponse] = useState('output here!');
  const [socket, setSocket] = useState(socketIOClient(ENDPOINT));

  useEffect(() => {
    socket.on('log', (data: any) => {
      setResponse(data);
    });
  }, [socket]);

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
          <Content style={{ padding: '0 24px' }}>
            {Body(response, socket)}
          </Content>
        </Layout>
      </Content>
      {/* <Footer style={{ textAlign: 'center' }}>
        [Nhóm 17] - Nguyễn Văn Huy - Ngô Văn Hào - Phan Văn Minh
      </Footer> */}
    </Layout>
  );
};

const Body = (response: string, socket: SocketIOClient.Socket) => {
  const [amount, setAmount] = useState();
  const [keyGet, setKeyGet] = useState('');
  const [keyPut, setKeyPut] = useState('');
  const [putData, setputData] = useState('');
  const [keyDel, setKeyDel] = useState('');

  const onChange = (value: any) => {
    setAmount(value);
  };

  return (
    <>
      <Space direction="vertical" style={{ marginLeft: 100 }}>
        <Card title="Tự động">
          <b>Nhập số lượng bản ghi muốn lưu vào database</b>

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
              className="btn-secondary"
              style={{ minWidth: '200px', marginRight: 20, marginTop: 20 }}
            >
              Insert
            </Button>
          </Row>
        </Card>
        <Space />
        <Card title="Thủ công">
          <Space direction="vertical">
            <Card title="Get data by key">
              <Space align="center">
                <Input
                  addonBefore="Key"
                  placeholder='"name","age"'
                  value={keyGet}
                  onChange={(e) => setKeyGet(e.target.value as string)}
                  style={{ minWidth: 270 }}
                />
                <Button
                  type="primary"
                  className="btn-success"
                  style={{ minWidth: '200px', marginLeft: 20 }}
                  onClick={() => {
                    getDataByKey(socket, keyGet);
                  }}
                >
                  Get
                </Button>
              </Space>
            </Card>
            <Card title="Insert data by key">
              <Space direction="vertical">
                <Space align="center">
                  <Input
                    addonBefore="Key"
                    placeholder='"name","age"'
                    onChange={(e) => setKeyPut(e.target.value as string)}
                    style={{ minWidth: 270 }}
                  />
                  <Button
                    type="primary"
                    className="btn-success"
                    style={{ minWidth: '200px', marginLeft: 20 }}
                    onClick={() => {
                      insertDataByKey(socket, keyPut, putData);
                    }}
                  >
                    Insert
                  </Button>
                </Space>

                <Input
                  addonBefore="Data"
                  placeholder="Nguyễn Văn Huy"
                  style={{ minWidth: 270 }}
                  onChange={(e) => setputData(e.target.value as string)}
                />
              </Space>
            </Card>
            <Card title="Delete data by key">
              <Space align="center">
                <Input
                  addonBefore="Key"
                  placeholder='"name","age"'
                  style={{ minWidth: 270 }}
                  onChange={(e) => setKeyDel(e.target.value as string)}
                />
                <Button
                  type="primary"
                  danger
                  style={{ minWidth: '200px', marginLeft: 20 }}
                  onClick={() => {
                    deleteDataByKey(socket, keyDel);
                  }}
                >
                  Delete
                </Button>
              </Space>
            </Card>
          </Space>
        </Card>
      </Space>
      <Space direction="vertical" style={{ marginLeft: 100 }}>
        <Card
          title="Output"
          style={{ minWidth: 600, minHeight: 500, fontSize: 20 }}
        >
          <code>{response}</code>
        </Card>
      </Space>
    </>
  );
};

export default App;
