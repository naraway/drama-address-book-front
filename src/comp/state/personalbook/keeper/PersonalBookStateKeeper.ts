import { CommandResponse, NameValueList, NotInstantiatedException } from '@nara-way/accent';
import _ from 'lodash';
import { makeAutoObservable, runInAction } from 'mobx';
import {
  AddressBook,
  FindPersonalBookQuery,
  PersonalBookCdo,
  PersonalBookFlowApiStub,
  PersonalBookSeekApiStub,
} from '../../../api';


class PersonalBookStateKeeper {
  static _instance: PersonalBookStateKeeper;

  private readonly personalBookFlowApiStub: PersonalBookFlowApiStub;

  private readonly personalBookSeekApiStub: PersonalBookSeekApiStub;

  personalBook: AddressBook | null = null;

  static get instance() {
    if (!PersonalBookStateKeeper._instance) {
      PersonalBookStateKeeper._instance = new PersonalBookStateKeeper();
    }
    return PersonalBookStateKeeper._instance;
  }

  constructor(
    personalBookFlowApiStub: PersonalBookFlowApiStub = PersonalBookFlowApiStub.instance,
    personalBookSeekApiStub: PersonalBookSeekApiStub = PersonalBookSeekApiStub.instance,
  ) {
    this.personalBookFlowApiStub = personalBookFlowApiStub;
    this.personalBookSeekApiStub = personalBookSeekApiStub;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  init() {
    this.personalBook = AddressBook.new();
  }

  setPersonalBookProp(name: string, value: any) {
    if (!this.personalBook) {
      throw new NotInstantiatedException('PersonalBookStateKeeper.setPersonalBookProp', 'personalBook is null');
    }
    this.personalBook = _.set(this.personalBook, name, value);
  }

  clear() {
    this.personalBook = null;
  }

  async register(personalBookCdo: PersonalBookCdo): Promise<CommandResponse> {
    return this.personalBookFlowApiStub.registerPersonalBook(personalBookCdo);
  }

  async modify(personalBookId: string, nameValues: NameValueList): Promise<CommandResponse> {
    return this.personalBookFlowApiStub.modifyPersonalBook(personalBookId, nameValues);
  }

  async findPersonalAddressBookById(personalBookId: string): Promise<AddressBook> {
    const personalBookQuery = FindPersonalBookQuery.byQuery(personalBookId);
    const personalBook = await this.personalBookSeekApiStub.findPersonalBook(personalBookQuery);

    runInAction(() => this.personalBook = personalBook);
    return personalBook;
  }
}

export default PersonalBookStateKeeper;
