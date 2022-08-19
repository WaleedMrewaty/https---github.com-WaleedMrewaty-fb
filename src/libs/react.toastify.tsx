import { Typography } from '@mui/material';
import { toast, ToastOptions } from 'react-toastify';

const componentAs = 'h6';
const variant = 'h6';
const loadingMessage = 'Loading...';

export const showSuccess = (message: string, _ToastOptions?: ToastOptions) =>
  toast.success(
    <div>
      <Typography variant={variant} component={componentAs}>
        {message}
      </Typography>
    </div>,
    _ToastOptions,
  );

export const showError = (message: string, _ToastOptions?: ToastOptions) =>
  toast.error(
    <div>
      <Typography variant={variant} component={componentAs}>
        {message}
      </Typography>
    </div>,

    _ToastOptions,
  );

export const showWarn = (message: string, _ToastOptions?: ToastOptions) =>
  toast.warn(
    <div>
      <Typography variant={variant} component={componentAs}>
        {message}
      </Typography>
    </div>,
    _ToastOptions,
  );

export const showLoading = (
  message: string = loadingMessage,
  _ToastOptions?: ToastOptions,
  autoCloseTime: number = 3000,
) => {
  setTimeout(() => {
    toast.dismiss(message);
  }, autoCloseTime);

  return toast.loading(
    <div>
      <Typography variant={variant} component={componentAs}>
        {message}
      </Typography>
    </div>,
    { toastId: message },
  );
};
