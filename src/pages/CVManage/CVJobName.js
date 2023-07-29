import { useEffect, useState } from "react";
import { getDetailJob } from "../../services/jobsService";

function CVJobName(props) {
  const {record} = props;
  const [job, setJob] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getDetailJob(record.idJob);
      if (response) {
        setJob(response);
      }
    };
    fetchApi();
  }, []);

  return(
    <>
      {job && job.name}
    </>
  )
}

export default CVJobName;