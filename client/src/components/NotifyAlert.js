import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export function MySwals(title, icon) {
  const MySwal = withReactContent(Swal);
  
  return MySwal.fire({
    icon: icon,
    title: title,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: "#ffff",
    color: "#000",
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
}
