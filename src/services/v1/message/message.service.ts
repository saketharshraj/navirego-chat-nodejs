// Initializes the `v1/message` service on path `/v1/message`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Message } from './message.class';
import createModel from './message.model';
import hooks from './message.hooks';
import UpdateMessageCountInChat from './events/UpdateMessageCountInChat';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'v1/message': Message & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/v1/message', new Message(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/message');
  service.on('created', UpdateMessageCountInChat);

  service.hooks(hooks);
}
