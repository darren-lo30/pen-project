import axios from "axios";

export const updatePreferences = async (params: {
  storeData: boolean,
}) => {
  return await axios.put('/users/preferences', {...params});
}

export const getPreferences = async () => {
  return await axios.get('/users/preferences', {});
}