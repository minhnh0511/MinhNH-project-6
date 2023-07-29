import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllJobs } from "../../services/jobsService";
import { Tag } from "antd";
import SearchList from "./SearchList";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState();
  const searchedCity = searchParams.get("city") || "";
  const searchedKeyword = searchParams.get("keyword") || "";

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getAllJobs();
      if (response) {
        const newData = response.filter((item) => {
          const city = searchedCity
            ? item.city?.includes(searchedCity) : true;
          const keyword = searchedKeyword
            ? item.tags?.includes(searchedKeyword) : true;
          const status = item.status;
          return city && keyword && status;
        });
        setData(newData.reverse());
      }
    };
    fetchApi();
  }, []);

  return (
    <>
      <div>
        <b>Kết quả tìm kiếm: </b>
        {searchedKeyword &&
          <Tag color="blue">{searchedKeyword}</Tag>
        }
        {searchedCity &&
          <Tag color="orange">{searchedCity}</Tag>
        }
      </div>
      {data && (
        <SearchList data={data}/>
      )}
    </>
  )
}
export default Search;