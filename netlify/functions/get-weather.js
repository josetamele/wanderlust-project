const fetch = require('node-fetch'); //node-fetch is dependency

exports.handler = async (event) => {
  const { lat, lon, city } = event.queryStringParameters;
  const API_KEY = process.env.WEATHER_API_KEY; // Netlify injects this here
  
  let url;
  if (city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
  } else {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed fetching weather' }) };
  }
};