interface HeaderType {
  balance: number;
  bet: number;
  win: number;
}

export default function Header({ balance, bet, win }: HeaderType) {
  return (
    <header className='sm:flex sm:justify-center bg-black  p-2'>
      <div className='flex justify-around sm:justify-between sm:w-1/2'>
        <p className='text-[#cdae81]'>
          Balance: <span className='text-white'>{balance}</span>
        </p>
        <p className='text-[#cdae81]'>
          Bet: <span className='text-white'>{bet}</span>
        </p>
        <p className='text-[#cdae81]'>
          Win: <span className='text-white'>{win}</span>
        </p>
      </div>
    </header>
  );
}
