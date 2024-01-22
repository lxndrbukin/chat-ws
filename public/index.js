const socket = new WebSocket('ws://localhost:3000/');
const form = document.querySelector('.chat-form');
const messages = document.querySelector('.chat-messages');
const username = prompt('Enter a username');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.querySelector('.chat-input');
  const payload = { username, type: 'msg', text: input.value };
  socket.send(JSON.stringify(payload));
});

socket.addEventListener('open', (e) => {
  console.log('WEBSOCKET OPENED');
});

socket.addEventListener('message', ({ data }) => {
  console.log(data);
  const { text, username } = JSON.parse(data);
  const li = document.createElement('li');
  li.innerHTML = `<b>${username}:</b> ${text}`;
  messages.appendChild(li);
});
