import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as cookie from "../../helpers/cookie";
import * as cv from "../../services/cvService";
import { Button, Table, Tag, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import CVJobName from "./CVJobName";
import DeleteCV from "./DeleteCV";

function CVList() {
  const idCompany = cookie.getCookie("id");

  const [listCV, setListCV] = useState();

  const fetchApi = async () => {
    const response = await cv.getListCV(idCompany);
    if(response) {
      setListCV(response.reverse());
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleReload = () => {
    fetchApi();
  }

  const columns = [
    {
      title: "Vị trí ứng tuyển",
      dataIndex: "idJob",
      key: "idJob",
      render: (_, record) => (
        <CVJobName record={record}/>
      )
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ngày gửi",
      key: "time",
      render: (_, record) => (
        <>{record.createAt}</>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "statusRead",
      key: "statusRead",
      render: (_, record) => (
        <>
          {record.statusRead ? (
            <Tag color="green">Đã đọc</Tag>
          ) : (
            <Tag color="gray">Chưa đọc</Tag>
          )}
        </>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <>
          <Link to={`/cv-detail/${record.id}`}>
            <Tooltip title="Xem chi tiết">
              <Button icon={<EyeOutlined />}></Button>
            </Tooltip>
          </Link>
          <DeleteCV record={record} onReload={handleReload} />
        </>
      ),
    }
  ]

  return(
    <>
      <div className="mt-20">
        <Table 
          dataSource={listCV}
          columns={columns}
        />
      </div>
    </>
  )
}

export default CVList;