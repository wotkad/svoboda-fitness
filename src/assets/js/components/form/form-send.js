export default function sendMail(selector) {
  let formData = new FormData($(selector).get(0));
  return fetch('./assets/files/mail.php', {
    method: 'POST',
    body: formData
  });
};