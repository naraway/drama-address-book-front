import React, { useEffect } from 'react';
import { observer, useLocalObservable } from 'mobx-react';
import { DramaException } from '@nara-way/accent';
import TeamPageDetailView from './view/AddressPageDetailView';
import { TeamPageStateKeeper } from '../../../state/teambook';


const TeamPageDetailContainer = observer(
  ({
    teamPageId,
  }: {
    teamPageId: string;
  }) => {
    //
    const teamPageStateKeeper = useLocalObservable(() => TeamPageStateKeeper.instance);
    const { teamPage } = teamPageStateKeeper;

    useEffect(() => {
      init();
    }, []);

    const init = () => {
      teamPageStateKeeper.findTeamPageById(teamPageId);
    };

    const handleClickDefault = async () => {
      //
      if (!teamPage) {
        throw new DramaException('TeamPageDetail', 'teamPage should not be null.');
      }

      await teamPageStateKeeper.makeBaseTeamPage(teamPage);
      init();
    };

    return teamPage && (
      <TeamPageDetailView
        teamPage={teamPage}
        onClickDefault={handleClickDefault}
      />
    );
  });


export default TeamPageDetailContainer;
