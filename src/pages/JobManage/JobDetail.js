import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tag } from "antd";
import * as job from "../../services/jobsService";
import GoBack from "../../components/GoBack";

function JobDetailAdmin() {
  const params = useParams();
  const [dataJob, setDataJob] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await job.getDetailJob(params.id);
      if (response) {
        setDataJob(response);
      }
    };
    fetchApi();
  }, []);

  return (
    <>
      <GoBack />
      {dataJob && (
        <>
          <h3>Tên công việc: {dataJob.name}</h3>

          <div className="mb-20">
            Tags: {(dataJob.tags || []).map((item, index) => (
              <Tag
                color="blue"
                key={index}
              >
                {item}
              </Tag>
            ))}
          </div>

          <div className="mb-20">
            Thành phố: {(dataJob.city || []).map((item, index) => (
              <Tag
                color="orange"
                key={index}
              >
                {item}
              </Tag>
            ))}
          </div>

          <div className="mb-20">
            Mức lương: <b>{dataJob.salary}$</b>
          </div>

          <div className="mb-20">
            Ngày tạo: <b>{dataJob.createAt}</b>
          </div>

          <div className="mb-20">
            Cập nhật: <b>{dataJob.updateAt}</b>
          </div>

          <div className="mb-20">
            Trạng thái: {dataJob.status ? (
              <Tag color="green">Đang bật</Tag>
            ) : (
              <Tag color="red">Đang tắt</Tag>
            )}
          </div>

          <div className="mb-20">
            <div className="mb-10">
              <u>Mô tả:</u>
            </div> 
            <i>{dataJob.description}</i>
          </div>

          </>
      )}
    </>
  )
}

export default JobDetailAdmin;