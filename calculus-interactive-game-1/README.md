# Calculus Interactive Game

Welcome to the Calculus Interactive Game project! This repository contains both the frontend and backend components of an interactive game designed to help users learn and practice calculus concepts.

## Project Structure

The project is organized into two main directories: `frontend` and `backend`.

### Frontend

The frontend is built using React and TypeScript. It includes the following key components:

- **Public Directory**: Contains the main HTML entry point.
  - `index.html`: The main HTML file for the application.

- **Src Directory**: Contains the source code for the React application.
  - `index.tsx`: The entry point for the React application.
  - `App.tsx`: The main application component that sets up routing and layout.
  - **Components**: Contains reusable components.
    - `GameBoard.tsx`: Displays the interactive game board.
    - `ProblemCard.tsx`: Presents individual calculus problems.
    - `HUD.tsx`: Shows game status and user information.
  - **Pages**: Contains the main pages of the application.
    - `Home.tsx`: The landing page of the application.
    - `Play.tsx`: The page where users engage with the game.
  - **Hooks**: Contains custom hooks.
    - `useGame.ts`: Manages game state and logic.
  - **Styles**: Contains the main styles for the application.
    - `main.css`: The main stylesheet.
  - **Types**: Contains TypeScript types and interfaces.
    - `index.ts`: Type definitions used throughout the frontend.

- **Configuration Files**:
  - `package.json`: Lists dependencies and scripts for the frontend.
  - `tsconfig.json`: TypeScript configuration for the frontend.
  - `vite.config.ts`: Configuration for Vite, the build tool used for the frontend.

### Backend

The backend is built using Node.js and TypeScript. It includes the following key components:

- **Src Directory**: Contains the source code for the backend application.
  - `index.ts`: The entry point for the Express server.
  - **Controllers**: Contains the logic for handling requests.
    - `gameController.ts`: Handles game-related requests.
  - **Routes**: Defines the API endpoints.
    - `gameRoutes.ts`: Exports the game routes.
  - **Services**: Contains business logic.
    - `gameService.ts`: Contains game-related business logic.
  - **Models**: Defines data models.
    - `user.ts`: Represents user data.
  - **Utils**: Contains utility functions.
    - `mathUtils.ts`: Utility functions for mathematical operations.

- **Configuration Files**:
  - `package.json`: Lists dependencies and scripts for the backend.
  - `tsconfig.json`: TypeScript configuration for the backend.
  - `.env.example`: Example environment variables for the backend.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the frontend and backend directories and install the dependencies:
   ```
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Start the development servers:
   - For the frontend:
     ```
     cd frontend
     npm run dev
     ```
   - For the backend:
     ```
     cd backend
     npm run start
     ```

## Calculus Text Integration

This project integrates the Whitman Calculus textbook to provide learning resources and practice problems.

### Hosted Full Text

The complete Whitman Calculus text is available at `/assets/calculus.txt` when the backend is running. The Help modal in the game includes a link to view this text.

### Problem Parser

The repository includes a parser script that extracts question/answer pairs from the calculus text.

#### Running the Parser

To regenerate `backend/data/problems.full.json` from the source text:

```bash
# From the repository root
node scripts/parseCalculusJson.js
```

The parser will:
- Read the `calculus.json` file at the repository root
- Extract exercise problems from all chapters
- Generate `calculus-interactive-game-1/backend/data/problems.full.json`
- Log statistics about extracted problems

#### Using Generated Problems

The backend API serves problems from `backend/data/problems.json` via the `/api/games/problems` endpoint. The frontend automatically fetches these problems when available.

**Note:** The parser extracts exercise questions using heuristics. While it captures most problems correctly, some answers may be incomplete or marked as "See solution in text". For production use:

1. Review `backend/data/problems.full.json` manually
2. Add explicit answers where needed
3. Copy validated problems to `backend/data/problems.json`
4. Alternatively, use `backend/data/problems.sample.json` which contains 15 hand-validated problems with verified answers (this is the default)

To use the full extracted problems instead of the sample:
```bash
cp calculus-interactive-game-1/backend/data/problems.full.json calculus-interactive-game-1/backend/data/problems.json
```

To restore the sample problems:
```bash
cp calculus-interactive-game-1/backend/data/problems.sample.json calculus-interactive-game-1/backend/data/problems.json
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.