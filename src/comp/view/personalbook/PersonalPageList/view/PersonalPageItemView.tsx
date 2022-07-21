import React from 'react';
import { observer } from 'mobx-react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { ContentPaste, LocationOn, PhoneAndroid } from '@mui/icons-material';
import { AddressPage } from '../../../../api';
import { CopyButton, StarButton, TextAvatar } from '../../../shared';

const PersonalPageItemView = observer(
  ({
    personalPage,
    onClickDefault,
    onClickPersonalPage,
    onClickCopyIcon,
  }: {
    personalPage: AddressPage;
    onClickDefault: (personalPage: AddressPage) => void;
    onClickPersonalPage: (personalPage: AddressPage) => void;
    onClickCopyIcon: (personalPageId: string) => void;
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

    const handleClickPersonalPage = (personalPage: AddressPage) => () => onClickPersonalPage(personalPage);
    const handleClickDefault = () => onClickDefault(personalPage);
    const handleClickCopyIcon = () => onClickCopyIcon(personalPage.id);


    return (
      <Card sx={{ maxWidth: 359 }} elevation={3} onClick={handleClickPersonalPage(personalPage)}>
        <CardActionArea sx={{ p: 1 }}>
          <CardHeader
            avatar={<TextAvatar text={personalPage.name}/>}
            action={
              <>
                <CopyButton
                  onClickCopyIcon={handleClickCopyIcon}
                />
                <StarButton
                  baseAddress={personalPage.baseAddress}
                  onClick={handleClickDefault}
                />
              </>
            }
            title={personalPage.name}
            titleTypographyProps={{ variant: 'h6' }}
          />
          <CardContent sx={{ height: 120, overflow: 'auto' }}>
            <List>
              <ListItem disablePadding>
                <ListItemIcon>
                  <LocationOn sx={{ color: 'lightgrey' }}/>
                </ListItemIcon>
                <ListItemText
                  primary={personalPage.address?.fullAddress}
                  primaryTypographyProps={{ variant: 'body2', sx: { color: 'gray' } }}
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <PhoneAndroid sx={{ color: 'lightgrey' }}/>
                </ListItemIcon>
                <ListItemText
                  primary={getTruncatedText(personalPage.phoneNumber)}
                  primaryTypographyProps={{ variant: 'body2', sx: { color: 'gray' } }}
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <ContentPaste sx={{ color: 'lightgrey' }}/>
                </ListItemIcon>
                <ListItemText
                  primary={getTruncatedText(personalPage.memo)}
                  primaryTypographyProps={{ variant: 'body2', sx: { color: 'gray' } }}
                />
              </ListItem>
            </List>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  });

export default PersonalPageItemView;
