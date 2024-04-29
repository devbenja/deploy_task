import { Card, Button } from "../ui";

import { useTasks } from "../../context/TaskContext";
import { useNavigate } from "react-router-dom";

import { PiTrashSimpleLight } from "react-icons/pi";
import { BiPencil } from "react-icons/bi";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const TaskCard = ({ task }) => {

  const { deleteTask } = useTasks();
  const navigate = useNavigate();

  const mostrarSweetAlertDelete = async () => {
    const MySwal = withReactContent(Swal);
    const result = await MySwal.fire({
      title: `Are you sure delete ${task.title}?`,
      text: `You won't be able to revert this!`,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      width: 400,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      deleteTask(task.id_task);
    }
  };


  return (
    <Card key={task.id} className="px-7 py-4 flex flex-col justify-center">
      <div>
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <p>{task.description}</p>
      </div>
      <div className="my-2 flex justify-evenly gap-x-2">
        <Button className="bg-yellow-600 px-4 py-1 flex items-center gap-1" onClick={() => navigate(`/task/${task.id_task}/edit`)}>
          <BiPencil className="text-white" />
          Editar
        </Button>
        <Button
          className="bg-red-700 hover:bg-red-600 px-4 py-1 flex items-center gap-1"
          onClick={mostrarSweetAlertDelete}
        >
          <PiTrashSimpleLight className="text-white" />
          Eliminar
        </Button>
      </div>
    </Card>
  );
}

