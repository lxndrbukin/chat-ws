const socket = new WebSocket('ws://localhost:3000/');
const form = document.querySelector('.chat-form');
const messages = document.querySelector('.chat-messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.querySelector('.chat-input');
  const payload = { type: 'msg', text: input.value };
  socket.send(JSON.stringify(payload));
});

socket.addEventListener('open', (e) => {
  console.log('WEBSOCKET OPENED');
});

socket.addEventListener('message', ({ data }) => {
  console.log(data);
  const li = document.createElement('li');
  const msg = JSON.parse(data).text;
  li.innerHTML = msg;
  messages.appendChild(li);
});
