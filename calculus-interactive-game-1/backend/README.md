# Calculus Interactive Game Backend

This is the backend for the Calculus Interactive Game, which serves as the API for the frontend application. The backend is built using Node.js and Express, providing endpoints for game-related functionalities.

## Project Structure

- **src/**: Contains the source code for the backend application.
  - **controllers/**: Contains the controllers that handle incoming requests and responses.
  - **routes/**: Defines the API routes for the application.
  - **services/**: Contains business logic and services used by the controllers.
  - **models/**: Defines the data models used in the application.
  - **utils/**: Contains utility functions for various operations.

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd calculus-interactive-game/backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Copy the `.env.example` file to `.env` and fill in the required values.

4. **Run the application**:
   ```bash
   npm start
   ```

## API Endpoints

- **GET /api/game**: Retrieve game data.
- **POST /api/game**: Submit answers to game problems.
- **GET /api/user**: Retrieve user information.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.