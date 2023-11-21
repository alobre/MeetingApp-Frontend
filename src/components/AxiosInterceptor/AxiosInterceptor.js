import axios from 'axios';
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export const getMeetings = async () =>{
  try {
          const response = await axios.get('http://localhost:4000/getMeetings');
          return response.data;
      } catch (err) {
          console.error(err.message);
  }
};

export const createMeeting = async (body) =>{
  try {
          const response = await axios.post('http://localhost:4000/meetings', body);
          console.log({body})
          return response.data;
      } catch (err) {
          console.error(err.message);
  }
};

export const getAgenda = async (agenda_id) =>{
  try {
          const response = await axios.get('http://localhost:4000/agenda/' + agenda_id);
          return response.data;
      } catch (err) {
          console.error(err.message);
  }
};

export const getActionPoints = async (agenda_id) =>{
  try {
          const response = await axios.get('http://localhost:4000/actionPoints/' + agenda_id);
          return response.data;
      } catch (err) {
          console.error(err.message);
  }
};

export const deleteActionPoint = async (action_point_id) =>{
  try {
          const response = await axios.delete('http://localhost:4000/actionPoint/' + action_point_id);
          return response.data;
      } catch (err) {
          console.error(err.message);
  }
};

export const deleteActionPointComment = async (comment_id) =>{
  try {
          const response = await axios.delete('http://localhost:4000/actionPointComment/' + comment_id);
          return response.data;
      } catch (err) {
          console.error(err.message);
  }
};

export const deleteActionPointSubPoint = async (action_point_subpoint_id) =>{
  try {
          const response = await axios.delete('http://localhost:4000/actionPointSubPoint/' + action_point_subpoint_id);
          return response.data;
      } catch (err) {
          console.error(err.message);
  }
};

