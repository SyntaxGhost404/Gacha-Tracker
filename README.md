# GachaTracker 📱✨

Hey there! Welcome to **GachaTracker**, a fun, clean web app built to help you track, schedule, and stay up-to-date with your favorite upcoming, pre-registration, and newly launched gacha games. 

No more searching through multiple forums or missing release dates—we've got everything organized right here in one cozy spot.

---

## 🎨 Casual & Gamer-Friendly Visuals

The app is built to feel right at home with gamer communities, featuring:
* **Slate/Cosmic Theme**: Easy on the eyes with smooth transitions between cozy night modes and crisp daylight modes.
* **Friendly Interfaces**: Looks great on desktop and has a handy bottom navbar for quick navigation on mobile phones.
* **Smooth Animations**: Animated cards, fade effects, and interactive sliders that respond neatly to your touch or click.

---

## 🌟 What GachaTracker Can Do

* **Interactive Catalog & Filters**: Sort games by region (Global, SEA, JP, etc.), platforms (Android, iOS, PC), and release status instantly.
* **Live Release Countdowns**: Real-time timers counting down to launch dates or closed beta tests so you're always ready.
* **Personal Watchlist**: Follow your anticipation list! We've also fixed header layout shifts so adding games to your watchlist remains perfectly aligned on mobile.
* **Full Media Gallery**: Watch trailers and swipe through official screenshots in a responsive highlight carousel.
* **News & Community Feedback**: Read game-specific articles and submit feedback or database corrections through our simplified portal.

---

## ⚙️ Quick Tech Setup

Behind the scenes, we keep things modern and lightweight:
* **Frontend**: React (v18) & TypeScript
* **Styling**: styled-components with clean custom CSS variables
* **Animations**: Framer Motion (`motion/react`)
* **Icons**: Standard modern line icons from Lucide React
* **Build System**: Powered by Vite

### Running it Locally

1. **Install packages**:
   ```bash
   npm install
   ```

2. **Launch development server**:
   ```bash
   npm run dev
   ```
   *Your server will boot right up at `http://localhost:3000`!*

3. **Format & linter check**:
   ```bash
   npm run format
   npm run lint
   ```

4. **Compile production build**:
   ```bash
   npm run build
   ```
