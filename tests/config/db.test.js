jest.mock('oracledb', () => ({
  getConnection: jest.fn(() => {
    throw new Error('Mocked connection error');
  })
}));

const { getConnection } = require('../../config/db');

describe('db connection', () => {
  test('getConnection debería lanzar error si falla la conexión', async () => {
    await expect(getConnection()).rejects.toThrow('Mocked connection error');
  });
});
