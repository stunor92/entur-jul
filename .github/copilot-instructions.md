# Entur-Jul - GitHub Copilot Instructions

## Project Overview

Entur-Jul is a Norwegian Christmas countdown website styled as Entur pages and apps. A bottom tab bar (like the Entur app) switches between five pages, and the site rotates through them every 5 minutes: Forside (Juleruta – journey details), Avganger (Juletavla – departure board), Billetter (app ticket), Kart (live map of Santa's sleigh) and Profil (Santa's profile). It counts down to the first Sunday of Advent and then to Christmas Eve, and shows one funny deviation message (avvik) per day using Linje's Alert components. The countdown lives on the Avganger page.

**Tech Stack:**
- React 19.2.0
- Vite 7.2.2 (build tool)
- Entur Design System components (@entur/* packages)
- Leaflet / react-leaflet (map, OpenStreetMap tiles)
- Vitest (unit tests)
- Norwegian language (no-NO)

**Purpose:** Display a festive countdown to Christmas Eve with a travel-themed UI using Entur's design system.

## Project Structure

```
/
├── src/
│   ├── App.jsx          # Tabs, carousel and page switching
│   ├── App.css          # Global styles and Entur style imports
│   ├── main.jsx         # React application entry point
│   ├── pages/           # One page per tab (Juleruta, Avgangstavle, Billett, Kart, Profil)
│   ├── components/      # TabBar, Countdown, Snowfall, EnturLogo
│   └── lib/             # christmas.js, avvik.js, sleigh.js, useCarousel.js, useNow.js (+ *.test.js)
├── index.html           # HTML entry point
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies and scripts
└── .github/
    └── copilot-instructions.md  # This file
```

## Development Guidelines

### Code Style and Conventions

1. **Language:** All user-facing text must be in Norwegian (Bokmål)
2. **Component Structure:** Use functional React components with hooks
3. **Formatting:** Follow existing code style (2-space indentation, semicolons)
4. **Icons:** Use icons from `@entur/icons` package when needed
5. **Typography:** Use typography components from `@entur/typography` (Heading1, Heading2, Heading3, Paragraph, Label)
6. **UI Components:** Prefer Entur design system components over custom implementations

### Key Technical Details

1. **Date Handling (`src/lib/christmas.js`):**
   - Phases: `before-advent` (count down to the first Sunday of Advent) → `advent` (count down to Christmas Eve, Dec 24 00:00) → `christmas` (Dec 24–26) → next year
   - The first Sunday of Advent is calculated per year
   - Use Norwegian locale (nb-NO) for date formatting

2. **Time and URL parameters:**
   - `useNow` ticks every second; `?dato=YYYY-MM-DDTHH:mm` simulates another date
   - `?side=<key>` picks the start page, `?intervall=<seconds>` sets the carousel interval

3. **Santa's sleigh (`src/lib/sleigh.js`):** a timed route on Christmas Eve; the position is interpolated between stops

4. **Deviation messages (`src/lib/avvik.js`):** one per day; use Linje Alert variants `information`, `success`, `warning`, `negative`

5. **Responsive Design:**
   - Mobile-first approach
   - Use Entur's responsive components

### Available npm Scripts

```bash
npm run dev       # Start development server on port 3000
npm run build     # Build for production (outputs to dist/)
npm run preview   # Preview production build
npm test          # Run unit tests (Vitest)
```

### Development Workflow

1. **Starting development:**
   ```bash
   npm install
   npm run dev
   ```

2. **Building:**
   ```bash
   npm run build
   ```

3. **Before committing:**
   - Ensure `npm run build` succeeds
   - Test countdown functionality
   - Verify Norwegian text is correct
   - Check responsive behavior

## Dependencies

### Main Dependencies
- `react` and `react-dom`: Core React libraries
- `@entur/button`: Button components
- `@entur/icons`: Icon set
- `@entur/layout`: Layout components (NavigationCard)
- `@entur/tokens`: Design tokens
- `@entur/travel`: Travel-specific components (TravelHeader, TravelLeg, TravelTag)
- `@entur/typography`: Typography components
- `@entur/alert`, `@entur/chip`, `@entur/form`, `@entur/tab`: Alerts, chips, radio panels, tabs
- `leaflet` and `react-leaflet`: Map on the Kart page

### Dev Dependencies
- `vite`: Build tool and dev server
- `@vitejs/plugin-react`: React plugin for Vite
- `vitest`: Unit tests

## Common Tasks

### Adding a New Feature
1. Keep the travel/journey theme consistent
2. Use Entur design system components
3. Maintain Norwegian language for all text
4. Test across different viewport sizes
5. Ensure countdown logic is not affected

### Modifying Countdown Logic
- Date and phase logic lives in `src/lib/christmas.js` (covered by `christmas.test.js`)
- The countdown UI is `src/components/Countdown.jsx`

### Styling Changes
- Each page and component has its own CSS file next to it; global styles are in `src/App.css`
- Use `@entur/tokens` CSS variables (e.g. `--colors-brand-blue`, `--colors-transport-default-train`) instead of hard-coded colors
- Use CSS classes that align with Entur's design system
- Maintain the travel booking aesthetic

## Important Notes

1. **Christmas Date:** Christmas Eve is December 24th at midnight (00:00:00)
2. **Locale:** Norwegian (no-NO) for all dates and text
3. **Theme:** Maintain the "Polar Express" train journey metaphor
4. **Design System:** Use Entur components; don't introduce custom implementations without good reason
5. **Build Output:** The `dist/` directory is gitignored (build artifacts)
6. **Dependencies:** `node_modules/` is gitignored

## Testing Considerations

Unit tests use Vitest (`npm test`) and live next to the code as `*.test.js`:
- `christmas.test.js` – Advent dates, phases and year boundaries
- `avvik.test.js` – one deviation per day, valid Alert variants
- `sleigh.test.js` – Santa's route and position

## Accessibility

- Maintain semantic HTML structure
- Ensure countdown is readable
- Use appropriate ARIA labels if adding interactive elements
- Test with keyboard navigation

## Contribution Standards

1. **Minimal Changes:** Make the smallest possible changes to achieve the goal
2. **Don't Break Working Code:** Preserve existing functionality unless explicitly fixing a bug
3. **Use Existing Patterns:** Follow the established code structure and conventions
4. **Norwegian Language:** All user-facing text must be in Norwegian
5. **Build Validation:** Always ensure `npm run build` succeeds before committing
6. **No Unnecessary Dependencies:** Only add new dependencies if absolutely required

## Security

- No sensitive data or API keys should be in the codebase
- All data is client-side; no backend or data storage
- The map loads tiles from tile.openstreetmap.org; keep the attribution
- Dependencies are managed via npm; keep them updated for security patches
