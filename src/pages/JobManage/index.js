import JobList from "./JobList";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function JobsManage() {
  return (
    <>
      <h3>Danh sách việc làm</h3>
      <Link to="/create-job">
        <Button icon={<PlusOutlined />}>Tạo việc mới</Button>
      </Link>
      <JobList className="mt-20" />
    </>
  )
}

export default JobsManage;