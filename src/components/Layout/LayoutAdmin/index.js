import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Header from "./Header";
import MenuSider from "./MenuSider";
import "./LayoutAdmin.scss";
const { Content, Sider } = Layout;

function LayoutAdmin() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Layout className="layout-admin">
        <Header
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <Layout
          className={
            "layout-admin__main " + (collapsed && "layout-admin__main--fold")
          }
        >
          <Sider 
            breakpoint="md"
            className="layout-admin__sider"
            theme="light"
            collapsed={collapsed}
            width={230}
            onBreakpoint={(e) => setCollapsed(e)}
          >
            <MenuSider />
          </Sider>
          <Content className="layout-admin__content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default LayoutAdmin;