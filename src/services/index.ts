import { Application } from '../declarations';
import v1 from './v1';


import v1Chat from './v1/chat/chat.service';


import v1Message from './v1/message/message.service';


// Don't remove this comment. It's needed to format import lines nicely.
export default function (app: Application): void {
    app.configure(v1);

    app.configure(v1Chat);
    app.configure(v1Message);
}
