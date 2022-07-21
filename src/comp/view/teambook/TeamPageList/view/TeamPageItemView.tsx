import React from 'react';
import { observer } from 'mobx-react';
import { Card, CardActionArea, CardContent, CardHeader, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { ContentPaste, LocationOn } from '@mui/icons-material';
import { AddressPage } from '../../../../api';
import { StarButton, TextAvatar } from '../../../shared';


const TeamPageItemView = observer(
  ({
    teamPage,
    onClickDefault,
    onClickTeamPage,
  }: {
    teamPage: AddressPage;
    onClickDefault: (teamPage: AddressPage) => void;
    onClickTeamPage: (teamPage: AddressPage) => void;
  }) => {
    const defaultText = '-';

    const getTruncatedText = (text: string | null | undefined) => {
      if (!text) {
        return defaultText;
      }

      const maxTextLength = 15;
      const formattedText = text.length > maxTextLength ? `${text.substring(0, maxTextLength)}...` : text;

      return formattedText || defaultText;
    };

    const handleClickTeamPage = (teamPage: AddressPage) => () => onClickTeamPage(teamPage);


    const handleClickDefault = () => onClickDefault(teamPage);

    return (
      <Card sx={{ maxWidth: 359 }} elevation={3} onClick={handleClickTeamPage(teamPage)}>
        <CardActionArea sx={{ p: 1 }}>
          <CardHeader
            avatar={<TextAvatar text={teamPage.name}/>}
            action={
              <StarButton
                baseAddress={teamPage.baseAddress}
                onClick={handleClickDefault}
              />
            }
            title={teamPage.name}
            titleTypographyProps={{ variant: 'h6' }}
          />
          <CardContent sx={{ height: 120, overflow: 'auto' }}>
            <List>
              <ListItem disablePadding>
                <ListItemIcon>
                  <LocationOn sx={{ color: 'lightgrey' }}/>
                </ListItemIcon>
                <ListItemText
                  primary={teamPage.address?.fullAddress}
                  primaryTypographyProps={{ variant: 'body2', sx: { color: 'gray' } }}
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <ContentPaste sx={{ color: 'lightgrey' }}/>
                </ListItemIcon>
                <ListItemText
                  primary={getTruncatedText(teamPage.memo)}
                  primaryTypographyProps={{ variant: 'body2', sx: { color: 'gray' } }}
                />
              </ListItem>
            </List>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  });

export default TeamPageItemView;
