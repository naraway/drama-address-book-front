import React, { useEffect } from 'react';
import { observer, useLocalObservable } from 'mobx-react';
import PersonalPageDetailView from './view/PersonalPageDetailView';
import { PersonalPageStateKeeper } from '../../../state';
import { DramaException } from '@nara-way/accent';

const PersonalPageDetailContainer = observer(
  ({
    personalPageId,
  }: {
    personalPageId: string
  }) => {
    //
    const personalPageStateKeeper = useLocalObservable(() => PersonalPageStateKeeper.instance);
    const { personalPage } = personalPageStateKeeper;

    useEffect(() => {
      init();
    }, []);

    const init = () => {
      personalPageStateKeeper.findPersonalPageById(personalPageId);
    };

    const handleClickDefault = async () => {
      //
      if (!personalPage) {
        throw new DramaException('PersonalPageDetail', 'personalPage should not be null.');
      }

      await personalPageStateKeeper.makeBasePersonalPage(personalPage);
      init();
    };

    return personalPage && (
      <PersonalPageDetailView
        personalPage={personalPage}
        onClickDefault={handleClickDefault}
      />
    );
  });

export default PersonalPageDetailContainer;
