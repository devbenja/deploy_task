import { useEffect } from "react";
import { TaskCard } from "../components/tasks/TaskCard";
import { useTasks } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";
import { Container } from "../components/ui";
import { ClipLoader } from "react-spinners";

export const Tasks = () => {

  const { tasks, loadTasks } = useTasks();
  const { user } = useAuth();

  useEffect(() => {
    loadTasks();
  }, []);

  if (tasks.length === 0) return (
    <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
      <h1 className="text-3xl font-bold">No tasks found</h1>
    </div>
  )

  return (
    <Container>
      {user ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mx-10 mt-5">
          {tasks.map((task) => (
            <TaskCard task={task} key={task.id_task} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 bg-gray-900 text-gray-100">
          <ClipLoader color="blue" size={50} />
        </div>
      )
      }
    </Container>
  );
}