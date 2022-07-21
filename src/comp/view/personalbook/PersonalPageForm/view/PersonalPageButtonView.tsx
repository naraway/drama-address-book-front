import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';
import { Button } from '@mui/material';
import { ButtonGroupWrapper } from '../../../shared';

const PersonalPageButtonView = observer(
  ({
    onClickSave,
    onClickCancel,
    renderRemoveButton,
  }: {
    onClickSave: () => void;
    onClickCancel: () => void;
    renderRemoveButton: ReactNode
  }) => {
    return (
      <ButtonGroupWrapper>
        <Button size="large" variant="contained" onClick={onClickSave}>저장</Button>
        {renderRemoveButton}
        <Button size="large" variant="outlined" onClick={onClickCancel}>취소</Button>
      </ButtonGroupWrapper>
    );
  });

export default PersonalPageButtonView;
