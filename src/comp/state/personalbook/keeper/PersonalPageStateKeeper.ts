import { CommandResponse, NameValueList, NotInstantiatedException } from '@nara-way/accent';
import { makeAutoObservable, runInAction } from 'mobx';
import _ from 'lodash';
import {
  Address,
  AddressPage,
  Field,
  FindPersonalPageQuery,
  PersonalBookFlowApiStub,
  PersonalBookSeekApiStub,
  PersonalPageCdo,
} from '../../../api';


class PersonalPageStateKeeper {
  static _instance: PersonalPageStateKeeper;

  private readonly personalBookFlowApiStub: PersonalBookFlowApiStub;

  private readonly personalBookSeekApiStub: PersonalBookSeekApiStub;

  personalPage: AddressPage | null = null;

  static get instance() {
    if (!PersonalPageStateKeeper._instance) {
      PersonalPageStateKeeper._instance = new PersonalPageStateKeeper();
    }
    return PersonalPageStateKeeper._instance;
  }

  constructor(
    personalBookFlowApiStub: PersonalBookFlowApiStub = PersonalBookFlowApiStub.instance,
    personalBookSeekApiStub: PersonalBookSeekApiStub = PersonalBookSeekApiStub.instance,
  ) {
    this.personalBookFlowApiStub = personalBookFlowApiStub;
    this.personalBookSeekApiStub = personalBookSeekApiStub;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  init(personalBookId: string) {
    this.personalPage = Object.assign(AddressPage.new(), { addressBookId: personalBookId });
  }

  setPersonalPageProp(name: string, value: any) {
    if (!this.personalPage) {
      throw new NotInstantiatedException('PersonalPageStateKeeper.setPersonalPageProp', 'personalPage is null');
    }
    this.personalPage = Object.assign(AddressPage.new(), _.set(this.personalPage, name, value));
  }

  setPersonalPageField(targetIndex: number, name: string, value: any) {
    if (!this.personalPage) {
      throw new NotInstantiatedException('PersonalPageStateKeeper.setPersonalPageField', 'personalPage is null');
    }

    const fields = this.personalPage.fields.map((field, index) =>
      targetIndex === index
        ? Object.assign(Field.new(), _.set(field, name, value))
        : field,
    );

    this.setPersonalPageProp('fields', fields);
  }

  addField() {
    //
    if (!this.personalPage) {
      throw new NotInstantiatedException('PersonalPageStateKeeper.addField', 'addrespersonalPagesPage is null');
    }
    this.setPersonalPageProp('fields', [...this.personalPage.fields, Field.new()]);
  }

  removeField(targetIndex: number) {
    //
    if (!this.personalPage) {
      throw new NotInstantiatedException('PersonalPageStateKeeper.removeField', 'personalPage is null');
    }
    this.setPersonalPageProp('fields', this.personalPage.fields.filter((field, index) => targetIndex !== index));
  }

  clear() {
    this.personalPage = null;
  }

  async add(personalPage: AddressPage): Promise<CommandResponse> {
    const personalPageCdo = PersonalPageCdo.new();
    personalPageCdo.personalBookId = personalPage.addressBookId;
    personalPageCdo.name = personalPage.name;
    personalPageCdo.phoneNumber = personalPage.phoneNumber;
    personalPageCdo.address = personalPage.address || Address.new();
    personalPageCdo.fields = personalPage.fields;


    return this.personalBookFlowApiStub.addPersonalPage(personalPageCdo);
  }

  async modify(personalPageId: string, nameValues: NameValueList): Promise<CommandResponse> {

    return this.personalBookFlowApiStub.modifyPersonalPage(personalPageId, nameValues);
  }

  async findPersonalPageById(personalPageId: string): Promise<AddressPage> {
    //
    const personalPageQuery = FindPersonalPageQuery.byQuery(personalPageId);
    const personalPage = await this.personalBookSeekApiStub.findPersonalPage(personalPageQuery);

    runInAction(() => this.personalPage = personalPage);
    return personalPage;
  }


  async makeBasePersonalPage(personalPage: AddressPage): Promise<CommandResponse> {
    //
    return this.personalBookFlowApiStub.makeBasePersonalPage(personalPage.addressBookId, personalPage.id);
  }

  async copyPersonalPageFromTeamBook(personalPageId: string, teamBookId: string): Promise<CommandResponse> {

    return this.personalBookFlowApiStub.copyPersonalPageFromTeamBook(personalPageId, teamBookId);
  }

  async removePersonalPage(personalPageId: string): Promise<CommandResponse> {
    //
    return this.personalBookFlowApiStub.removePersonalPage(personalPageId);
  }
}

export default PersonalPageStateKeeper;
