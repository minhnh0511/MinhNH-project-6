import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Tag,
  Form,
  notification,
  Select,
} from "antd";
import { getDetailJob } from "../../services/jobsService";
import { getDetailCompany } from "../../services/companyService";
import { createCV } from "../../services/cvService";
import GoBack from "../../components/GoBack";
import { getTimeCurrent } from "../../helpers/getTime";
const { TextArea } = Input;
const { Option } = Select;


function JobDetail() {
  const params = useParams();
  const [detailJob, setDetailJob] = useState();
  const [companyName, setCompanyName] = useState();
  const [form] = Form.useForm();
  const [noti, contextHolder] = notification.useNotification();

  const rules = [
    {
      required: true,
      message: "Bắt buộc!",
    },
  ];


  useEffect(() => {
    const fetchApi = async () => {
      const response = await getDetailJob(params.id);
      const infoCompany = await getDetailCompany(response.idCompany);
      const infoCompanyName = infoCompany.companyName;
      const dataFinal = {
        ...response,
        infoCompany: infoCompany,
      };
      setDetailJob(dataFinal);
      setCompanyName(infoCompanyName);
    };
    fetchApi();
  }, []);

  const handleFinish = async (values) => {
    values.idJob = detailJob.id;
    values.idCompany = detailJob.infoCompany.id;
    values.createAt = getTimeCurrent();
    values.statusRead = false;
    const response = await createCV(values);
    if(response) {
      form.resetFields();
      noti.success({
        message: `Gửi yêu cầu thành công!`,
        description:
          "Nhà tuyển dụng sẽ liên hệ với bạn trong thời gian sớm nhất.",
      });
    } else {
      noti.error({
        message: `Gửi yêu cầu không thành công!`,
        description: "Hệ thống đang gặp lỗi, vui lòng gửi lại yêu cầu.",
      });
    }
  };

  return (
    <>
      {contextHolder}

      <GoBack />
      {detailJob && (
        <>
          <h1>{detailJob.name}</h1>

          <Button
            href="#formApply"
            type="primary"
            size="large"
            className="mb-20"
          >
            ỨNG TUYỂN NGAY
          </Button>

          <div className="mb-20">
            <span>Kỹ năng: </span>
            {(detailJob.tags || []).map((item, index) => (
              <Tag color="blue" key={index}>{item}</Tag>
            ))}
          </div>

          <div className="mb-20">
            <span>Thành phố: </span>
            {(detailJob.city || []).map((item, index) => (
              <Tag color="orange" key={index}>{item}</Tag>
            ))}
          </div>

          <div className="mb-20">
            Mức lương: <b>{detailJob.salary}$</b>
          </div>

          <div className="mb-20">
            Công ty: <b>{companyName}</b>
          </div>

          <div className="mb-20">
            Địa chỉ công ty: <b>{detailJob.infoCompany.address}</b>
          </div>

          <div className="mb-20">
            Thời gian đăng bài: <b>{detailJob.createAt}</b>
          </div>

          <div className="mb-20">
            <div className="mb-10"><u>Mô tả công việc:</u></div>
            <div><i>{detailJob.description}</i></div>
          </div>

          <div className="mb-20">
            <div className="mb-10"><u>Giới thiệu công ty:</u></div>
            <div><i>{detailJob.infoCompany.description}</i></div>
          </div>

          <Card
            title="Ứng tuyển ngay"
            size="large"
            headStyle={{ fontSize: "20px" }}
            id="formApply"
            className="box-shadow"
          >
            <Form
              name="form-apply"
              layout="vertical"
              form={form}
              onFinish={handleFinish}
            >
              <Row gutter={20}>
                <Col xs={24} sm={12} md={6}>
                  <Form.Item
                    label="Họ tên"
                    name="name"
                    rules={rules}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={6}>
                  <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={rules}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={6}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={rules}
                  >
                    <Input type="email"/>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={6}>
                  <Form.Item
                    label="Thành phố"
                    name="city"
                    rules={rules}
                  >
                    <Select>
                      {detailJob.city.map((item, index) => (
                        <Option value={item} label={item} key={index}></Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Giới thiệu bản thân"
                    name="description"
                    rules={rules}
                  >
                    <Input.TextArea rows={6}></Input.TextArea>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Danh sách link project đã làm"
                    name="linkProject"
                    rules={rules}
                  >
                    <TextArea rows={6} />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      GỬI YÊU CẦU
                    </Button>
                  </Form.Item>
                </Col>
                
              </Row>
            </Form>
          </Card>
        </>
      )}
    </>
  )
}

export default JobDetail;