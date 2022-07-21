import { AddressPage, FindTeamPagesByOffsetQuery, TeamBookSeekApiStub } from '../../../api';
import { makeAutoObservable, runInAction } from 'mobx';
import { Offset } from '@nara-way/accent';
import _ from 'lodash';

class TeamPagesStateKeeper {
  static _instance: TeamPagesStateKeeper;

  private readonly teamBookSeekApiStub: TeamBookSeekApiStub;

  teamPages: AddressPage[] = [];

  offset: Offset = Offset.newDescending(0, 12, 'registrationTime');

  totalCount = 0;

  teamBookId = '';

  static get instance() {
    if (!TeamPagesStateKeeper._instance) {
      TeamPagesStateKeeper._instance = new TeamPagesStateKeeper();
    }
    return TeamPagesStateKeeper._instance;
  }

  constructor(
    teamBookSeekApiStub: TeamBookSeekApiStub = TeamBookSeekApiStub.instance,
  ) {
    this.teamBookSeekApiStub = teamBookSeekApiStub;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setOffsetProp(name: string, value: any) {
    this.offset = Object.assign(new Offset(), _.set(this.offset, name, value));
  }

  setTeamBookId(teamBookId: string) {
    //
    this.teamBookId = teamBookId;
  }

  changePage(page: number) {
    //
    const { limit } = this.offset;
    this.offset = Object.assign(new Offset(), _.set(this.offset, 'offset', limit * (page - 1)));
  }

  async findTeamPages(teamBookId: string): Promise<AddressPage[]> {
    //
    const query = FindTeamPagesByOffsetQuery.byQuery(teamBookId);
    query.offset = this.offset;
    const offsetElementList = await this.teamBookSeekApiStub.findTeamPagesByOffset(query);

    runInAction(() => {
      this.teamPages = offsetElementList.results;
      this.totalCount = offsetElementList.totalCount;
    });

    return this.teamPages;
  }
}

export default TeamPagesStateKeeper;
