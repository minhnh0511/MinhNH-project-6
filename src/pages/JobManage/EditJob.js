import { useState, useEffect } from "react";
import {
  Modal,
  Col,
  Row,
  Form,
  Tooltip,
  message,
  Button,
  Input,
  Select,
  Switch
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { getTimeCurrent } from "../../helpers/getTime";
import * as job from "../../services/jobsService";
import * as tags from "../../services/tagsService";
import * as city from "../../services/cityService";

function EditJob(props) {
  const { record, onReload } = props;

  const [mess, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const rules = [
    {
      required: true,
      message: "Bắt buộc!",
    },
  ];

  const [isOpened, setIsOpened] = useState(false);
  const [listTags, setListTags] = useState();
  const [listCities, setListCities] = useState();

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
        setListCities(response);
      }
    };
    fetchApi();
  }, []);

  const handleFinish = async (values) => {
    values.updateAt = getTimeCurrent();
    const response = await job.updateJob(record.id, values);
    if (response) {
      setIsOpened(false);
      onReload();
      mess.success("Cập nhật thành công.");
    } else {
      mess.error("Hệ thống đang lỗi, vui lòng thử lại sau.");
    }
  };

  return (
    <>
      {contextHolder}

      <Tooltip title="Chỉnh sửa">
        <Button
          icon={<EditOutlined />}
          type="primary"
          ghost
          className="ml-5"
          onClick={() => setIsOpened(true)}
        >
        </Button>
      </Tooltip>

      <Modal
        title="Chỉnh sửa"
        open={isOpened}
        width="65%"
        footer={null}
        onCancel={() => {
          form.resetFields();
          setIsOpened(false)
        }}
      >
        <Form
          layout="vertical"
          initialValues={record}
          onFinish={handleFinish}
          form={form}
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

            <Col xs={24} sm={18}>
              <Form.Item
                label="Tags"
                name="tags"
                rules={rules}
              >
                <Select mode="multiple" options={listTags} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={6}>
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
                <Input.TextArea rows={12} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Trạng thái"
                name="status"
                valuePropName="checked"
              >
                <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  Cập nhật
                </Button>
              </Form.Item>
            </Col>

          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default EditJob;