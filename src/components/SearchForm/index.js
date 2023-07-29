import { Input, Select, Button, Form, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getListCity } from "../../services/cityService";

function SearchForm() {
  const navigate = useNavigate();
  const [dataCity, setDataCity] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListCity();
      if (response) {
        const allCity = {
          key: 0,
          value: "All"
        };
        setDataCity([allCity, ...response]);
      }
    };
    fetchApi();
  }, []);

  const handleFinish = (values) => {
    let city = values.city || "";
    city = values.city === "All" ? "" : city;
    navigate(
      `/search?city=${city}&keyword=${values.keyword || ""}`
    );
  };

  return (
    <>
      <h1>1000+ IT Jobs For Developers</h1>
      {dataCity && (
        <Form onFinish={handleFinish}>
          <Row gutter={[12, 12]}>
            <Col xxl={14} xl={14} lg={14}>
              <Form.Item name="keyword">
                <Input placeholder="Nhập từ khóa..." />
              </Form.Item>
            </Col>
            <Col xxl={6} xl={6} lg={6}>
              <Form.Item name="city">
                <Select options={dataCity} placeholder="Chọn thành phố"></Select>
              </Form.Item>
            </Col>
            <Col xxl={4} xl={4} lg={4}>
              <Form.Item >
                <Button
                  type="primary" icon={<SearchOutlined className="display-none"/>}
                  htmlType="submit" 
                  block
                >
                  Tìm kiếm
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )
      }
    </>
  )
}

export default SearchForm;