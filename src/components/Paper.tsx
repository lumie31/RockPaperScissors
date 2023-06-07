interface PaperType {
  userBet: Function;
  bet: number;
  paperBetNum: number;
  paperWin: boolean;
}

export default function Paper({
  userBet,
  bet,
  paperBetNum,
  paperWin,
}: PaperType) {
  return (
    <div
      onClick={() => userBet()}
      className={`w-[160px] h-[120px] bg-emerald-900 ${
        paperWin ? 'border-4' : 'border-2'
      } py-3 border-green-600 flex flex-col justify-around items-center rounded-lg hover:cursor-pointer`}
    >
      {bet ? (
        <span className='border-4 border-blue-700 p-1 rounded-full bg-white'>
          {paperBetNum}
        </span>
      ) : (
        ''
      )}
      <p className='uppercase font-semibold text-xl text-green-600'>Paper</p>
    </div>
  );
}
