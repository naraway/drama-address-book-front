import { CommandRequest, CommandType } from '@nara-way/accent';


class RemovePersonalBookCommand extends CommandRequest {
  personalBookId: string;

  constructor(personalBookId: string) {
    super(CommandType.UserDefined);
    this.personalBookId = personalBookId;
  }

  static new(personalBookId: string) {
    const command = new RemovePersonalBookCommand(
      personalBookId,
    );

    return command;
  }

}

export default RemovePersonalBookCommand;

