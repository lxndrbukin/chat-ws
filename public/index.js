const socket = new WebSocket('ws://localhost:5000');
const form = document.querySelector('.chat-form');
const messages = document.querySelector('.chat-messages');
const username = prompt('Please enter a username:');

socket.addEventListener('open', () => {
  console.log('WEBSOCKET OPENED');
});

const sendMessage = () => {
  const input = document.querySelector('.chat-input');
  const payload = { username, type: 'message', text: input.value };
  socket.send(JSON.stringify(payload));
  input.value = '';
};

const renderMessage = (data) => {
  const { text, username, currentUser } = JSON.parse(data);
  const msgDiv = document.createElement('div');
  const usernameSpan = document.createElement('span');
  usernameSpan.classList.add('chat-message-username');
  usernameSpan.innerText = username;
  const textSpan = document.createElement('span');
  textSpan.classList.add('chat-message-text');
  textSpan.innerHTML = text;
  msgDiv.appendChild(usernameSpan);
  msgDiv.appendChild(textSpan);
  msgDiv.classList.add('chat-message');
  if (currentUser) msgDiv.classList.add('current-user');
  messages.appendChild(msgDiv);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  sendMessage();
});

socket.addEventListener('message', ({ data }) => {
  renderMessage(data);
});
