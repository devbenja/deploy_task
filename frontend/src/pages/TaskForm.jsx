import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import { Card, Input, Label, Container, Button, TextArea } from "../components/ui";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";


export const TaskForm = () => {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const { createTask, loadTask, updateTask, errors: taskErrors } = useTasks();

  useEffect(() => {
    if (params.id) {
      loadTask(params.id).then(task => {
        setValue("title", task.title);
        setValue("description", task.description);
      });
    }
  }, [])

  const onSubmit = handleSubmit(async (data) => {
    let task;

    if (!params.id) {
      task = await createTask(data);
    } else {
      task = await updateTask(params.id, data)
    }

    if (task) {
      navigate("/tasks");
    }
  });

  return (
    <Container className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <Card>
        {
          taskErrors.map((error, i) => (
            <p key={i} className="text-red-500">{error}</p>
          ))
        }
        <h3 className="text-xl font-semibold text-center mb-4">Task Info</h3>
        <form onSubmit={onSubmit}>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            placeholder="Enter task title"
            {...register('title', { required: true })}
          />
          {errors.title && <p className="text-red-500">Title is required</p>}

          <Label htmlFor="description">Description</Label>
          <TextArea
            type="text"
            placeholder="Enter task description"
            {...register('description')}
          />

          <Button className="px-4 py-1 bg-green-600 w-full hover:bg-green-900">
            {params.id ? 'Edit Task' : 'Create Task'}
          </Button>
        </form>
      </Card>
    </Container>
  )
}
