import React, { useState, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import {
  BarChartOutlined,
  HomeOutlined,
  DollarOutlined,
  ApartmentOutlined,
  AuditOutlined,
  ClusterOutlined,
  CalendarOutlined,
  IdcardOutlined,
  UserOutlined,
  DownOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Avatar, Dropdown } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const itemsMenu: MenuItem[] = [
  getItem('首页', '/', <HomeOutlined />),
  getItem('权限', '/permission', <ApartmentOutlined />),
  getItem('审批', '/approval', <AuditOutlined />),
  getItem('组织结构', '/organization', <ClusterOutlined />),
  getItem('社保', '/social', <IdcardOutlined />),
  getItem('考勤', '/attendance', <CalendarOutlined />),
  getItem('员工', '/role', <BarChartOutlined />),
  getItem('薪资', '/salary', <DollarOutlined />),
];

const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="#">
            退出
          </a>
        ),
      },
    ]}
  />
);

interface FileType {
  name?: String;
  type?: String;
  lastModified?: Number;
}

const LayoutPage = () => {
  const navigate = useNavigate();

  const fileRef = useRef<HTMLInputElement>(null);

  const [collapsed, setCollapsed] = useState(false);
  const [headerImg, setHeaderImg] = useState('');
  const [name, setName] = useState('admin');

  const addClickImg = (e: any) => {
    const fileObj: any = fileRef.current?.files;
    // let formData = new FormData();
    // formData.append('file', fileObj);
    // formData.append('name', fileObj.name);
    setHeaderImg(e.target.value);
  };

  return (
    <>
      <Layout className={styles.layout}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => {
            console.log(value);
            setCollapsed(value);
          }}
        >
          <div className={styles.logo}>
            <span>HR</span>
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={['/']}
            mode="inline"
            items={itemsMenu}
            onClick={(value) => navigate(value.key)}
          ></Menu>
        </Sider>
        <Layout className={styles.layout_warp}>
          <Header className={styles.layout_warp_header}>
            <Dropdown overlay={menu}>
              <div className={styles.layout_header_name}>
                <span>{name}</span>
                <DownOutlined />
              </div>
            </Dropdown>
            <div className={styles.layout_header_img} onClick={addClickImg}>
              {headerImg === '' ? (
                <Avatar size="large" icon={<UserOutlined />} />
              ) : (
                <img src={headerImg} alt="" />
              )}
              <input type="file" ref={fileRef} onChange={addClickImg} />
            </div>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: '100%', background: '#fff' }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default LayoutPage;
