# Rock, Paper, Scissors

A Rock, Paper, Scissors game with the ability to bet on the winning position.

A live copy of the project can be viewed here: https://rockpaperscissors.vercel.app

## Specifications

A player will start with a balance of 5000.

### Description

- There should be three betting positions, rock, paper, scissors.
- Player starts with a balance of 5000.
- Player can bet on rock, paper, or scissors, but not on all three at the same time.
- The bet is reduced from the balance.
- When betting done button is clicked, the computer runs a random paper, scissors, rock match.
- Player choice should be compared to computers choice and only one bet can win – every tie counts as loss
- If player bets on one of them and wins, the return is 14 times the bet.
- If player bets on two of them and wins the return is 3 times the bet.
- After round ends the return adds to the balance
- Player cannot bet if player has less balance than available for bet.
- Each bet should be 500 (player can place several bets on one position: 500, 1000, 1500 etc)

## Running the Project locally

These instructions will get you a copy of this project up and running on your local machine for development and testing purposes.

### Installing

- Open your local development terminal
- `cd` into the directory that you want the project to reside e.g:

```bash
cd projects
```

- Clone the repository into that directory

```bash
git clone https://github.com/lumie31/RockPaperScissors.git
```

- Run `npm install` to install the project dependencies
- Run `npm run dev` to start a local development server
- Navigate to http://localhost:3000 to view the project in your browser

## Built With

- React (Next.js)
- TypeScript
- Tailwindcss
- Vercel
