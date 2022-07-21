import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Box, Button, Divider, Grid, Paper, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { AddressPage } from '../../../../api';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { StarButton, TextAvatar } from '../../../shared';

const PersonalPageDetailView = observer(
  ({
    personalPage,
    onClickDefault,
  }: {
    personalPage: AddressPage;
    onClickDefault: () => void;
  }) => {
    const defaultText = '-';
    const [expanded, setExpanded] = useState(false);

    const handleToggleExpand = () => setExpanded(!expanded);

    return (
      <Grid container spacing={10}>
        <Grid item xs={3}>
          <Paper sx={{ p: 5 }}>
            <Box width="100%" display="flex" justifyContent="center">
              <TextAvatar text={personalPage.name} sx={{ width: 175, height: 175 }}/>
            </Box>
            <Box mt={5} width="100%" display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h5">{personalPage.name}</Typography>
              <StarButton
                baseAddress={personalPage.baseAddress}
                onClick={onClickDefault}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h6">기본정보</Typography>
          <Divider sx={{ mb: 2 }}/>

          <Table>
            <colgroup>
              <col width="20%"/>
              <col width="80%"/>
            </colgroup>
            <TableBody sx={{
              '& td': {
                border: 0,
                color: 'text.secondary',
                alignItems: 'center',
                wordBreak: 'break-all',
                noWrap: 'true',
              },
            }}>
              <TableRow>
                <TableCell>주소</TableCell>
                <TableCell sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  {personalPage.address?.fullAddress || defaultText}
                  <Button
                    color="inherit"
                    size="small"
                    startIcon={expanded ? <KeyboardArrowUp/> :
                      <KeyboardArrowDown sx={{ borderRadius: '50%', fill: 'white', bgcolor: 'navy' }}/>}
                    onClick={handleToggleExpand}
                  >
                    상세보기
                  </Button>
                </TableCell>
              </TableRow>
              {expanded && (
                <TableRow>
                  <TableCell/>
                  <TableCell>
                    <Table>
                      <colgroup>
                        <col width="20%"/>
                        <col width="80%"/>
                      </colgroup>
                      <TableBody>
                        <TableRow>
                          <TableCell variant="head" width="10%" padding="none">시도</TableCell>
                          <TableCell>{personalPage.address?.city || defaultText}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell variant="head" width="10%" padding="none">시군구</TableCell>
                          <TableCell>{personalPage.address?.state || defaultText}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell variant="head" width="10%" padding="none">도로명</TableCell>
                          <TableCell>{personalPage.address?.street || defaultText}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell variant="head" width="10%" padding="none">상세주소</TableCell>
                          <TableCell>{personalPage.address?.zipAddress || defaultText}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell>전화번호</TableCell>
                <TableCell>{personalPage.phoneNumber || defaultText}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>메모</TableCell>
                <TableCell>{personalPage.memo || defaultText}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Box mt={5} mb={2}>
            <Typography variant="h6">추가정보</Typography>
            <Divider/>
          </Box>

          <Table>
            <TableBody sx={{ '& td': { border: 0, color: 'text.secondary' } }}>
              {personalPage.fields.map(field => (
                <TableRow key={field.name}>
                  <TableCell>{field.name}</TableCell>
                  <TableCell>{field.value || defaultText}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    );
  });

export default PersonalPageDetailView;
