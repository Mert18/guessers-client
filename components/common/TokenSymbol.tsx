
interface ITokenSymbol {
  color?: string;
}

const TokenSymbol = ({color = "primary-dark"}: ITokenSymbol) => {
  return (
    <span className={`mx-1 text-${color}`}>G</span>
  )
}

export default TokenSymbol