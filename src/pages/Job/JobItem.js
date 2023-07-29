import { Link } from "react-router-dom";
import { Card, Tag } from "antd";

function JobItem(props) {
  const { item } = props;

  return (
    <>
      <Link to={`/job/${item.id}`}>
        <Card
          title={item.name}
          className="box-shadow"
          size="small"
          hoverable={true}
          headStyle={{color:"#4096FF"}}
        >
          <div className="mb-20">
            <span>Ngôn ngữ: </span>
            {item.tags.map((item, index) => (
              <Tag color="blue" className="mb-5" key={index}>
                {item}
              </Tag>
            ))}
          </div>

          <div className="mb-20">
            <span>Thành phố: </span>
            {item.city.map((item, index) => (
              <Tag color="orange" className="mb-5" key={index}>
                {item}
              </Tag>
            ))}
          </div>

          <div className="mb-10">
            Lương: <strong>{item.salary}$</strong>
          </div>

          <div className="mb-10">
            Ngày tạo: <strong>{item.createAt}</strong>
          </div>
        </Card>
      </Link>
    </>
  )
}

export default JobItem;