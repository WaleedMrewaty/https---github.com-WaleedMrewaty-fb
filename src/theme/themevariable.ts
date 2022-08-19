import { SxProps } from '@mui/material';

/* eslint-disable import/prefer-default-export */
export const themeVariable = {
  primary: '#1891CA',
  secondary: '#535865',
  dimmedWhite: 'rgba(196, 196, 196, 0.25)',
  White: '#FFF',
  arachnoOrange: '#EF5D2F',
  arachnoDarkBlue: '#20273F',
  lightBlack: '#808080',
};

export const ABSOLUTE_CENTER_STYLES: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  zIndex: 1,
};
