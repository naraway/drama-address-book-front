import React, { useEffect, useState } from 'react';
import { observer, useLocalObservable } from 'mobx-react';
import { PersonalPagesStateKeeper, PersonalPageStateKeeper } from '../../../state';
import { AddressPage } from '../../../api';
import { Box, Grid, Pagination } from '@mui/material';
import PersonalPageItemView from './view/PersonalPageItemView';
import PersonalPageSortView from './view/PersonalPageSortView';
import PersonalPageEmptyView from './view/PersonalPageEmptyView';
import PersonalPageCopyDialogView from './view/PersonalPageCopyDialogView';
import { Workspace } from '../../shared/Types/Workspace';

const PersonalPageListContainer = observer(
  ({
    onClickPersonalPage = () => undefined,
    onClickRegister = () => undefined,
    personalBookId,
    cinerooms,
  }: {
    onClickPersonalPage?: (personalPage: AddressPage) => void;
    onClickRegister?: () => void;
    personalBookId: string
    cinerooms: Workspace[]
  }) => {
    //
    const personalPageStateKeeper = useLocalObservable(() => PersonalPageStateKeeper.instance);
    const personalPagesStateKeeper = useLocalObservable(() => PersonalPagesStateKeeper.instance);
    const { personalPages, offset, totalCount } = personalPagesStateKeeper;

    const [open, setOpen] = useState(false);
    const [selectedPersonalPageId, setSelectedPersonalPageId] = useState<string | undefined>(undefined);
    const [selectedTeamBookId, setSelectedTeamBookId] = useState<string | undefined>(undefined);

    const handleClickClose = () => {
      setOpen(false);
    };

    const handleClickCopyIcon = (personalPageId: string) => {
      setOpen(true);
      setSelectedPersonalPageId(personalPageId);
    };

    const handleChangeTeam = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event);
      setSelectedTeamBookId(event.target.value);
    };

    const handleClickCopy = () => {
      if (selectedPersonalPageId && selectedTeamBookId) {
        personalPageStateKeeper.copyPersonalPageFromTeamBook(selectedPersonalPageId, selectedTeamBookId);
      }
      setOpen(false);
      setSelectedPersonalPageId(undefined);
      setSelectedTeamBookId(undefined);
    };

    const handleClickDefault = async (personalPage: AddressPage) => {
      //
      await personalPageStateKeeper.makeBasePersonalPage(personalPage);
      await personalPagesStateKeeper.findPersonalPages(personalPage.addressBookId);
    };

    const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
      personalPagesStateKeeper.changePage(page);
      personalPagesStateKeeper.findPersonalPages(personalBookId);
    };

    const handleChangeSortingField = (name: keyof AddressPage) => () => {
      //
      personalPagesStateKeeper.setOffsetProp('sortingField', name);
      personalPagesStateKeeper.findPersonalPages(personalBookId);
    };

    const handleClickRegister = () => {
      onClickRegister();
    };

    useEffect(() => {
      init();
    }, []);

    const init = () => {
      personalPagesStateKeeper.setPersonalBookId(personalBookId);
      personalPagesStateKeeper.findPersonalPages(personalBookId);
    };

    return personalPages.length ? (
      <>
        <PersonalPageSortView/>
        <Grid container spacing={5}>
          {personalPages.map(personalPage => (
            <Grid item xs={3} key={personalPage.id}>
              <PersonalPageItemView
                personalPage={personalPage}
                onClickDefault={handleClickDefault}
                onClickPersonalPage={onClickPersonalPage}
                onClickCopyIcon={handleClickCopyIcon}
              />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ width: '100%', mt: 5, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            color="primary"
            shape="rounded"
            count={Math.ceil(totalCount / offset.limit)}
            onChange={handleChangePage}
          />
        </Box>
        <PersonalPageCopyDialogView
          open={open}
          cinerooms={cinerooms}
          onClickClose={handleClickClose}
          onChangeTeam={handleChangeTeam}
          onClickCopy={handleClickCopy}
        />
      </>
    ) : (
      <PersonalPageEmptyView
        onClickRegister={handleClickRegister}
      />
    );

  });

export default PersonalPageListContainer;
