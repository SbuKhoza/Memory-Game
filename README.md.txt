Node.js Card Guessing Game: AniFashion
Objective
This project is a card guessing game built using Node.js and Express.js. The main goal is to match pairs of cards until all cards have been matched successfully. Users can reset the game or shuffle the cards, and the game is won when all cards have been matched.

Features
36 Cards Grid: The game board consists of 36 cards arranged in a 6x6 grid (6 rows and 6 columns). This gives the user 18 pairs of cards to match.
Card Matching: Players flip two cards at a time. If they match, they remain visible. If not, they flip back over.
Timer and Score: A timer tracks how long the user takes to complete the game. The score increases with successful matches.
Reset and Shuffle: Players can reset the game or shuffle the cards at any time, randomizing the positions.
Winning Popup: Once all cards are matched, a congratulatory popup is shown.
No Data Persistence: Game data is not persisted and will reset upon refreshing or restarting.
Tech Stack
Backend: Node.js with Express.js
Frontend: HTML5, CSS3, and JavaScript (Vanilla)
UI Frameworks: MUI (Material UI), Font Awesome
Game Instructions
Start the Game:

When the page loads, the cards are placed face-down and shuffled. The user starts the game by clicking the "Start Game" button.
The cards will briefly reveal themselves before being hidden again, allowing the user to remember their positions.
Gameplay:

The user clicks on two cards to reveal their contents. If the two cards match, they stay revealed. If not, they flip back over.
The game keeps track of time and score. For each successful match, the score increases by 10 points.
Resetting & Shuffling:

The user can reset the game by clicking the reset button, which will shuffle the cards and restart the game.
A "Shuffle" button allows reshuffling the cards during the game while maintaining the progress.
Winning:

Once all 18 pairs of cards have been matched, a popup appears to congratulate the user on completing the game, displaying the total time taken and final score.
Pause & Resume:

The game features a pause/resume button, allowing the player to stop the timer and resume the game when ready.
Installation
To get started with this project locally, follow the steps below:

Clone the Repository:

bash
Copy code
git clone https://github.com/your-username/card-guessing-game.git
Install Dependencies: Navigate into the project directory and install the required npm dependencies:

bash
Copy code
cd card-guessing-game
npm install
Start the Server: Run the project locally using:

bash
Copy code
npm start
Access the Game: Once the server is running, open your browser and go to:

arduino
Copy code
http://localhost:3000
Project Structure
bash
Copy code
/public
  ├── /assets         # Card images, icons, and other static assets
  ├── style.css       # Custom CSS for styling the game
  ├── app.js          # JavaScript file handling game logic
index.html            # Main HTML file for the game
server.js             # Express server configuration
Future Enhancements
Levels of Difficulty: Add levels such as "Easy", "Medium", and "Hard", where the number of cards increases with difficulty.
Sound Effects: Add sound effects for card flips, matches, and winning the game.
Leaderboard: Implement a leaderboard to track the top scores and times for different players.
Mobile Optimization: Improve responsiveness for better mobile experience.
License
This project is open-source and available under the MIT License.

Credits
UI Framework: MUI CSS Library (https://www.muicss.com/)
Icons: Font Awesome (https://fontawesome.com/)