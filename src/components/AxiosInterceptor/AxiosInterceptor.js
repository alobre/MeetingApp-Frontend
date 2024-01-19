import axios from "axios";
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export const getMeetings = async () => {
  try {
    const activeUser = localStorage.getItem("active_uid");
    const response = await axios.get(
      "http://localhost:4000/getMeetings/" + activeUser
    );
    console.log("response meetings from db " + JSON.stringify(response));
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};

export const hasRightToEdit = async (meetingId) => {
  try {
    console.log("has right to editbody: " + JSON.stringify(meetingId));
    const activeUser = localStorage.getItem("active_uid");
    const response = await axios.get("http://localhost:4000/getRightToEdit", {
      params: {
        active_uid: activeUser,
        meeting_id: meetingId,
      },
    });
    console.log("response hasRightToEdit from db ");

    return response;
  } catch (err) {
    console.error(err.message);
  }
};

export const getNotifications = async () => {
  try {
    const activeUser = localStorage.getItem("active_uid");
    console.log("Active user = " + localStorage.getItem("active_uid"));
    const response = await axios.get("http://localhost:4000/getNotifications", {
      params: {
        active_uid: activeUser,
      },
    });
    console.log("response notifications from db " + JSON.stringify(response));
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};

export const login = async (body) => {
  try {
    const response = await axios.post("http://localhost:4000/login", body);
    console.log({ body });
    console.log("Response Data: " + JSON.stringify(response.data));

    const response2 = await axios.post(
      "http://localhost:4000/users",
      response.data
    );

    return { loginResponse: response.data, userResponse: response2.data };

    // return response.data;
  } catch (err) {
    console.error(err.message);
  }
};

export const createMeeting = async (body) => {
  try {
    const response = await axios.post("http://localhost:4000/meetings", body);
    console.log(
      "In create meeting/axios interceptor body: " + JSON.stringify(body)
    );
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};

export const editMeeting = async (meetingId, meeting) => {
  console.log(
    "meeting data in axios " + JSON.stringify(meeting) + " and id " + meetingId
  );
  try {
    const body = {
      meetingId,
      meeting,
    };
    const response = await axios.put("http://localhost:4000/meetings", body);
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};

export const getAgenda = async (agenda_id) => {
  try {
    const response = await axios.get(
      "http://localhost:4000/agenda/" + agenda_id
    );
    console.log("getAgenda in axios response " + JSON.stringify(response.data));
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};

export const getProtocol = async (agenda_id) => {
  try {
    const response = await axios.get(
      "http://localhost:4000/protocol/" + agenda_id
    );
    console.log(
      "getProtocol in axios response " + JSON.stringify(response.data)
    );
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};

export const getActionPoints = async (agenda_id) => {
  try {
    const response = await axios.get(
      "http://localhost:4000/actionPoints/" + agenda_id
    );
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};

export const deleteMeeting = async (meetingIdToDelete) => {
  try {
    const response = await axios.delete(
      "http://localhost:4000/meetings/" + meetingIdToDelete
    );
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};

export const deleteActionPoint = async (action_point_id) => {
  try {
    const response = await axios.delete(
      "http://localhost:4000/actionPoint/" + action_point_id
    );
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};

export const deleteActionPointComment = async (comment_id) => {
  try {
    const response = await axios.delete(
      "http://localhost:4000/actionPointComment/" + comment_id
    );
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};

export const deleteActionPointSubPoint = async (action_point_subpoint_id) => {
  try {
    const response = await axios.delete(
      "http://localhost:4000/actionPointSubPoint/" + action_point_subpoint_id
    );
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};

export const postActionPoint = async (text, agenda_id) => {
  try {
    console.log("post action point axios");
    console.log("axios agenda id " + agenda_id + " and text " + text);
    const body = {
      text,
      agenda_id,
    };
    const response = await axios.post(
      "http://localhost:4000/actionPoint",
      body
    );

    console.log("RETURNING ID " + response.data);
    console.log("RETURNING ID " + JSON.stringify(response.data));

    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};
export const updateActionPoint = async (text, agenda_id) => {
  try {
    const body = {
      text,
      agenda_id,
    };
    const response = await axios.put("http://localhost:4000/actionPoint", body);
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};
export const postActionPointComment = async (
  user_id,
  comment_text,
  action_point_id
) => {
  try {
    const body = {
      user_id,
      comment_text,
      action_point_id,
    };
    const response = await axios.post(
      "http://localhost:4000/actionPointComment",
      body
    );
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};
export const updateActionPointComment = async (
  user_id,
  comment_text,
  action_point_id
) => {
  try {
    const body = {
      user_id,
      comment_text,
      action_point_id,
    };
    const response = await axios.put(
      "http://localhost:4000/actionPointComment",
      body
    );
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};
export const postActionPointSubPoint = async (message, action_point_id) => {
  try {
    const body = {
      message,
      action_point_id,
    };
    const response = await axios.post(
      "http://localhost:4000/actionPointSubPoint",
      body
    );
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};

export const updateActionPointSubPoint = async (
  message,
  action_point_subpoint_id
) => {
  try {
    const body = {
      message,
      action_point_subpoint_id,
    };
    console.log(body);
    const response = await axios.put(
      "http://localhost:4000/actionPointSubPoint",
      body
    );
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};

export const fetchUsers = async (username) => {
  try {
    const response = await axios.get("http://localhost:4000/user/" + username);
    // console.log({ username });
    console.log("Response Data: " + JSON.stringify(response.data));
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};

export const insertSubpointNotes = async (body) => {
  try {
    console.log("IN AXIOS body " + JSON.stringify(body));
    const response = await axios.post(
      "http://localhost:4000/subpointNotes",
      body
    );
    console.log(
      "insert SP notes response in axios: " + JSON.stringify(response.data)
    );

    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};

export const insertCommentNotes = async (body) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/commentNotes",
      body
    );
    console.log(
      "insert CN notes response in axios: " + JSON.stringify(response.data)
    );

    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};
