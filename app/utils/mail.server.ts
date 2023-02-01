const MAILTRAP_API = process.env.MAILTRAP_API;
if (!MAILTRAP_API) {
  throw new Error('MAILTRAP_API must be set');
}

function sendMail(body: string) {
  return fetch('https://send.api.mailtrap.io/api/send', {
    method: 'post',
    headers: {
      Authorization: `Bearer ${MAILTRAP_API}`,
      'Content-Type': 'application/json',
    },
    body,
  });
}

export  {
  sendMail,
};
