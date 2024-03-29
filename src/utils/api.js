import store from "@/store";

const sendReq = (methodUrl, data = {}) => {
  const { authCookie, verificationCookie } = store.state.session;
  const { apiUrl } = store.state;

  const req = Object.assign(
    {
      authCookie,
      verificationCookie
    },
    data
  );

  return fetch(`${apiUrl}/${methodUrl}`, {
    body: JSON.stringify(req),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST"
  });
};

export const signIn = ({ email, password }) =>
  sendReq("getAuthData", { email, password });

export const getTopics = () => sendReq("getTopics");

export const getTask = ({ topicId }) => sendReq(`topic/${topicId}/get`);

export const sendAnswer = ({ topicId, taskId, answer, sessionCookie }) =>
  sendReq(`topic/${topicId}/send`, {
    taskId,
    answer,
    sessionCookie
  });
