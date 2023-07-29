import { Link } from "react-router-dom";
import { Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, LogoutOutlined } from "@ant-design/icons";

function Header(props) {
  const { collapsed, setCollapsed } = props;

  return (
    <header className="layout-admin__header">
      <div
        className={
          "layout-admin__logo " + (collapsed && "layout-admin__logo--fold")
        }
      >
        <Link to='admin'>
          IT Admin
        </Link>
      </div>
      <div className="layout-admin__nav">
        <div
          className="layout-admin__icon-collapse display-none"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <div className="layout-admin__account">
          <Link to="/" >
            <Button
              icon={<HomeOutlined className="display-none" />}
            >
              Trang chủ
            </Button>
          </Link>
          <Link to="/logout" className="ml-10">
            <Button icon={<LogoutOutlined className="display-none" />}
            >
              Đăng xuất
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header;