import Swal from "sweetalert2";

export const successAlert = (title) => {
    Swal.fire({
        title: title,
        icon: "success", 
        width: 300
    });
};