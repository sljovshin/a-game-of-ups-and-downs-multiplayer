let socket = io('/');
let _room = '';
let _player = null;
const loaderModal = document.getElementById('loaderModal');
const header = document.getElementById('header');
const jonSnow_portrait = document.getElementById('jonsnow_portrait');
const danny_portrait = document.getElementById('danarys_portrait');
const ctaText = document.getElementById('ctaText');
const cta = document.getElementById('cta');
const ctabox = document.getElementById('ctaBox');
const dannyTitle = document.getElementById('dannyTitle');
const jonTitle = document.getElementById('jonTitle');
const bg = document.getElementById('bg');

cta.addEventListener('click', () => {
    cta.innerText = 'waiting';
    sendPlayerReady()
})

function sendPlayerReady() {
    socket.emit('player-ready');
}

socket.on('welcomeToRoom', setRoom);

socket.on('start-game', (destination) => {
    window.location.href = destination;
});

function setRoom(room, id) {
    _room = room;
    updateRoomDisplay(id);
    _player = id;
}

function updateRoomDisplay(id) {
    loaderModal.style.display = 'none';
    header.style.display = 'block';
    heroAssigned(id);
}

function heroAssigned(id) {
    if(id === 1) {
        danny_portrait.classList.remove('selected');
        cta.classList.remove('dannySelected_cta');
        ctabox.classList.remove('dannySelected_box')
        cta.classList.add('jonSelected_cta');
        ctabox.classList.add('jonSelected_box');
        jonTitle.innerText = 'You';
        dannyTitle.innerText = 'Opponent'
    } else {
        jonSnow_portrait.classList.remove('selected');
        cta.classList.remove('jonSelected_cta');
        ctabox.classList.remove('jonSelected_box');
        cta.classList.add('dannySelected_cta');
        ctabox.classList.add('dannySelected_box');
        dannyTitle.innerText = 'You';
        jonTitle.innerText = 'Opponent';
        bg.style.backgroundPosition = 'right';
    }
    ctaText.innerText = 'play';
}

/*
let roomDisplay = document.getElementById('roomDisplay');
let bt = document.getElementById('bt');
bt.addEventListener('click', emitToRoom);

socket.on('welcome', updateRoomDisplay);
socket.on('inc-hello-room', (msg) => {
    console.log(msg);
    
})



function emitToRoom() {
    socket.emit('hello-room', _room, 'Hello room!')
}*/