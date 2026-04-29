# Pixel Search
A photo-tagging game inspired by *Where’s Waldo?* where players race against time to find hidden characters in a large illustrated scene. Click anywhere on the image, choose a character from the targeting menu, and see if your guess is correct. Find them all as fast as possible and claim a spot on the leaderboard.

## Live Links
- **Front-end:** https://pixel-search-client.onrender.com
- **Server:** https://pixel-search-server.onrender.com

## Tech Stack
### Frontend
- React
- React Router
- CSS Modules

### Backend
- Node.js
- Express
- express-validator

### Database
- Prisma
- PostgreSQL

### Deployment
- Render


## Features
- **Interactive Photo Tagging**  
  Click anywhere on the game image to open a targeting box and select the character you think is hidden there.

- **Character Validation**  
  Each selection is sent to the backend and validated against stored pixel coordinates to confirm whether the chosen character is actually inside the selected area.

- **Normalized Click Detection**  
  Click coordinates are normalized across different screen sizes so character detection stays accurate on desktop, tablet, and mobile.

- **Real-Time Feedback**  
  Instantly receive feedback after every guess to know whether your selection was correct or not.

- **Character Markers**  
  Correct guesses place a marker directly on the image so players can track which characters they’ve already found.

- **Server-Side Session Timing**  
  Game sessions are timed on the backend to prevent tampering and ensure accurate score tracking.

- **Leaderboard System**  
  After finding every character, players can submit their name and record their completion time on the high scores board.

- **Responsive Design**  
  Built to work smoothly across desktop, tablet, and mobile screen sizes.

- **REST API Architecture**  
  Frontend and backend are fully separated, communicating through a clean REST API.

## How It Works
- The game starts when the player loads the image.
- A server-side session begins tracking the player’s time.
- The player clicks the image to open a targeting box.
- A popup appears with the list of hidden characters.
- The player selects a character.
- The backend checks whether the click location matches that character’s stored coordinates.
- Once all characters are found, the player submits their name to the leaderboard.

## What I Learned
- Building a full-stack game with a separated frontend and backend
- Normalizing image click coordinates for consistent cross-device accuracy
- Validating user actions against backend data
- Designing game session logic with secure server-side timing
- Structuring relational data with Prisma and PostgreSQL
- Creating a responsive UI around dynamic image interactions
- Managing state for user guesses, found characters, and game progress
- Building and consuming REST APIs in a real-world full-stack project
- Handling leaderboard logic and score persistence

---

## Future Updates
- Add multiple game maps
- Add difficulty levels with more hidden characters
- Add animations and sound effects for better feedback

## Credits
- **Game Illustration:** AI-generated with Gemini
- **Font:** Gloria Hallelujah — Google Fonts
