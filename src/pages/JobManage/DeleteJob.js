import { Button, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import * as job from "../../services/jobsService";

function DeleteJob(props) {
  const { record, onReload } = props;

  const handleDelete = async () => {
    const response = await job.deleteJob(record.id);
    if (response) {
      onReload();
    }
  };

  return (
    <>
      <Tooltip title="Xóa bản ghi">
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa không?"
          onConfirm={handleDelete}
        >
          <Button
            className="ml-5"
            danger
            ghost
            icon={<DeleteOutlined />}
          >
          </Button>
        </Popconfirm>
      </Tooltip>
    </>
  )
}

export default DeleteJob;