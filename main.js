const time = document.getElementById('time'),
    date = document.getElementById('date');
    greeting = document.getElementById('greeting'),
    names = document.getElementById('name'),
    focus = document.getElementById('focus');

var night = ['./assets/night1.jpg', './assets/night2.jpg', './assets/night3.jpg', './assets/night4.jpg', './assets/night5.jpg', './assets/night6.jpg'],
    morning = ['./assets/morning1.jpg', './assets/morning2.jpg', 'assets/morning3.jpg', './assets/morning4.jpg', './assets/morning5.jpg', './assets/morning6.jpg'],
    afternoon = ['./assets/day1.jpg', './assets/day2.jpg', './assets/day3.jpg', './assets/day4.jpg', './assets/day5.jpg', './assets/day6.jpg'],
    evening = ['./assets/evening1.jpg', './assets/evening2.jpg', './assets/evening3.jpg', './assets/evening4.jpg', './assets/evening5.jpg', './assets/evening6.jpg'],
    weekDays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.btn');

let count = 0;

if(localStorage.getItem('count')) {
    count = parseInt(localStorage.getItem('count'));
} else {
    count = 0;
}

async function getQuote() {  
    const url = `https://type.fit/api/quotes`;
    const res = await fetch(url);
    const data = await res.json(); 
    count++;
    blockquote.textContent = data[count].text;
    figcaption.textContent = data[count].author;
    localStorage.setItem('count', count);
}


document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);

function showTime() {
    let today = new Date(), 
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();
        weekDay = today.getDay();
        day = today.getDate();
        month = today.getMonth();

        time.innerHTML = `${hour}<span>:</span>${addZeros(min)}<span>:</span>${addZeros(sec)}`;
        date.innerHTML = `${weekDays[weekDay]}<span>, </span>${day}<span> of </span>${months[month]}`;

        setTimeout(showTime, 1000);
}

function addZeros(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function viewBgImage(src) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        document.body.style.backgroundImage = `url(${src})`;
    };
}

function getImage(arr) {
    index = Math.floor(Math.random() * 6);
    const imageSrc = arr[index];
    viewBgImage(imageSrc);
    
}
    
function setBgGreet() {
    let today = new Date(),
    hour = today.getHours();
    
    if (hour < 6) {
    getImage(night);
    greeting.textContent = 'Good Night, '
    } else if (hour < 12) {
    getImage(morning);
    greeting.textContent = 'Good Morning, ';
    } else if (hour < 18) {
    getImage(afternoon);
    greeting.textContent = 'Good Afternoon, ';
    } else {
    getImage(evening);
    greeting.textContent = 'Good Evening, ';
    }

    setTimeout(setBgGreet, 3600000);
}

function getName() {
    if(localStorage.getItem('name') === null) {
        names.textContent = '[Enter name]';
    } else {
        names.textContent = localStorage.getItem('name');
    }
}

function clearName() {
    names.textContent = '';
}

function setName(e) {
    if(e.type === 'keypress') {
        if(e.which == 13 || e.keyCode == 13) {
            if(names.textContent == '') {
                names.textContent = localStorage.getItem('name', e.target.innerText);
                names.blur();
            } else {
                localStorage.setItem('name', e.target.innerText);
                names.blur();
            }
        }
    } else {
        if(names.textContent == '') {
            names.textContent = localStorage.getItem('name', e.target.innerText);
            names.blur();
        } else {
            localStorage.setItem('name', e.target.innerText);
        }
    }
}

function getFocus() {
    if(localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

function clearFocus() {
    focus.textContent = '';
}

function setFocus(e) {
    if(e.type === 'keypress') {
        if(e.which == 13 || e.keyCode == 13) {
            if(focus.textContent == '') {
                focus.textContent = localStorage.getItem('focus', e.target.innerText);
                focus.blur();
            } else {
                localStorage.setItem('focus', e.target.innerText);
                focus.blur();
            }
        }
    } else {
        if(focus.textContent == '') {
            focus.textContent = localStorage.getItem('focus', e.target.innerText);
            focus.blur();
        } else {
            localStorage.setItem('focus', e.target.innerText);
        }
    }
}

//https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=en&appid=d3cf041d9ed9b54de96a63729e745ee3&units=metric

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 
   

    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
}

function setCity(event) {
    if (event.code === 'Enter') {
        getWeather();
        city.blur();
    }
}

getWeather();

city.addEventListener('keypress', setCity);
city.addEventListener('click', setCity);
city.addEventListener('blur', setCity);

names.addEventListener('keypress', setName);
names.addEventListener('blur', setName);

focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

showTime();
setBgGreet();
getName();
getFocus();