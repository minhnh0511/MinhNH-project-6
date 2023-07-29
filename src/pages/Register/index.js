import * as company from "../../services/companyService";
import { useNavigate } from "react-router-dom";
import { generateToken } from "../../helpers/generateToken";
import { Button, Card, Col, Form, Input, Row, message } from 'antd';

function Register() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const rules = [
    {
      required: true,
      message: "Bắt buộc!",
    },
  ];

  const onFinish = async (values) => {
    const password = values.password;
    const checkingPassword = values.checkingPassword;

    if (password === checkingPassword) {
      const companyName = values.companyName;
      const phone = values.phone;
      const email = values.email;
      const token = generateToken();

      const options = {
        companyName: companyName,
        phone: phone,
        email: email,
        password: password,
        token: token
      };

      const checkExistEmail = company.checkExist("email", email);
      const checkExistPhone = await company.checkExist("phone", phone);
      if (checkExistEmail.length > 0) {
        messageApi.warning("Email đã tồn tại.");
      }
      else if (checkExistPhone.length > 0) {
        messageApi.warning("Số điện thoại đã tồn tại.");
      } else {
        const result = await company.createCompany(options);
        if (result) {
          messageApi.success("Đăng kí thành công.");
          navigate("/login");
        }
      }

    } else {
      messageApi.error("Nhập sai mật khẩu.");
    }

  };

  return (
    <>
      {contextHolder}

      <Row justify="center">
        <Col xs={18} lg={12}>
          <Card title="Đăng kí tài khoản" className="box-shadow">
            <Form onFinish={onFinish} layout="vertical">

              <Form.Item
                label='Tên công ty'
                name='companyName'
                rules={rules}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Số điện thoại'
                name='phone'
                rules={rules}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Email'
                name='email'
                rules={rules}
              >
                <Input type="email" />
              </Form.Item>

              <Form.Item
                label='Mật khẩu'
                name='password'
                rules={rules}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label='Nhập lại mật khẩu'
                name='checkingPassword'
                rules={rules}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Đăng kí
                </Button>
              </Form.Item>

            </Form>
          </Card>
        </Col>
      </Row>
    </>
  )
}
export default Register;