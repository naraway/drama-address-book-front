import React, { useEffect } from 'react';
import { observer, useLocalObservable } from 'mobx-react';
import { AddressPage } from '../../../api';
import { PersonalPageStateKeeper } from '../../../state';
import PersonalPageFormView from './view/PersonalPageFormView';
import PersonalPageButtonView from './view/PersonalPageButtonView';
import { DramaException } from '@nara-way/accent';
import { Button } from '@mui/material';

const PersonalPageFormContainer = observer(
  ({
    personalBookId,
    personalPageId,
    onClickCancel = () => undefined,
    onSuccess = () => undefined,
    onFail = () => undefined,
  }: {
    personalBookId?: string;
    personalPageId?: string;
    onClickCancel?: () => void;
    onSuccess?: () => void;
    onFail?: () => void;
  }) => {
    //
    const personalPageStateKeeper = useLocalObservable(() => PersonalPageStateKeeper.instance);
    const { personalPage } = personalPageStateKeeper;

    useEffect(() => {
      init();
    }, []);

    const init = () => {
      if (personalPageId) {
        personalPageStateKeeper.findPersonalPageById(personalPageId);
      } else if (personalBookId) {
        personalPageStateKeeper.init(personalBookId);
      }
    };

    const handleClickDefault = async () => {
      //
      if (!personalPage) {
        throw new DramaException('PersonalPageForm', 'personalPage should not be null.');
      }

      await personalPageStateKeeper.makeBasePersonalPage(personalPage);
      await init();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      //
      const { name, value } = event.target;

      personalPageStateKeeper.setPersonalPageProp(name, value);
    };

    const handleClickAddField = () => {
      //
      personalPageStateKeeper.addField();
    };

    const handleClickRemoveField = (index: number) => {
      //
      return personalPageStateKeeper.removeField(index);
    };

    const handleChangeField = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
      //
      const { name, value } = event.target;

      personalPageStateKeeper.setPersonalPageField(index, name, value);
    };

    const handleClickSave = async () => {
      //
      if (!personalPage) {
        throw new DramaException('PersonalPageForm', 'personalPage should not be null.');
      }

      const response = personalPageId ?
        await personalPageStateKeeper.modify(personalPageId, AddressPage.asNameValues(personalPage))
        : await personalPageStateKeeper.add(personalPage);

      if (response.failed) {
        onFail();
      } else {
        onSuccess();
      }
    };

    const handleClickRemove = async () => {
      //
      if (personalPageId) await personalPageStateKeeper.removePersonalPage(personalPageId);
    };

    return personalPage && (
      <>
        <PersonalPageFormView
          personalPage={personalPage}
          onClickDefault={handleClickDefault}
          onChange={handleChange}
          onChangeField={handleChangeField}
          onClickAddField={handleClickAddField}
          onClickRemoveField={handleClickRemoveField}
        />
        <PersonalPageButtonView
          onClickSave={handleClickSave}
          onClickCancel={onClickCancel}
          renderRemoveButton={personalPageId &&
            <Button size="large" variant="contained" onClick={handleClickRemove}>삭제</Button>}
        />
      </>
    );
  });

export default PersonalPageFormContainer;
