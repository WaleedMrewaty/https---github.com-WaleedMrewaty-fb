import { Box, Container, SxProps } from '@mui/material';
import React, { FC, PropsWithChildren } from 'react';

interface IContainerBackgroundProps {
  backgroundColor?: string;
  sx?: SxProps;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

const ContainerBackground: FC<PropsWithChildren<IContainerBackgroundProps>> = ({
  backgroundColor = 'white',
  sx,
  maxWidth = 'lg',
  children,
}) => (
  <Box sx={{ ...sx, backgroundColor }}>
    <Container maxWidth={maxWidth}>{children}</Container>
  </Box>
);

export default ContainerBackground;
