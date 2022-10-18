import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

interface ContainerProps {
    styles:React.CSSProperties
    children?: React.ReactNode;
}

export const Container = (props: ContainerProps) => {
  return (
    <div style={props.styles}>
       Text goes here 
    </div>
  );
}
