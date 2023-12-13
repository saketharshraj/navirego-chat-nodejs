import app from '../../../src/app';

describe('\'v1/upload-file\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/upload-file');
    expect(service).toBeTruthy();
  });
});
