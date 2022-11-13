import React, { useState, useRef, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import {
  HomeOutlined,
  ApartmentOutlined,
  AuditOutlined,
  ClusterOutlined,
  CalendarOutlined,
  IdcardOutlined,
  UserOutlined,
  DownOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu, Avatar, Dropdown } from 'antd'
import axios from '../../api/index'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

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
  } as MenuItem
}

const itemsMenu: MenuItem[] = [
  getItem('首页', '/', <HomeOutlined />),
  getItem('表格', '/table', <ApartmentOutlined />),
  getItem('图表', '/chart', <AuditOutlined />),
  getItem('动画', '/animation', <ClusterOutlined />),
  getItem('轮播图', '/carousel', <IdcardOutlined />),
  getItem('富文本', '/richText', <CalendarOutlined />),
]

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
)

const LayoutPage = () => {
  const navigate = useNavigate()

  const fileRef = useRef<HTMLInputElement>(null)

  const [collapsed, setCollapsed] = useState(false)
  const [headerImg, setHeaderImg] = useState('')
  const [name, setName] = useState('admin')

  const onUpdate = async () => {
    // 需要修改头像
    fileRef.current!.click()
  }

  const handelChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      // 获取选择的文件
      const file = e.target.files![0]
      // 需要上传这张图片
      // const fd = new FormData()
      // fd.append('image', file)
      // 发送请求
      const { data } = await axios.patch('/user', {
        image: file.name,
      })
      console.log(data)
      setHeaderImg(data.image)
    } catch (err) {
    } finally {
    }
  }

  useEffect(() => {
    const init = async () => {
      const { data } = await axios.get('/layout')
      console.log(data, 9)
    }

    init()
  }, [])

  return (
    <>
      <Layout className={styles.layout}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => {
            console.log(value)
            setCollapsed(value)
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
            <div className={styles.layout_header_img} onClick={onUpdate}>
              {headerImg === '' ? (
                <Avatar size="large" icon={<UserOutlined />} />
              ) : (
                <img src={headerImg} alt="" />
              )}
              <input type="file" ref={fileRef} onChange={handelChange} hidden />
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
  )
}

export default LayoutPage
