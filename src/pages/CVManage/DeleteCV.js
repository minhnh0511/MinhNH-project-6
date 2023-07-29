import { Button, Popconfirm, Tooltip, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteCV } from "../../services/cvService";

function DeleteCV(props) {
  const [mess, contextHolder] = message.useMessage();
  const { record, onReload } = props;
  const handleDelete = async () => {
    const response = await deleteCV(record.id);
    if (response) {
      onReload();
      mess.success("Đã xóa thành công.");
    } else {
      mess.error("Hệ thống đang gặp lỗi, vui lòng thử lại sau.")
    }
  };

  return(
    <>
      {contextHolder}

      <Tooltip title="Xóa bản ghi">
        <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={handleDelete}>
          <Button
            className="ml-5"
            danger
            ghost
            icon={<DeleteOutlined />}
          ></Button>
        </Popconfirm>
      </Tooltip>
    </>
  )
}

export default DeleteCV;