# 🎄 Entur-Jul - Polar Express til Julaften

A festive Christmas countdown website styled as Entur (Norwegian public transport) pages and apps. Track your journey from the office to Christmas Eve aboard the Polar Express, follow Santa's sleigh in real time, and read a new (fake) traffic deviation every day! 🚂✨

## 📖 About

The site is built like the Entur app: a bottom tab bar switches between five pages, and the site rotates through them automatically (5 minutes per page) so it works as an office info screen.

| Tab | Page | Styled like |
|-----|------|-------------|
| Forside | **Juleruta** – the journey from "Kontoret" to "Julaften" with advent stops, today's deviation and a ticket panel | entur.no "Detaljer om reisen" |
| Avganger | **Juletavla** – the countdown plus a departure board with Christmas departures, deviations and string lights | Entur Tavla |
| Billetter | **Billetter** – the Christmas ticket with countdown, QR code and ticket inspection view | Entur app tickets |
| Kart | **Sanntid i kart** – live tracking of Santa's sleigh from the North Pole on Christmas Eve | Entur app real-time map |
| Profil | **Min profil** – Santa's profile with travel statistics | Entur app profile |

## ✨ Features

- 🕐 **Two-phase countdown** – counts down to the first Sunday of Advent, then to Christmas Eve (24. desember). The first Sunday of Advent is calculated for every year.
- 🚧 **Daily deviation messages** – a funny traffic deviation every day (its own for each day December 1–24), shown with Linje's Alert components
- 🛷 **Live sleigh tracking** – on Christmas Eve the sleigh flies a timed route from the North Pole via Norway and around the world
- 🔁 **Carousel** – pages rotate every 5 minutes; tapping a tab jumps there and restarts the timer, and the rotation can be paused
- ❄️ **Snow and Christmas lights** – with `prefers-reduced-motion` respected
- 🎨 **Entur Design System** – Linje components and tokens throughout
- 📱 **Responsive** – works on phones, desktops and large office screens

## 🔗 URL parameters

| Parameter | Example | Effect |
|-----------|---------|--------|
| `side` | `?side=kart` | Start on a specific page (`forside`, `avganger`, `billetter`, `kart`, `profil`) |
| `intervall` | `?intervall=10` | Seconds per page in the carousel (default 300) |
| `dato` | `?dato=2026-12-24T17:20` | Pretend it is another date/time, for testing |

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/stunor92/Entur-Jul.git
cd Entur-Jul
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Tests

Run the unit tests (date logic, deviation messages and sleigh route):
```bash
npm test
```

### Build

Create a production build:
```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🛠️ Technology Stack

- **React 19** – UI framework
- **Vite** – Build tool and development server
- **Vitest** – Unit tests
- **Leaflet / react-leaflet** – Map with OpenStreetMap tiles
- **Entur Design System (Linje)**
  - `@entur/alert` – BannerAlertBox/SmallAlertBox for deviation messages
  - `@entur/button`, `@entur/chip`, `@entur/form`, `@entur/tab` – Components
  - `@entur/icons` – Icon library
  - `@entur/layout` – Layout components and badges
  - `@entur/tokens` – Design tokens (colors, transport colors)
  - `@entur/travel` – Travel components (TravelHeader, TravelTag)
  - `@entur/typography` – Typography and the Nationale font

## 📁 Project Structure

```
Entur-Jul/
├── src/
│   ├── App.jsx              # Tabs, carousel and page switching
│   ├── App.css              # Global styles and Entur style imports
│   ├── main.jsx             # Application entry point
│   ├── pages/               # One page per tab
│   │   ├── Juleruta.jsx     # Forside
│   │   ├── Avgangstavle.jsx # Avganger
│   │   ├── Billett.jsx      # Billetter
│   │   ├── Kart.jsx         # Kart
│   │   └── Profil.jsx       # Profil
│   ├── components/          # TabBar, Countdown, Snowfall, EnturLogo
│   └── lib/
│       ├── christmas.js     # Advent/Christmas dates and countdown
│       ├── avvik.js         # Daily deviation messages
│       ├── sleigh.js        # Santa's route and live position
│       ├── useCarousel.js   # Page rotation
│       └── useNow.js        # Ticking clock (supports ?dato=)
├── index.html
├── vite.config.js
└── package.json
```

## 📜 Available Scripts

- `npm run dev` – Start development server on port 3000
- `npm test` – Run unit tests
- `npm run build` – Build for production
- `npm run preview` – Preview production build locally

## 🌐 Language

The application is in Norwegian (Bokmål) to match the Entur brand experience.

## 📄 License

ISC

## 👨‍💻 Author

Created with ❤️ for spreading Christmas joy!

---

**God Jul! 🎄✨**
