interface IERC20 {
  totalSupply(): number
  balanceOf(account: string): number
  transfer(recepient: string, amount: number): boolean
  allowance(owner: string, spender: string): number
  approve(spender: string, amount: number): boolean
  transferFrom(sender: string, recepient: string, amount: number): boolean
}