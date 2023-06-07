'use client';

import { useState } from 'react';
import Rock from '@/components/Rock';
import Paper from '@/components/Paper';
import Scissors from '@/components/Scissors';
import Header from '@/components/Header';

interface PlayerChoice {
  selected: string;
  amount: number;
}

type BetType = 'rock' | 'paper' | 'scissors';

const GameOptions = ['rock', 'paper', 'scissors'];

export default function Game() {
  const [bet, setBet] = useState<number>(0);
  const [win, setWin] = useState<number>(0);
  const [balance, setBalance] = useState<number>(5000);

  const [rockWin, setRockWin] = useState<boolean>(false);
  const [paperWin, setPaperWin] = useState<boolean>(false);
  const [scissorsWin, setScissorsWin] = useState<boolean>(false);

  const [rockBetNum, setRockBetNum] = useState<number>(0);
  const [paperBetNum, setPaperBetNum] = useState<number>(0);
  const [scissorsBetNum, setScissorsBetNum] = useState<number>(0);

  const [cpuChoice, setCpuChoice] = useState<string>('');
  const [decision, setDecision] = useState<string | undefined>('');

  const [playerChoice, setPlayerChoice] = useState<PlayerChoice[]>([]);

  function userBet(betType: BetType) {
    if (bet >= balance) {
      alert('Insufficient funds to place a bet!');
      return;
    }

    if (
      playerChoice.length === 2 &&
      playerChoice.findIndex((x) => x.selected === betType) === -1
    ) {
      alert('You cannot select more than 2 choices!');
      return;
    }

    let rockNum = rockBetNum + 500;
    let paperNum = paperBetNum + 500;
    let scissorsNum = scissorsBetNum + 500;

    switch (betType) {
      case 'rock':
        setRockBetNum(rockNum);
        setPlayerChoice((prev) => {
          const newData = prev.filter((x) => x.selected !== 'rock');
          return [...newData, { selected: 'rock', amount: rockNum }];
        });
        setBet(bet + 500);
        break;
      case 'paper':
        setPaperBetNum(paperNum);
        setPlayerChoice((prev) => {
          const newData = prev.filter((x) => x.selected !== 'paper');
          return [...newData, { selected: 'paper', amount: paperNum }];
        });
        setBet(bet + 500);
        break;
      case 'scissors':
        setScissorsBetNum(scissorsNum);
        setPlayerChoice((prev) => {
          const newData = prev.filter((x) => x.selected !== 'scissors');
          return [...newData, { selected: 'scissors', amount: scissorsNum }];
        });
        setBet(bet + 500);
        break;
      default:
        // Handle default case properly
        alert('Inside switch default block');
        break;
    }
  }

  function clearSelection() {
    setRockWin(false);
    setPaperWin(false);
    setScissorsWin(false);
  }

  function handleGamePlay() {
    if (playerChoice.length === 0) {
      alert('Please make a choice before playing!');
      return;
    }

    const computerChoice =
      GameOptions[Math.floor(Math.random() * GameOptions.length)];

    setCpuChoice(computerChoice);

    alert(`Player chose: ${playerChoice.map((p) => p.selected)}`);
    alert(`CPU chose: ${computerChoice}`);

    const winDecision = playerChoice
      .map((choice) => choice.selected)
      .find((selected) => {
        if (selected === 'rock' && computerChoice === 'scissors') {
          return true;
        } else if (selected === 'paper' && computerChoice === 'rock') {
          return true;
        } else if (selected === 'scissors' && computerChoice === 'paper') {
          return true;
        } else {
          return false;
        }
      });

    const tieDecision = playerChoice
      .map((choice) => choice.selected)
      .find((selected) => {
        if (selected === 'rock' && computerChoice === 'rock') {
          return true;
        } else if (selected === 'paper' && computerChoice === 'paper') {
          return true;
        } else if (selected === 'scissors' && computerChoice === 'scissors') {
          return true;
        } else {
          return false;
        }
      });

    const lossDecision = playerChoice
      .map((choice) => choice.selected)
      .find((selected) => {
        if (selected === 'rock' && computerChoice === 'paper') {
          return true;
        } else if (selected === 'paper' && computerChoice === 'scissors') {
          return true;
        } else if (selected === 'scissors' && computerChoice === 'rock') {
          return true;
        } else {
          return false;
        }
      });

    const multiplier = playerChoice.length > 1 ? 3 : 14;

    let decision = (() => {
      if (multiplier === 3) {
        if (winDecision) return winDecision;
        if (tieDecision) return tieDecision;
      } else {
        if (winDecision) return winDecision;
        if (tieDecision) return tieDecision;
        if (lossDecision) return lossDecision;
      }
    })();

    setDecision(decision);

    let bet = playerChoice.find((x) => x.selected === decision)?.amount ?? 0;

    if (decision === computerChoice) {
      // Tie counts as a loss
      setBalance(balance - bet);
      alert('Player lose - Tie condition');
    } else if (decision === 'rock' && computerChoice === 'scissors') {
      setWin(win + 1);
      setRockWin(true);
      setBalance(balance - bet + multiplier * bet);
      alert('Player wins - Rock crushes Scissors');
    } else if (decision === 'rock' && computerChoice === 'paper') {
      setBalance(balance - bet);
      alert('Player lose - Paper slices Rock');
    } else if (decision === 'scissors' && computerChoice === 'paper') {
      setWin(win + 1);
      setScissorsWin(true);
      setBalance(balance - bet + multiplier * bet);
      alert('Player win - Scissors cuts Paper');
    } else if (decision === 'scissors' && computerChoice === 'rock') {
      setBalance(balance - bet);
      alert('Player lose - Rock crushes Scissors');
    } else if (decision === 'paper' && computerChoice === 'rock') {
      setWin(win + 1);
      setPaperWin(true);
      setBalance(balance - bet + multiplier * bet);
      alert('Player win - Paper slices Rock');
    } else if (decision === 'paper' && computerChoice === 'scissors') {
      setBalance(balance - bet);
      alert('Player lose - Scissors cuts Paper');
    } else {
      setBalance(balance - bet + bet * multiplier);
      // Handle this case properly
      alert('Unhandled Condition');
    }
    setBet(0);
    setRockBetNum(0);
    setPaperBetNum(0);
    setScissorsBetNum(0);
    setPlayerChoice([]);
  }

  return (
    <main className='min-h-screen bg-gradient-to-b from-stone-500 to-stone-900'>
      <Header balance={balance} bet={bet} win={win} />
      {cpuChoice && (rockWin || paperWin || scissorsWin) ? (
        <p className={`text-center mt-10 capitalize font-xl text-white`}>
          {`CPU: ${cpuChoice}`}{' '}
          <span className='lowercase text-[#cdae81]'>vs</span>{' '}
          {`Player: ${decision}`}
        </p>
      ) : (
        ''
      )}
      {rockWin || paperWin || scissorsWin ? (
        <p className='text-center text-[30px] uppercase mt-2 text-[#cdae81] font-bold'>{`${decision} wins!!! 🎉`}</p>
      ) : (
        <p
          className={`${
            !rockWin || !paperWin || !scissorsWin ? 'hidden' : 'block'
          } text-center text-lg uppercase`}
        >{`${decision} lose`}</p>
      )}

      <section className='flex flex-col items-center mt-[12vh] m-8'>
        <h6 className='uppercase my-4 text-[#cdae81] text-center text-sm font-extrabold'>
          Pick your Positions
        </h6>
        <div className='flex gap-2 flex-wrap justify-center'>
          <Rock
            userBet={() => userBet('rock')}
            bet={bet}
            rockWin={rockWin}
            rockBetNum={rockBetNum}
          />
          <Paper
            userBet={() => userBet('paper')}
            bet={bet}
            paperWin={paperWin}
            paperBetNum={paperBetNum}
          />
          <Scissors
            userBet={() => userBet('scissors')}
            bet={bet}
            scissorsWin={scissorsWin}
            scissorsBetNum={scissorsBetNum}
          />
        </div>
        {rockWin || paperWin || scissorsWin ? (
          <button
            onClick={clearSelection}
            className='text-[#cdae81] uppercase border-2 border-[#cdae81] bg-slate-800 px-8 py-3 text-lg rounded-full my-8'
          >
            Clear
          </button>
        ) : (
          <button
            onClick={handleGamePlay}
            className={`text-[#cdae81] ${
              playerChoice.length === 0
                ? 'cursor-not-allowed disabled: opacity-50'
                : ''
            } uppercase border-2 border-[#cdae81] bg-slate-800 px-8 py-3 text-lg rounded-full my-8`}
          >
            Play
          </button>
        )}
      </section>
    </main>
  );
}
