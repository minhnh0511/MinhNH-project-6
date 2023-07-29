import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "antd";
import { getListCompany } from "../../services/companyService";

function Company() {
  const [dataCompany, setDataCompany] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListCompany();
      if (response) {
        setDataCompany(response);
      }
    };
    fetchApi();
  }, []);

  return (
    <>
      <h2>Danh sách công ty</h2>
      <Row gutter={[20, 10]}>
        {dataCompany.map((item) => (
          <Col lg={8} sm={12} xs={24} key={item.id} >
            <Link to={`${item.id}`}>
              <Card
                title={`${item.companyName}`}
                className="box-shadow"
                hoverable={true}
                headStyle={{ color: "#4096FF" }}
              >
                Số nhân sự: <b>{item.quantityPeople}</b>
                <br />
                Địa chỉ: <b>{item.address}</b>
                <br />
                Giờ làm việc: <b>{item.workingTime}</b>
                <br />
                Số điện thoại: <b>{item.phone}</b>
                <br />
                Website: <b>{item.website}</b>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}
export default Company;