import { toast } from "react-toastify";
import Swal from "sweetalert2";

type Props = { message?: string; custom?: React.ReactNode; autoClose?: number };

export const AlertSuccess = ({ message }: Props) => {
  toast.success(message);
};

export const AlertError = ({ message }: Props) => {
  toast.error(message);
};

export const AlertInfo = ({ message, custom, autoClose }: Props) => {
  toast.info(message || custom, { autoClose });
};

export const AlertDelete = async () => {
  const result = await Swal.fire({
    title: "Tem certeza?",
    text: "Esta ação não poderá ser revertida!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3366FF",
    cancelButtonColor: "#FF3932",
    confirmButtonText: "Sim, excluir!",
    cancelButtonText: "Cancelar",
  });

  if (result.isConfirmed) {
    return true;
  }

  return false;
};
