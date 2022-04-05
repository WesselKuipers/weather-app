# Basic Weather App

This repository contains a simple SPA that displays the current weather in your location as well as forecast for the next 5 days.

This app is built using [Vite](https://vitejs.dev/) with [React 18](https://reactjs.org/).

A live demo can be found [here](https://weather-app-wesselkuipers.vercel.app/).

## Setup

In order to run this application locally, you will need to obtain an API key from [OpenWeatherMap](https://home.openweathermap.org/users/sign_up) and including it in `.env.local`:

```
VITE_API_KEY=YOUR_API_KEY
```

After that you can run the following command to install your dependencies and start up the development server:

```
npm ci
npm run dev
```

By default the app will require a valid API key as well as an active internet connection.
