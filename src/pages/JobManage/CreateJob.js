import { useState, useEffect } from "react";
import {
  Form,
  message,
  Row,
  Col,
  Input,
  Select,
  Switch,
  Button
} from "antd";
import {getTimeCurrent} from "../../helpers/getTime";
import * as cookie from "../../helpers/cookie";
import * as job from "../../services/jobsService";
import * as city from "../../services/cityService";
import * as tags from "../../services/tagsService";
import GoBack from "../../components/GoBack";

function CreateJob() {
  const rules = [
    {
      required: true,
      message: "Bắt buộc!",
    },
  ];

  const [form] = Form.useForm();
  const [mess, contextHolder] = message.useMessage();

  const idCompany = cookie.getCookie("id");
  const [listCities, getListCities] = useState();
  const [listTags, setListTags] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await tags.getListTag();
      if (response) {
        setListTags(response);
      }
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await city.getListCity();
      if (response) {
        getListCities(response);
      }
    };
    fetchApi();
  }, []);

  const handleFinish = async (values) => {
    values.idCompany = idCompany;
    values.createAt = getTimeCurrent();
    const response = await job.createJob(values);
    if(response) {
      form.resetFields();
      mess.open({
        type: "success",
        content: "Tạo công việc mới thành công.",
        duration: 5,
      });
    } else {
      mess.open({
        type: "error",
        content: "Tạo job mới không thành công!",
        duration: 3,
      });
    }
  };

  return (
    <>
      {contextHolder}
      <GoBack />
      <h3>Tạo công việc mới</h3>
      <Form 
        layout="vertical"
        form={form}
        onFinish={handleFinish}
      >
        <Row gutter={[20, 10]}>
          <Col span={24}>
            <Form.Item
              label="Tên công việc"
              name="name"
              rules={rules}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={16}>
            <Form.Item
              label="Tags"
              name="tags"
              rules={rules}
            >
              <Select mode="multiple" options={listTags} />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Mức lương"
              name="salary"
              rules={rules}
            >
              <Input addonAfter={"$"} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Thành phố"
              name="city"
              rules={rules}
            >
              <Select mode="multiple" options={listCities} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Mô tả"
              name="description"
            >
              <Input.TextArea rows={12}/>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Trạng thái"
              name="status"
            >
              <Switch unCheckedChildren="Tăt" checkedChildren="Bật"/>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
            >
              <Button 
                type="primary"
                htmlType="submit"
              >
                Tạo mới
              </Button>
            </Form.Item>
          </Col>

        </Row>
      </Form>
    </>
  )
}

export default CreateJob;