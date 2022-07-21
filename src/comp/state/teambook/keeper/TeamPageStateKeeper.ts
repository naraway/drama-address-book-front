import {
  Address,
  AddressPage,
  AddTeamPageCommand,
  Field,
  FindTeamPageQuery,
  TeamBookFlowApiStub,
  TeamBookSeekApiStub,
  TeamPageCdo,
} from '../../../api';
import { makeAutoObservable, runInAction } from 'mobx';
import { CommandResponse, NameValueList, NotInstantiatedException } from '@nara-way/accent';
import _ from 'lodash';


class TeamPageStateKeeper {
  static _instance: TeamPageStateKeeper;

  private readonly teamBookFlowApiStub: TeamBookFlowApiStub;

  private readonly teamBookSeekApiStub: TeamBookSeekApiStub;

  teamPage: AddressPage | null = null;

  static get instance() {
    if (!TeamPageStateKeeper._instance) {
      TeamPageStateKeeper._instance = new TeamPageStateKeeper();
    }
    return TeamPageStateKeeper._instance;
  }

  constructor(
    teamBookFlowApiStub: TeamBookFlowApiStub = TeamBookFlowApiStub.instance,
    teamBookSeekApiStub: TeamBookSeekApiStub = TeamBookSeekApiStub.instance,
  ) {
    this.teamBookFlowApiStub = teamBookFlowApiStub;
    this.teamBookSeekApiStub = teamBookSeekApiStub;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  init(teamBookId: string) {
    this.teamPage = Object.assign(AddressPage.new(), { addressBookId: teamBookId });
  }

  setTeamPageProp(name: string, value: any) {
    if (!this.teamPage) {
      throw new NotInstantiatedException('TeamPageStateKeeper.setTeamPageProp', 'teamPage is null');
    }
    this.teamPage = Object.assign(AddressPage.new(), _.set(this.teamPage, name, value));
  }

  setTeamPageField(targetIndex: number, name: string, value: any) {
    if (!this.teamPage) {
      throw new NotInstantiatedException('TeamPageStateKeeper.setTeamPageField', 'teamPage is null');
    }

    const fields = this.teamPage.fields.map((field, index) =>
      targetIndex === index
        ? Object.assign(Field.new(), _.set(field, name, value))
        : field,
    );

    this.setTeamPageProp('fields', fields);
  }

  addField() {
    //
    if (!this.teamPage) {
      throw new NotInstantiatedException('TeamPageStateKeeper.addField', 'teamPage is null');
    }
    this.setTeamPageProp('fields', [...this.teamPage.fields, Field.new()]);
  }

  removeField(targetIndex: number) {
    //
    if (!this.teamPage) {
      throw new NotInstantiatedException('TeamPageStateKeeper.removeField', 'teamPage is null');
    }
    this.setTeamPageProp('fields', this.teamPage.fields.filter((field, index) => targetIndex !== index));
  }

  async register(teamPage: AddressPage): Promise<CommandResponse> {
    //
    const teamPageCdo = TeamPageCdo.new();
    teamPageCdo.teamBookId = teamPage.addressBookId;
    teamPageCdo.name = teamPage.name;
    teamPageCdo.phoneNumber = teamPage.phoneNumber;
    teamPageCdo.address = teamPage.address || Address.new();
    teamPageCdo.fields = teamPage.fields;

    const command = AddTeamPageCommand.new(teamPageCdo);

    return this.teamBookFlowApiStub.addTeamPage(teamPageCdo);
  }

  async modify(teamPageId: string, nameValues: NameValueList): Promise<CommandResponse> {

    return this.teamBookFlowApiStub.modifyTeamPage(teamPageId, nameValues);
  }

  async findTeamPageById(teamPageId: string): Promise<AddressPage> {
    //
    const teamPageQuery = FindTeamPageQuery.byQuery(teamPageId);
    const teamPage = await this.teamBookSeekApiStub.findTeamPage(teamPageQuery);

    runInAction(() => this.teamPage = teamPage);
    return teamPage;
  }

  async makeBaseTeamPage(teamPage: AddressPage): Promise<CommandResponse> {
    //
    return this.teamBookFlowApiStub.makeBaseTeamPage(teamPage.addressBookId, teamPage.id);
  }

  async removeTeamPage(teamPageId: string): Promise<CommandResponse> {
    //
    return this.teamBookFlowApiStub.removeTeamPage(teamPageId);
  }

}

export default TeamPageStateKeeper;
