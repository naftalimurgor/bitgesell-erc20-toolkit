interface IERC20 {
  name(): Promise<string>
  symbol(): Promise<string>
  totalSupply(): Promise<number>
  balanceOf(account: string): Promise<number>
  transfer(recepient: string, amount: number): Promise<boolean>
  transferFrom(sender: string, recepient: string, amount: number): Promise<boolean>
}