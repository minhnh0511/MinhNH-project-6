import { Row, Col } from "antd";
import JobStatistic from "./JobStatistic";
import CVStatistic from "./CVStatistic";
import InfoCompany from "./InfoCompany";

function Dashboard() {
  return (
    <>
      <h3>Tổng quan</h3>
      
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={12} lg={8}>
          <JobStatistic />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <CVStatistic />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <InfoCompany />
        </Col>
      </Row>
    </>
  )
}

export default Dashboard;