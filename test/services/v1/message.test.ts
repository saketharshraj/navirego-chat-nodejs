import app from '../../../src/app';

describe('\'v1/message\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/message');
    expect(service).toBeTruthy();
  });
});
