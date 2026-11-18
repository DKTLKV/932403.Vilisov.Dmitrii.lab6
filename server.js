const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Фиктивные данные (температура хранится в °C)
const weatherData = {
  'москва':   { city: 'Москва',   tempC: 23, condition: 'ясно' },
  'томск':   { city: 'Томск',   tempC: 15, condition: 'облачно' },
  'казань':    { city: 'Казань',    tempC: 27, condition: 'дождь' },
  'сыктывкар':  { city: 'Сыктывкар', tempC: 19, condition: 'солнечно' },
  'барнаул':   { city: 'Барнаул',   tempC: 17, condition: 'ветренно' },
};

// Логирование каждого запроса
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// Статика из public (index.html отдаётся на "/")
app.use(express.static(path.join(__dirname, 'public')));

// Маршруты страниц
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// API погоды
app.get('/api/weather/:city', (req, res) => {
  const key = req.params.city.toLowerCase().replace(/\s+/g, '');
  const data = weatherData[key];

  if (!data) {
    return res.status(404).json({ error: 'Город не найтен' });
  }

  const units = req.query.units === 'imperial' ? 'F' : 'C';
  const temp = units === 'F'
    ? Math.round((data.tempC * 9 / 5 + 32) * 10) / 10
    : data.tempC;

  res.json({ city: data.city, temp, units, condition: data.condition });
});

// 404 для всего остального
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});