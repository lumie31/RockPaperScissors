interface ScissorsBet {
  userBet: Function;
  bet: number;
  scissorsBetNum: number;
  scissorsWin: boolean;
}

export default function Scissors({
  userBet,
  bet,
  scissorsBetNum,
  scissorsWin,
}: ScissorsBet) {
  return (
    <div
      onClick={() => userBet()}
      className={`w-[160px] h-[120px] bg-rose-950 ${
        scissorsWin ? 'border-4' : 'border-2'
      } py-3 border-red-600 flex flex-col justify-around items-center rounded-lg hover:cursor-pointer`}
    >
      {bet && scissorsBetNum !== 0 ? (
        <span className='border-4 border-blue-700 p-1 rounded-full bg-white'>
          {scissorsBetNum}
        </span>
      ) : (
        ''
      )}
      <p className='uppercase font-bold text-xl text-red-600'>Scissors</p>
    </div>
  );
}
