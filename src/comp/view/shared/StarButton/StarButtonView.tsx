import React from 'react';
import { observer } from 'mobx-react';
import { IconButton } from '@mui/material';
import { Star } from '@mui/icons-material';


const StarButtonView = observer(
  ({
    baseAddress,
    onClick,
  }: {
    baseAddress: boolean;
    onClick: () => void;
  }) => {

    const handleClickIconButton = () => {
      onClick();
    };
    return (
      <IconButton
        onClick={handleClickIconButton}
      >
        <Star style={{ color: baseAddress ? 'orange' : 'lightgrey' }}/>
      </IconButton>
    );
  });

export default StarButtonView;
