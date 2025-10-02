import React, { useEffect, useState } from "react";
import ActivityService from "../services/activity.service";
import ActivityCard from "../components/ActivityCard";

const Activities = () => {
  const [activites, setActivities] = useState([]);
  console.log(activites);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ActivityService.getAllActivities();
        if (response.status === 200) {
          setActivities(response.data);
        }
      } catch (error) {
        console.log("fetching data error", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {activites.length === 0 && <p>ยังไม่มีกิจกรรม</p>}
      {activites.length > 0 &&
        activites.map((activity) => {
          return <ActivityCard activity={activity} />;
        })}
    </div>
  );
};

export default Activities;
