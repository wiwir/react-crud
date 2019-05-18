import axios from "axios";

const baseUrl = "http://localhost:4000";

async function request(url, method, data) {
  const response = await fetch(`${baseUrl}${url}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: data ? JSON.stringify(data) : undefined
  });
  const jsonResponse = await response.json();
  return jsonResponse.data;
}

export const create = data => {
  return request("/todo", "POST", data);
};

export const read = () => {
  return request("/todo", "GET");
};

export const update = (id, data) => {
  return request(`/todo/${id}`, "POST", data);
};

export const remove = id => {
  return request(`/todo/${id}`, "DELETE");
};
