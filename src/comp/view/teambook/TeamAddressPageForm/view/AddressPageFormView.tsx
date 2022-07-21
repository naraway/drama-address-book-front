import { observer } from 'mobx-react';
import React from 'react';
import { AddressPage } from '../../../../api';
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { TextAvatar } from '../../../shared';

const AddressPageFormView = observer(
  ({
    teamPage,
    onChange,
    onChangeField,
    onClickAddField,
    onClickRemoveField,
  }: {
    teamPage: AddressPage;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeField: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
    onClickAddField: () => void;
    onClickRemoveField: (index: number) => void;
  }) => {
    const defaultText = '';

    const handleChangeField = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => onChangeField(index, event);

    const handleClickRemoveField = (index: number) => () => onClickRemoveField(index);

    return (
      <Grid container spacing={10}>
        <Grid item xs={3}>
          <Paper sx={{ p: 5 }}>
            <Box width='100%' display='flex' justifyContent='center'>
              <TextAvatar text={teamPage.name} sx={{ width: 175, height: 175 }}/>
            </Box>
            <Box mt={5}>
              <TextField
                fullWidth
                size='small'
                margin='dense'
                name='name'
                value={teamPage.name}
                onChange={onChange}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={9}>
          <Typography variant='h6'>기본정보</Typography>
          <Divider sx={{ mb: 2 }}/>

          <Table>
            <colgroup>
              <col width='20%'/>
              <col width='80%'/>
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
                <TableCell>
                  {teamPage.address?.fullAddress || defaultText}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell/>
                <TableCell>
                  <Table>
                    <colgroup>
                      <col width='20%'/>
                      <col width='80%'/>
                    </colgroup>
                    <TableBody>
                      <TableRow>
                        <TableCell variant='head' padding='none'>우편번호</TableCell>
                        <TableCell padding='none'>
                          <TextField
                            fullWidth
                            size='small'
                            margin='dense'
                            name='address.zipCode'
                            value={teamPage.address?.zipCode || defaultText}
                            onChange={onChange}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant='head' padding='none'>시도</TableCell>
                        <TableCell padding='none'>
                          <TextField
                            fullWidth
                            size='small'
                            margin='dense'
                            name='address.city'
                            value={teamPage.address?.city || defaultText}
                            onChange={onChange}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant='head' padding='none'>시군구</TableCell>
                        <TableCell padding='none'>
                          <TextField
                            fullWidth
                            size='small'
                            margin='dense'
                            name='address.state'
                            value={teamPage.address?.state || defaultText}
                            onChange={onChange}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant="head" padding="none">도로명</TableCell>
                        <TableCell padding="none">
                          <TextField
                            fullWidth
                            size="small"
                            margin="dense"
                            name="address.street"
                            value={teamPage.address?.street || defaultText}
                            onChange={onChange}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant='head' padding='none'>상세주소</TableCell>
                        <TableCell padding='none'>
                          <TextField
                            fullWidth
                            size='small'
                            margin='dense'
                            name='address.zipAddress'
                            value={teamPage.address?.zipAddress || defaultText}
                            onChange={onChange}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>전화번호</TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    size='small'
                    margin='dense'
                    name='phoneNumber'
                    value={teamPage.phoneNumber || defaultText}
                    onChange={onChange}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>메모</TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    size='small'
                    margin='dense'
                    name='memo'
                    value={teamPage.memo || defaultText}
                    onChange={onChange}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Box mt={5} display='flex' justifyContent='space-between'>
            <Typography variant='h6'>추가정보</Typography>
            <Button
              size='small'
              variant='contained'
              startIcon={<Add/>}
              onClick={onClickAddField}
            >
              추가
            </Button>
          </Box>
          <Divider sx={{ mt: 1, mb: 2 }}/>

          <Table>
            <colgroup>
              <col width='20%'/>
              <col width='65%'/>
              <col width='10%'/>
            </colgroup>
            <TableBody sx={{ ' & td': { border: 0, color: 'text.secondary' } }}>
              {teamPage.fields.map((field, index) => (
                <TableRow key={index}>
                  <TableCell padding='none'>
                    <TextField
                      size='small'
                      margin='dense'
                      name='name'
                      value={field.name || defaultText}
                      placeholder='항목명을 입력하세요.'
                      onChange={handleChangeField(index)}
                    />
                  </TableCell>
                  <TableCell padding='none'>
                    <TextField
                      fullWidth
                      size='small'
                      margin='dense'
                      name='value'
                      value={field.value || defaultText}
                      placeholder='값을 입력하세요.'
                      onChange={handleChangeField(index)}
                    />
                  </TableCell>
                  <TableCell padding='none' align='right'>
                    <Button
                      size='small'
                      variant='outlined'
                      startIcon={<Delete/>}
                      onClick={handleClickRemoveField(index)}
                    >
                      삭제
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    );
  });

export default AddressPageFormView;
