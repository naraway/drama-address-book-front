import { observer, useLocalObservable } from 'mobx-react';
import React, { useEffect } from 'react';
import TeamPageFormView from './view/AddressPageFormView';
import TeamPageButtonView from './view/AddressPageButtonView';
import { DramaException } from '@nara-way/accent';
import { AddressPage } from '../../../api';
import { TeamPageStateKeeper } from '../../../state/teambook';
import { Button } from '@mui/material';

const TeamPageFormContainer = observer(
  ({
    teamPageId,
    teamBookId,
    onClickCancel = () => undefined,
    onSuccess = () => undefined,
    onFail = () => undefined,
  }: {
    teamPageId?: string;
    teamBookId?: string;
    onClickCancel?: () => void;
    onSuccess?: () => void;
    onFail?: () => void;
  }) => {
    //
    const teamPageStateKeeper = useLocalObservable(() => TeamPageStateKeeper.instance);
    const { teamPage } = teamPageStateKeeper;

    useEffect(() => {
      init();
    }, []);

    const init = () => {
      if (teamPageId) {
        teamPageStateKeeper.findTeamPageById(teamPageId);
      } else if (teamBookId) {
        teamPageStateKeeper.init(teamBookId);
      }
    };

    const handleClickDefault = async () => {
      //
      if (!teamPage) {
        throw new DramaException('TeamPageForm', 'teamPage should not be null.');
      }

      await teamPageStateKeeper.makeBaseTeamPage(teamPage);
      await init();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      //
      const { name, value } = event.target;

      teamPageStateKeeper.setTeamPageProp(name, value);
    };

    const handleClickAddField = () => {
      //
      teamPageStateKeeper.addField();
    };

    const handleClickRemoveField = (index: number) => {
      //
      teamPageStateKeeper.removeField(index);
    };

    const handleChangeField = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
      //
      const { name, value } = event.target;

      teamPageStateKeeper.setTeamPageField(index, name, value);
    };

    const handleClickSave = async () => {
      //
      if (!teamPage) {
        throw new DramaException('TeamPageForm', 'teamPage should not be null.');
      }

      const response = teamPageId ?
        await teamPageStateKeeper.modify(teamPageId, AddressPage.asNameValues(teamPage))
        : await teamPageStateKeeper.register(teamPage);

      if (response.failed) {
        onFail();
      } else {
        onSuccess();
      }
    };

    const handleClickRemove = async () => {
      //
      if (teamPageId) await teamPageStateKeeper.removeTeamPage(teamPageId);
    };

    return teamPage && (
      <>
        <TeamPageFormView
          teamPage={teamPage}
          onChange={handleChange}
          onChangeField={handleChangeField}
          onClickAddField={handleClickAddField}
          onClickRemoveField={handleClickRemoveField}
        />
        <TeamPageButtonView
          onClickSave={handleClickSave}
          onClickCancel={onClickCancel}
          renderRemoveButton={teamPageId &&
            <Button size="large" variant="contained" onClick={handleClickRemove}>삭제</Button>}
        />
      </>
    );
  });

export default TeamPageFormContainer;
