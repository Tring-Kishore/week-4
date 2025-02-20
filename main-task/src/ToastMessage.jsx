import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const toastMessage = (message, ToastType) => {
  toast[ToastType](message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
};