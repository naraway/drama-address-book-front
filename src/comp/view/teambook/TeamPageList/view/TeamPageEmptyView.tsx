import { observer } from 'mobx-react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Add, ReportSharp } from '@mui/icons-material';
import React from 'react';


const TeamPageEmptyView = observer(
  ({
    onClickRegister = () => undefined,
  }: {
    onClickRegister?: () => void;
  }) => {
    return (
      <Paper sx={{ p: 10, textAlign: 'center' }}>
        <ReportSharp sx={{ fontSize: 120, color: 'lightgrey' }}/>
        <Box>
          <Typography color="lightgrey" variant="subtitle1">"등록된 연락처가 없습니다."</Typography>
          <Typography display="inline" fontWeight="bold" color="grey" variant="subtitle1">연락처 등록하기</Typography>
          <Typography display="inline" color="lightgrey" variant="subtitle1">를 클릭하여 연락처를 등록하시기 바랍니다.</Typography>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          sx={{ my: 5 }}
          startIcon={<Add/>} onClick={onClickRegister}>
          연락처 등록하기
        </Button>
      </Paper>
    );
  });

export default TeamPageEmptyView;
