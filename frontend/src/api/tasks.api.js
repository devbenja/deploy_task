import axios from "./axios";

export const getAllTasksRequest = () => axios.get("/list_tasks");

export const createTaskRequest = (task) => axios.post("/create_task", task);

export const deleteTaskRequest = (id) => axios.delete(`/delete_task/${id}`);

export const getTaskRequest = (id) => axios.get(`/task/${id}`);

export const updateTaskRequest = (id, task) => axios.put(`update_task/${id}`, task);