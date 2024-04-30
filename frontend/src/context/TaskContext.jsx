import { createContext, useState, useContext } from "react";
import {
    getAllTasksRequest,
    deleteTaskRequest,
    createTaskRequest,
    getTaskRequest,
    updateTaskRequest,
} from "../api/tasks.api.js";

import { successAlert } from "../utils/alerts/Alerts.js";
import { Outlet } from "react-router-dom";

const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTasks must be used within TaskProvider");
    }
    return context;
};

export const TaskProvider = ({ children }) => {

    const [tasks, setTasks] = useState([]);
    const [errors, setErrors] = useState([]);

    const loadTasks = async () => {
        const res = await getAllTasksRequest();
        setTasks(res.data);
    };

    const deleteTask = async (id) => {
        const res = await deleteTaskRequest(id);

        if (res.status === 200) {

            setTasks(tasks.filter((task) => task.id_task !== id));

            successAlert('Task Deleted')

        }
    };

    const createTask = async (task) => {
        try {
            const res = await createTaskRequest(task);
            setTasks([...tasks, res.data]);
            successAlert('Task Created');
            return res.data;
        } catch (error) {
            if (error.response) {
                setErrors([error.response.data.message]);
            }
        }
    };

    const loadTask = async (id) => {
        const res = await getTaskRequest(id);
        return res.data;
    };

    const updateTask = async (id, task) => {
        try {
            const res = await updateTaskRequest(id, task);
            successAlert('Task Updated');
            return res.data;
        } catch (error) {
            if (error.response) {
                setErrors([error.response.data.message]);
            }
        }
    };

    return (
        <TaskContext.Provider
            value={{ tasks, loadTasks, deleteTask, createTask, errors, loadTask, updateTask }}
        >
            {children ? children : <Outlet/>}
        </TaskContext.Provider>
    )
}