import { useState, useEffect } from "react";
import {
  Col,
  Row,
  Card,
  Button,
  Input,
  InputNumber,
  Form,
  message
} from "antd";
import * as cookie from "../../helpers/cookie";
import * as company from "../../services/companyService";


function InfoCompany() {
  const id = cookie.getCookie("id");

  const rules = [
    {
      required: true,
      message: "Bắt buộc!",
    },
  ];
  const [form] = Form.useForm();
  const [mess, contextHolder] = message.useMessage();

  const [dataCompany, setDataCompany] = useState();
  const [isEditable, setIsEditable] = useState(false);

  const fetchApi = async () => {
    const response = await company.getDetailCompany(id);
    if (response) {
      setDataCompany(response);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleEdit = () => {
    setIsEditable(true);
  }

  const handleCancel = () => {
    setIsEditable(false);
    form.resetFields();
  }

  const handleFinish = async (values) => {
    const response = await company.editCompany(id, values);
    if(response) {
      mess.success("Cập nhật thành công.");
      fetchApi();
      setIsEditable(false);
    }
  }

  return (
    <>
      {contextHolder}

      {dataCompany && (
        <Card
          title="Thông tin công ty"
          extra={
            !isEditable ? (
              <Button onClick={handleEdit}>Chỉnh sửa</Button>
            ) : (
              <Button onClick={handleCancel}>Hủy</Button>
            )
          }
        >
          <Form
            layout="vertical"
            onFinish={handleFinish}
            initialValues={dataCompany}
            form={form}
            disabled={!isEditable}
          >
            <Row gutter={20}>

              <Col span={24}>
                <Form.Item
                  label="Tên công ty"
                  name="companyName"
                  rules={rules}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={rules}
                >
                  <Input type="email" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={rules}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={rules}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="Thời gian làm việc"
                  name="workingTime"
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="Link website"
                  name="website"
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="Số lượng nhân sự"
                  name="quantityPeople"
                >
                  <InputNumber />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Mô tả ngắn"
                  name="description"
                >
                  <Input.TextArea rows={4} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Chi tiết"
                  name="detail"
                >
                  <Input.TextArea rows={8} />
                </Form.Item>
              </Col>

              {isEditable && (
                <Col span={24}>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                    >Cập nhật
                    </Button>
                    <Button
                      onClick={handleCancel}
                      className="ml-10"
                    >Hủy
                    </Button>
                  </Form.Item>
                </Col>
              )}

            </Row>
          </Form>
        </Card>
      )}
    </>
  )
}

export default InfoCompany;