const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
if (!MAILGUN_DOMAIN) {
  throw new Error('MAILGUN_DOMAIN must be set');
}

const MAILGUN_API = process.env.MAILGUN_API;
if (!MAILGUN_API) {
  throw new Error('MAILGUN_API must be set');
}

function sendMail(body: URLSearchParams) {
  const auth = Buffer.from(`api:${MAILGUN_API}`).toString('base64');

  return fetch(`https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`, {
    method: 'post',
    headers: {
      Authorization: `Basic ${auth}`,
    },
    body,
  });
}

export  {
  sendMail,
};
