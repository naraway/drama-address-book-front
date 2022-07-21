import { QueryRequest } from '@nara-way/accent';
import { AddressPage } from '../../../../aggregate';


class FindTeamPageQuery extends QueryRequest<AddressPage> {
  teamPageId: string;

  constructor(teamPageId: string) {
    super(AddressPage);
    this.teamPageId = teamPageId;
  }

  static fromDomain(domain: FindTeamPageQuery): FindTeamPageQuery {
    const query = new FindTeamPageQuery(
      domain.teamPageId,
    );

    query.setResponse(domain);
    return query;
  }

  static byQuery(teamPageId: string) {
    const query = new FindTeamPageQuery(
      teamPageId,
    );

    return query;
  }

}

export default FindTeamPageQuery;

