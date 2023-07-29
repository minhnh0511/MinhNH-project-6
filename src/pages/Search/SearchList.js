import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { getAllCompany } from "../../services/companyService";
import JobItem from "../Job/JobItem";

function SearchList(props) {
  const { data = [] } = props;
  const [dataFinal, setDataFinal] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const allCompany = await getAllCompany();
      const newData = data.map((item) => {
        const infoCompany = allCompany.find(
          (itemCompany) => itemCompany.id === item.idCompany
        );
        return {
          infoCompany: infoCompany,
          ...item,
        };
      });
      setDataFinal(newData);
    }
    fetchApi();
  }, []);

  return (
    <>
      {dataFinal.length > 0 ? (
        <div className="mt-20">
          <Row gutter={[20, 20]}>
            {dataFinal.map((item) => (
              <Col xs={24} sm={12} lg={8} key={item.id}>
                <JobItem item={item} />
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <div className="mt-20">Không tìm thấy công việc nào.</div>
      )}
    </>
  )
}

export default SearchList;