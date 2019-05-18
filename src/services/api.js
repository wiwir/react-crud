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

  if (response.status !== 200) {
    let error;
    if (jsonResponse && jsonResponse.errors) {
      error = jsonResponse.errors[0].message;
    }
    throw Error(error || "There war an error");
  }

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
