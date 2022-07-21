import React from 'react';
import { observer } from 'mobx-react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { Workspace } from '../../../shared/Types/Workspace';

const PersonalPageCopyDialogView = observer(
  ({
    open,
    cinerooms,
    onClickClose,
    onChangeTeam,
    onClickCopy,
  }: {
    open: boolean,
    cinerooms: Workspace[]
    onClickClose: () => void;
    onChangeTeam: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClickCopy: () => void;
  }) => {

    const handleClickCopy = () => onClickCopy();
    const handleChangeTeam = () => (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event);
      onChangeTeam(event);
    };

    return <Dialog open={open}
    >
      <DialogTitle id="alert-dialog-title">
        {'팀 주소록 복사'}
      </DialogTitle>
      <DialogContent dividers>
        <Box height={'100%'} display="flex" justifyContent="center">
          <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
            <InputLabel id="demo-select-small">팀</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              // value={age}
              label="팀"
              onChange={handleChangeTeam}
            >
              {cinerooms.map(value => <MenuItem value={value.id}>{value.name}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant={'contained'} onClick={handleClickCopy}>복사</Button>
        <Button variant={'outlined'} onClick={onClickClose}>닫기</Button>
      </DialogActions>
    </Dialog>;
  });

export default PersonalPageCopyDialogView;

