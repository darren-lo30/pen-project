import axios from "axios";

export const getStrokeData = async () => {
  return await axios.get('/strokeData', {responseType: 'blob'});
}
