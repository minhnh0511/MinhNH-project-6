import { useState, useEffect } from "react";
import { Card } from "antd";
import * as cookie from "../../helpers/cookie";
import * as cv from "../../services/cvService";

function CVStatistic() {
  const idCompany = cookie.getCookie("id");
  const [dataCV, setDataCV] = useState({});

  useEffect(() => {
    const fetchApi = async () => {
      const response = await cv.getListCV(idCompany);
      if (response) {
        let cvStatistic = {
          statusTrue: 0,
          statusFalse: 0,
          total: response.length
        }
        response.forEach(element => {
          element.statusRead ? cvStatistic.statusTrue++ : cvStatistic.statusFalse++;
        });
        setDataCV(cvStatistic);
      }
    }
    fetchApi();
  }, []);

  return (
    <>
      {dataCV && (
        <Card
          title="CV"
          className="box-shadow"
        >
          <div>
            Tổng số lượng: <b>{dataCV.total}</b>
          </div>
          <div>
            Đã đọc: <b>{dataCV.statusTrue}</b>
          </div>
          <div>
            Chưa đọc: <b>{dataCV.statusFalse}</b>
          </div>
          <br />
        </Card>
      )}
    </>
  )
}

export default CVStatistic;