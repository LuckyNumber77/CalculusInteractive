# Calculus Interactive Game - Frontend

This is the frontend part of the Calculus Interactive Game project. It is built using React and TypeScript, providing an interactive platform for users to engage with calculus problems.

## Project Structure

- **public/**: Contains static files.
  - **index.html**: The main HTML entry point for the application.

- **src/**: Contains the source code for the application.
  - **index.tsx**: The entry point for the React application.
  - **App.tsx**: The main App component that sets up routing and layout.
  - **components/**: Contains reusable components.
    - **GameBoard.tsx**: Displays the interactive game board.
    - **ProblemCard.tsx**: Presents individual calculus problems.
    - **HUD.tsx**: Shows game status and user information.
  - **pages/**: Contains page components.
    - **Home.tsx**: The landing page for the application.
    - **Play.tsx**: The page where users can engage with the game.
  - **hooks/**: Contains custom hooks.
    - **useGame.ts**: Manages game state and logic.
  - **styles/**: Contains styles for the application.
    - **main.css**: The main stylesheet.
  - **types/**: Contains TypeScript types and interfaces.
    - **index.ts**: Exports types used throughout the application.

## Getting Started

1. **Installation**: Run `npm install` to install the necessary dependencies.
2. **Development**: Use `npm run dev` to start the development server.
3. **Build**: Use `npm run build` to create a production build.

## Contributing

Feel free to submit issues or pull requests to improve the project. 

## License

This project is licensed under the MIT License.