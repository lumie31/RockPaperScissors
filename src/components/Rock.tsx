interface RockType {
  userBet: Function;
  bet: number;
  rockBetNum: number;
  rockWin: boolean;
}

export default function Rock({ userBet, bet, rockBetNum, rockWin }: RockType) {
  return (
    <div
      onClick={() => userBet()}
      className={`w-[160px] h-[120px] bg-indigo-900  ${
        rockWin ? 'border-4' : 'border-2'
      } py-3 border-blue-600 flex flex-col justify-around items-center rounded-lg hover:cursor-pointer`}
    >
      {bet ? (
        <span className='border-4 border-blue-700 p-1 rounded-full bg-white'>
          {rockBetNum}
        </span>
      ) : (
        ''
      )}
      <p className='uppercase font-bold text-xl text-blue-600'>Rock</p>
    </div>
  );
}
