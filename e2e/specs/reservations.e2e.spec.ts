describe('Reservations', () => {
  beforeAll(async () => {
    const user = {
      email: 'sleeprmailer@gnail.com',
      password: 'StrongPassword123!@',
    };
    await fetch('http://auth:3001', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  });
  test('Create', () => {});
});