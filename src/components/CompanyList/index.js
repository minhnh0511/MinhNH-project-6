import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Button } from "antd";
import { getListCompany } from "../../services/companyService";

function CompanyList() {
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
      <h2>Danh sách một số công ty</h2>
      <Row gutter={[20, 10]}>
        {dataCompany.map((item) => (
          <Col lg={8} sm={12} xs={24} key={item.id} >
            <Link to={`company/${item.id}`}>
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
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      <Link to='company'>
        <Button className="mt-20">Chi tiết công ty</Button>
      </Link>
    </>
  )
}

export default CompanyList;