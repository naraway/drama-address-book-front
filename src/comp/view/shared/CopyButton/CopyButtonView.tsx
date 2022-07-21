import React from 'react';
import { observer } from 'mobx-react';
import { IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const CopyButtonView = observer(
  ({
    onClickCopyIcon,
  }: {
    onClickCopyIcon: () => void;
  }) => {
    const handleClickIconButton = () => {
      onClickCopyIcon();
    };
    return (
      <IconButton
        onClick={handleClickIconButton}>
        <ContentCopyIcon/>
      </IconButton>
    );
  });

export default CopyButtonView;
