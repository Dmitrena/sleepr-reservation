describe('Reservations', () => {
  let jwt: string;
  beforeAll(async () => {
    const user = {
      email: 'sleeprmailer@gnail.com',
      password: 'StrongPassword123!@',
    };
    await fetch('http://auth:3001/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await fetch('http://auth:3001/auth/login/', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const authCookie = response.headers
      .get('set-cookie')
      .match(/Authentication=(.*?);/)[1];
    jwt = authCookie;
  });
  test('Create & Get', async () => {
    const createdReservation = await createReservation();

    const responseGet = await fetch(
      `http://reservations:3333/reservations/${createdReservation._id}`,
      {
        headers: {
          Authentication: jwt,
        },
      },
    );
    const reservations = await responseGet.json();
    expect(createdReservation).toEqual(reservations);
  });
  const createReservation = async () => {
    const responseCreate = await fetch(
      'http://reservations:3333/reservations/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authentication: jwt,
        },
        body: JSON.stringify({
          startDate: '02-04-2023',
          endDate: '06-04-2023',
          placeId: '493',
          invoiceId: '493',
          charge: {
            amount: 10312,
            card: {
              cvc: '413',
              exp_month: 12,
              exp_year: 2027,
              number: '4242 4242 4242 4242',
            },
          },
        }),
      },
    );
    expect(responseCreate.ok).toBeTruthy();
    return responseCreate.json();
  };
});
