import store from "@/store";

const API_URL = "https://dry-waters-99332.herokuapp.com";

export default function apiFetch(method, data) {
  const params = Object.assign(
    {
      authCookie: store.state.authCookie,
      verificationCookie: store.state.verificationCookie
    },
    data
  );

  return fetch(`${API_URL}/${method}`, {
    body: JSON.stringify(params),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST"
  });
}
