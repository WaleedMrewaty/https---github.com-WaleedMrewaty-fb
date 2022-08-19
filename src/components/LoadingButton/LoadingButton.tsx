/* eslint-disable react/jsx-props-no-spreading */
import { HashLoader } from 'react-spinners';
import { Button } from '@mui/material';

interface LoadingButtonProps {
  isSubmating?: boolean;
  width?: string;
  loadingSize?: number;
  text?: string;
  [key: string]: any;
}

const LoadingButton = ({
  isSubmating,
  loadingSize,
  width,
  text,
  ...props
}: LoadingButtonProps) => {
  const LOADINGSTYLE = {
    width: width || '100%',
  };

  return (
    <Button
      disabled={isSubmating}
      variant="contained"
      type="submit"
      sx={LOADINGSTYLE}
      {...props}
    >
      {isSubmating ? (
        <HashLoader color="#808080" size={loadingSize || 20} />
      ) : (
        text
      )}
    </Button>
  );
};

export default LoadingButton;
