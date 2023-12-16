import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import SetCreatedBy from '../../../hooks/SetCreatedBy';
import CheckAndCreateChat from './hooks/CheckAndCreateChat';
import IncludeMessagesCount from './hooks/IncludeMessagesCount';
import SetDefaultItem from '../../../hooks/SetDefaultItem';
import { ACTIVE } from '../../../constants/Status';
import CreateBotMessage from './hooks/CreateBotMessage';
import IncludeBotResponse from './hooks/IncludeBotResponse';
import SetCreatedByQuery from '../../../hooks/SetCreatedByQuery';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [SetDefaultItem('status', ACTIVE), SetCreatedBy(), CheckAndCreateChat(), CreateBotMessage()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [IncludeMessagesCount(), IncludeBotResponse()],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
