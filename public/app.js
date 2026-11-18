const btn = document.getElementById('btn');
const result = document.getElementById('result');

btn.addEventListener('click', async () => {
  const city = document.getElementById('city').value.trim();
  const units = document.getElementById('units').value;
  if (!city) return;

  try {
    const res = await fetch(`/api/weather/${encodeURIComponent(city)}?units=${units}`);
    const data = await res.json();
    result.textContent = res.ok
      ? `${data.city}: ${data.temp}°${data.units}, ${data.condition}`
      : `Ошибка: ${data.error}`;
  } catch {
    result.textContent = 'Нет соединения с сервером (офлайн)';
  }
});

// Регистрация service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('SW registered:', reg.scope))
      .catch(err => console.error('SW error:', err));
  });
}