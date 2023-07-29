import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table, Tag, Tooltip } from "antd";
import { getCookie } from "../../helpers/cookie";
import * as job from "../../services/jobsService";
import { EyeOutlined } from "@ant-design/icons";
import EditJob from "./EditJob";
import DeleteJob from "./DeleteJob";

function JobList(props) {
  const idCompany = getCookie("id");
  const { className = "" } = props;
  const [listJobs, setListJobs] = useState([]);

  const fetchApi = async () => {
    const response = await job.getListJobs(idCompany);
    if (response) {
      setListJobs(response.reverse());
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleReload = () => {
    fetchApi();
  };

  const columns = [
    {
      title: "Tên công việc",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (_, record) =>
        (record.tags || []).map((item, index) => (
          <Tag className="mb-5" color="blue" key={index}>
            {item}
          </Tag>
        ))
    },
    {
      title: "Mức lương ($)",
      dataIndex: "salary",
      key: "salary"
    },
    {
      title: "Thời gian",
      key: "time",
      render: (_, record) => (
        <>
          <small>Ngày tạo: {record.createAt}</small>
          <br />
          <small>Cập nhật: {record.updateAt}</small>
        </>
      )
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <>
          {record.status ? (
            <Tag color="green">Đang bật</Tag>
          ) : (
            <Tag color="red">Đang tắt</Tag>
          )}
        </>
      )
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <>
          <Link to={`/job-detail/${record.id}`}>
            <Tooltip title="Xem chi tiết">
              <Button icon={<EyeOutlined />}></Button>
            </Tooltip>
          </Link>
          <EditJob
            record={record}
            onReload={handleReload}
          />
          <DeleteJob
            record={record}
            onReload={handleReload}
          />
        </>
      )
    }
  ]

  return (
    <>
      <div className={className}>
        <Table
          dataSource={listJobs}
          columns={columns}
          rowKey="id"
        >
        </Table>
      </div>
    </>
  )
}

export default JobList;