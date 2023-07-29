import { useState, useEffect } from "react";
import { Card } from "antd";
import * as cookie from "../../helpers/cookie";
import * as job from "../../services/jobsService";

function JobStatistic() {
  const [dataJob, setDataJob] = useState({});
  const idCompany = cookie.getCookie("id");

  useEffect(() => {
    const fetchApi = async () => {
      const response = await job.getListJobs(idCompany);
      if (response) {
        let jobStatistic = {
          statusTrue: 0,
          statusFalse: 0,
          total: response.length
        };
        response.forEach(element => {
          element.status ? jobStatistic.statusTrue++ : jobStatistic.statusFalse++
        });
        setDataJob(jobStatistic);
      }
    }
    fetchApi();
  }, []);

  return (
    <>
      {dataJob && (
        <Card
          title="Công việc"
          className="box-shadow"
        >
          <div>
            Tổng số lượng: <b>{dataJob.total}</b>
          </div>
          <div>
            Đang bật: <b>{dataJob.statusTrue}</b>
          </div>
          <div>
            Đang tắt: <b>{dataJob.statusFalse}</b>
          </div>
          <br />
        </Card>
      )}
    </>
  )
}

export default JobStatistic;