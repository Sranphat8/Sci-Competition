import api from "./api";
const API_URL = import.meta.env.VITE_ACTIVITY_API;

const createActivity = async (data) => {
  return await api.post(API_URL + "/", data);
};
const getAllActivities = async () => {
  return await api.get(API_URL + "/");
};
const ActivityService = {
  createActivity,
  getAllActivities,
};
export default ActivityService;
