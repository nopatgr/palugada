
import Swal from "sweetalert2";

export const fireToast = (icon: "success" | "error", title: string) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon,
    title,
    showConfirmButton: false,
    timer: 3000,
  });
};

export const fireConfirm = (text: string) =>
  Swal.fire({
       icon: "warning",
       text,
       showCancelButton: true,
       confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya",
    cancelButtonText: "Batal",
  });
