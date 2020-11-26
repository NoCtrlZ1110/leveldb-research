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
  Progress,
  Col,
} from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import './App.css';
import socketIOClient from 'socket.io-client';
import { Footer } from 'antd/lib/layout/layout';
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
const autoInsertData = (
  socket: SocketIOClient.Socket,
  amount: number,
  prefix: string
) => {
  socket.emit('autoInsert', amount, prefix);
};

const App = () => {
  const [response, setResponse] = useState('output here!');
  const [count, setCount] = useState(0);
  const [length, setLength] = useState(0);
  const [isConnected, setConnected] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [socket, setSocket] = useState(socketIOClient(ENDPOINT));

  useEffect(() => {
    socket.on('connection', () => {
      setConnected(true);
    });
    socket.on('log', (data: any) => {
      setResponse(JSON.stringify(data));
    });
    socket.on('logCount', (data: number) => {
      setCount(data);
    });
    socket.on('length', (data: number) => {
      setLength(data);
    });
    socket.on('disconnect', () => {
      setConnected(false);
    });
  }, [socket]);

  return (
    <>
      <Header className="header text-white justify-content-between">
        <Row>
          <Col span={16}>
            <>HỆ QUẢN TRỊ CƠ SỞ DỮ LIỆU - DBMS - LEVEL DB</>
          </Col>
          <Col span={8} className="text-center">
            <>
              {isConnected
                ? '[Connected] - ' + ENDPOINT.replace('socket', '')
                : '[Disconnected]'}
            </>
          </Col>
        </Row>
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
              <SubMenu key="sub1" icon={<UserOutlined />} title="Nhóm 17">
                <Menu.Item key="1">Nguyễn Văn Huy</Menu.Item>
                <Menu.Item key="2">Phan Văn Minh</Menu.Item>
                <Menu.Item key="3">Ngô Văn Hào</Menu.Item>
              </SubMenu>
              <SubMenu key="sub1" icon={<LaptopOutlined />} title="MSSV">
                <Menu.Item key="1">18020651</Menu.Item>
                <Menu.Item key="2">18020916</Menu.Item>
                <Menu.Item key="3">18020459</Menu.Item>
              </SubMenu>
              <SubMenu key="sub1" icon={<NotificationOutlined />} title="Lớp">
                <Menu.Item key="1">QH-2018-I/CQ-J</Menu.Item>
                <Menu.Item key="2">QH-2018-I/CQ-J</Menu.Item>
                <Menu.Item key="3">QH-2018-I/CQ-J</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px' }}>
            {Body(response, socket, count, length)}
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        [Nhóm 17] - Nguyễn Văn Huy - Ngô Văn Hào - Phan Văn Minh
      </Footer>
    </>
  );
};

const Body = (
  response: string,
  socket: SocketIOClient.Socket,
  count: number,
  length: number
) => {
  const [prefix, setPrefix] = useState('level#');

  const [amount, setAmount] = useState(1);
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
              defaultValue={1}
              onChange={onChange}
              style={{ minWidth: '300px', marginRight: 20, marginTop: 20 }}
            />

            <Button
              type="primary"
              className="btn-secondary"
              style={{ minWidth: '200px', marginRight: 20, marginTop: 20 }}
              onClick={() => autoInsertData(socket, amount, prefix)}
            >
              Insert
            </Button>
          </Row>
          <Input
            className="mt-2"
            addonBefore="Prefix"
            placeholder="Prefix of key value here"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value as string)}
            style={{ maxWidth: 300 }}
          />
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
          title={
            'Output ' +
            (count !== 0
              ? `[#${count}/${length} ~ ${
                  Math.round((count / length) * 100 * 100) / 100
                }%]`
              : '')
          }
          style={{ minWidth: 600, maxWidth: 600, minHeight: 500, fontSize: 20 }}
        >
          <p>
            {length ? (
              <Progress
                className="mb-4"
                percent={Math.round((count / length) * 100 * 100) / 100}
              />
            ) : (
              ''
            )}
            <code style={{ maxWidth: 100 }}>{response}</code>
          </p>
        </Card>
      </Space>
    </>
  );
};

export default App;
