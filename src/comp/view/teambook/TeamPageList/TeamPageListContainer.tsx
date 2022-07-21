import { observer, useLocalObservable } from 'mobx-react';
import React, { useEffect } from 'react';
import { Box, Grid, Pagination } from '@mui/material';
import { TeamPagesStateKeeper, TeamPageStateKeeper } from '../../../state/teambook';
import TeamPageItemView from './view/TeamPageItemView';
import TeamPageEmptyView from './view/TeamPageEmptyView';
import TeamPageSortView from './view/TeamPageSortView';
import { AddressPage } from '../../../api';

const TeamPageListContainer = observer(
  ({
    onClickTeamPage = () => undefined,
    onClickRegister = () => undefined,
    teamBookId,
  }: {
    onClickTeamPage: (teamPage: AddressPage) => void;
    onClickRegister?: () => void;
    teamBookId: string;
  }) => {
    //
    const teamPageStateKeeper = useLocalObservable(() => TeamPageStateKeeper.instance);
    const teamPagesStateKeeper = useLocalObservable(() => TeamPagesStateKeeper.instance);
    const { teamPages, offset, totalCount } = teamPagesStateKeeper;

    const handleClickDefault = async (teamPage: AddressPage) => {
      //
      await teamPageStateKeeper.makeBaseTeamPage(teamPage);
      await teamPagesStateKeeper.findTeamPages(teamPage.addressBookId);
    };

    const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
      teamPagesStateKeeper.changePage(page);
      teamPagesStateKeeper.findTeamPages(teamBookId);
    };

    const handleChangeSortingField = (name: keyof AddressPage) => () => {
      //
      teamPagesStateKeeper.setOffsetProp('sortingField', name);
      teamPagesStateKeeper.findTeamPages(teamBookId);
    };

    const handleClickRegister = () => {
      onClickRegister();
    };

    useEffect(() => {
      init();
    }, []);

    const init = () => {
      teamPagesStateKeeper.setTeamBookId(teamBookId);
      teamPagesStateKeeper.findTeamPages(teamBookId);
    };

    return teamPages.length ? (
      <>
        <TeamPageSortView/>
        <Grid container spacing={5}>
          {teamPages.map(addressPage => (
            <Grid item xs={3} key={addressPage.id}>
              <TeamPageItemView
                teamPage={addressPage}
                onClickDefault={handleClickDefault}
                onClickTeamPage={onClickTeamPage}
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

      </>
    ) : (
      <TeamPageEmptyView
        onClickRegister={handleClickRegister}
      />
    );
  });

export default TeamPageListContainer;
