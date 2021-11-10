import http from "../http-common";

export const getAll = () => {
  return http.get(`/tutorials`);
};

export const get = (id) => {
  return http.get(`/tutorials/${id}`);
};

export const create = (data) => {
  return http.post(`/tutorials`, data);
};

export const update = (id, data) => {
  return http.put(`/tutorials/${id}`, data);
};

export const remove = (id) => {
  return http.delete(`/tutorials/${id}`);
};

export const removeAll = () => {
  return http.delete(`/tutorials`);
};

export const findByTitle = (title) => {
  return http.get(`/tutorials?title=${title}`);
};
