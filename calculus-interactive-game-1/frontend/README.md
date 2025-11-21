# Calculus Interactive Game - Frontend

This is the frontend part of the Calculus Interactive Game project. It is built using React and TypeScript, providing an interactive platform for users to engage with calculus problems.

## Features

- **Randomized Problem Generation**: Generates varied polynomial derivative problems each session
- **LaTeX Math Rendering**: Uses KaTeX to render mathematical expressions with proper notation
- **Progressive Hints**: Provides layered hints from conceptual to specific to final answer
- **Problem Shuffling**: Ensures different first problems on each game start

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

### Prerequisites

This project requires Node.js and npm to be installed.

### Installation

1. **Install dependencies**: Run `npm install` to install the necessary dependencies.
   
   The project uses KaTeX for rendering mathematical expressions. This is already included in the dependencies and will be installed automatically.

2. **Verify KaTeX Installation**: The following packages should be installed:
   - `katex` - For math rendering
   - `@types/katex` - TypeScript type definitions for KaTeX
   
   The KaTeX CSS is automatically imported in `src/index.tsx`.

### Development

1. **Development Server**: Use `npm run start` to start the development server (using Vite).
2. **Build**: Use `npm run build` to create a production build.
3. **Preview Build**: Use `npm run serve` to preview the production build locally.

## Contributing

Feel free to submit issues or pull requests to improve the project. 

## License

This project is licensed under the MIT License.