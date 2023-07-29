import { useState, useEffect } from "react";
import { Card } from "antd";
import * as cookie from "../../helpers/cookie";
import * as company from "../../services/companyService";

function InfoCompany() {
  const id = cookie.getCookie("id");
  const [infoCompany, setInfoCompany] = useState({});

  useEffect(() => {
    const fetchApi = async () => {
      const response = await company.getDetailCompany(id);
      if (response) {
        setInfoCompany(response);
      }
    };
    fetchApi();
  }, []);

  return (
    <>
      {infoCompany && (
        <Card
          title="Thông tin công ty"
          className="box-shadow"
        >
          <div>
            Tên công ty: <b>{infoCompany.companyName}</b>
          </div>
          <div>
            Email: <b>{infoCompany.email}</b>
          </div>
          <div>
            Số điện thoại: <b>{infoCompany.phone}</b>
          </div>
          <div>
            Số nhân viên: <b>{infoCompany.quantityPeople}</b>
          </div>
        </Card>
      )}
    </>
  )
}

export default InfoCompany;