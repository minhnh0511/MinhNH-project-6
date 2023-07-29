import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "antd";
import { getDetailCompany } from "../../services/companyService";
import { getListJobs } from "../../services/jobsService";
import GoBack from "../../components/GoBack";
import JobItem from "../Job/JobItem";

function CompanyDetail() {
  const params = useParams();
  const [infoCompany, setInfoCompany] = useState();
  const [dataJobs, setDataJobs] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getDetailCompany(params.id);
      if(response) {
        setInfoCompany(response);
      }
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListJobs(params.id);
      if(response) {
        setDataJobs(response);
      }
    };
    fetchApi();
  }, []);

  return(
    <>
      <GoBack />

      {infoCompany && (
        <>
          <h1>{infoCompany.companyName}</h1>

          <div className="mb-20">
            Địa chỉ: <b>{infoCompany.address}</b>
          </div>

          <div className="mb-20">
            Số lượng nhân sự: <b>{infoCompany.quantityPeople}</b>
          </div>
          
          <div className="mb-20">
            Thời gian làm việc: <b>{infoCompany.workingTime}</b>
          </div>
          
          <div className="mb-20">
            Website: <b>{infoCompany.website}</b>
          </div>

          <div className="mb-10"><u>Mô tả:</u> </div>
          <div className="mb-20"><i>{infoCompany.description}</i></div>

          <div className="mb-10"><u>Chi tiết:</u> </div>
          <div className="mb-20"><i>{infoCompany.detail}</i></div>

          <div className="mb-10"><u>Danh sách vị trí ứng tuyển:</u></div>
          <div className="mb-20">
          <Row gutter={[20, 20]}>
              {dataJobs.map(item => (
                <Col xs={24} sm={12} lg={8} key={item.id}>
                  <JobItem item={item} />
                </Col>
              ))}
            </Row>
          </div>
        </>
      )}
    </>
  )
}

export default CompanyDetail;