import React from 'react';
import { observer } from 'mobx-react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  action: {
    textAlign: 'center',
    marginTop: '30px',
    '& button': {
      marginRight: '10px',
    },
  },
}));

const ButtonGroupWrapperView = observer(
  ({
    children,
  }:{
    children: React.ReactNode;
  }) => {
    const classes = useStyles();

    return (
      <Box className={classes.action}>
        {children}
      </Box>
    );
  });

export default ButtonGroupWrapperView;
