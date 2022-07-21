import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import { PersonalPageList } from '../../../../comp';
import { Workspace, WorkspaceType } from '../../../../comp/view/shared/Types/Workspace';

export default {
  title: 'view/address/personal-book',
  component: PersonalPageList,
} as ComponentMeta<typeof PersonalPageList>;

const Template: ComponentStory<typeof PersonalPageList> = () => {
  //

  const availableDockSdo = JSON.parse('{"citizen":{"id":"1@1:1:1","name":"홍나라"},"pavilion":{"id":"1:1:1","name":"나라웨이"},"cinerooms":[{"audience":{"id":"1@1:1:1:3","name":"홍나라"},"cineroom":{"id":"1:1:1:1","name":"타운관리"},"current":false,"stages":[{"actor":{"id":"1@1:1:1:3-1","name":"홍나라"},"stage":{"id":"1:1:1:3-1","name":"타운"},"kollections":[{"kollection":{"id":"contact_1.0.0","name":"Contact"},"path":"contact","current":false,"kollecties":[{"path":"address-book","name":"주소록","requiredRoles":["owner"]}],"stageRoles":[{"stageId":"1:1:1:3-1","kollectionVersionId":"contact_1.0.0","code":"director","name":"관리자","dramaRoles":[{"code":"director","name":"관리자","defaultRole":false,"dramaId":"address-book"},{"code":"owner","name":"소유자","defaultRole":true,"dramaId":"address-book"}],"defaultRole":false},{"stageId":"1:1:1:3-1","kollectionVersionId":"contact_1.0.0","code":"owner","name":"소유자","dramaRoles":[{"code":"owner","name":"소유자","defaultRole":true,"dramaId":"address-book"}],"defaultRole":true}]}]}]}]}') as AvailableDockSdo;
  const cinerooms: Workspace[] = [
    ...availableDockSdo.cinerooms.map(value => ({ ...value.cineroom, type: WorkspaceType.Cineroom }))] || [];

  return (
    <PersonalPageList
      personalBookId="1@1:1:1"
      cinerooms={cinerooms}
    />
  );
};

export const list = Template.bind({});
list.args = {
//
};
