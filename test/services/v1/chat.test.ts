import app from '../../../src/app';

describe('\'v1/chat\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/chat');
    expect(service).toBeTruthy();
  });
});
