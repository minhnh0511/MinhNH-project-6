import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'antd';
import { UserOutlined, LogoutOutlined, LoginOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { getCookie } from '../../../../helpers/cookie';
import '../../css/base.css';
import './Header.scss';

function Header() {
  const token = getCookie("token");

  return (
    <>
      <header className="layout-default__header">
        <div className='container container__header'>
          <div className='layout-default__wrap'>
            <div className='layout-default__logo'>
              <Link to='/'>IT Jobs</Link>
            </div>
            <Row
              gutter={{ sm: 20, xs: 5 }}
              className='layout-default__account'
            >
              {token ? (
                <>
                  <Col sm={12} >
                    <Link to='admin'>
                      <Button 
                        type="primary"
                        icon={<UserOutlined className='display-none' />}
                      >
                        Quản lí
                      </Button>
                    </Link>
                  </Col>
                  <Col sm={12} >
                    <Link to='logout'>
                      <Button icon={<LogoutOutlined className='display-none' />}>
                        Đăng xuất
                      </Button>
                    </Link>
                  </Col>
                </>
              ) : (
                <>
                  <Col sm={12} >
                    <Link to='login'>
                      <Button
                        type="primary"
                        icon={<LoginOutlined className='display-none' />}
                      >
                        Đăng nhập
                      </Button>
                    </Link>
                  </Col>
                  <Col sm={12} >
                    <Link to='register'>
                      <Button icon={<ArrowUpOutlined className='display-none' />}>
                        Đăng kí
                      </Button>
                    </Link>
                  </Col>
                </>
              )}
            </Row>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;