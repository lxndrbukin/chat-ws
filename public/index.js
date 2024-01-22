const socket = new WebSocket('ws://localhost:5000');
const form = document.querySelector('.chat-form');
const messages = document.querySelector('.chat-messages');
const username = prompt('Please enter a username:');

socket.addEventListener('open', () => {
  console.log('WEBSOCKET OPENED');
});

const sendMessage = () => {
  const input = document.querySelector('.chat-input');
  const payload = {
    username,
    type: 'message',
    text: input.value,
    sentAt: getTime(),
  };
  socket.send(JSON.stringify(payload));
  input.value = '';
};

const getTime = () => {
  const date = new Date();
  const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const m =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${h}:${m}`;
};

const renderMessage = (data) => {
  const { text, username, currentUser, sentAt } = JSON.parse(data);

  const msgDiv = document.createElement('div');

  const topRow = document.createElement('div');
  topRow.classList.add('chat-message-top');

  const usernameSpan = document.createElement('span');
  usernameSpan.classList.add('chat-message-username');
  usernameSpan.innerText = username;
  topRow.appendChild(usernameSpan);

  const timeSpan = document.createElement('span');
  timeSpan.classList.add('chat-message-time');
  timeSpan.innerText = sentAt;
  topRow.appendChild(timeSpan);

  const textSpan = document.createElement('span');
  textSpan.classList.add('chat-message-text');
  textSpan.innerHTML = text;

  msgDiv.appendChild(topRow);
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
