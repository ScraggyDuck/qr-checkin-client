import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastError = err => {
  toast.error(err);
};

export const toastSuccess = (msg) => {
  toast.success(msg);
};
