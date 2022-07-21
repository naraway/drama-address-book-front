import { observer } from 'mobx-react';
import React from 'react';
import { Box, Button, Divider } from '@mui/material';

const PersonalPageSortView = observer(
  ({}) => {
    //
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: 'fit-content',
          color: 'text.secondary',
        }}
      >
        <Button
          color="inherit"
          // onClick={click(Math.random())}
        >
          등록일순
        </Button>
        <Divider orientation='vertical' variant='middle' flexItem/>
        <Button
          color='inherit'
        >
          이름순
        </Button>
      </Box>
    );
  });

export default PersonalPageSortView;
