# Basic Weather App

[![Tests](https://github.com/WesselKuipers/weather-app/workflows/Tests/badge.svg)](https://github.com/WesselKuipers/weather-app/actions)
![Vercel](https://vercelbadge.vercel.app/api/WesselKuipers/weather-app)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

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

By default the app will require a valid API key as well as an active internet connection. To allow for offline development, you can set the property `VITE_API_MOCK` in `.env` to `true`. Doing so will enable a worker that will replace all API calls with a mocked response based on the responses found in `./utils/fixtures/[response].json`.

To build for production, use:
```
npm run build
```
