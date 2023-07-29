import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tag, Space } from "antd";
import { getListTag } from "../../services/tagsService";

function SkillList() {
  const [dataTags, setDataTags] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListTag();
      if (response) {
        setDataTags(response);
      }
    };
    fetchApi();
  }, []);

  return (
    <>
      <div className="mb-20">
        <Space size={[0, 8]} wrap>
          {dataTags.map((item) => (
            <Link
              to={`search?keyword=${item.value || ""}`}
              key={item.key}
            >
              <Tag color='blue'>{item.value}</Tag>
            </Link>
          ))}
        </Space>
      </div>
    </>
  )
}

export default SkillList;