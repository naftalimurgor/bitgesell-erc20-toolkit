import { ethers, } from 'ethers';
import { USDTABI } from '../ABI/USDT';
import { ERC20 } from '../constants';
import { Networks } from '../constants/Networks';

export interface IUSDTOptions {
  network: Networks,
  privateKey?: string
  signer?: any,
  rpc: string
}

export class USDT implements IERC20 {
  private _signer: any
  private _network: Networks
  private USDTContractInstance: any
  private rpc: string
  private contractAddress: string
  constructor({ signer, rpc, privateKey, network }: IUSDTOptions) {
    this.rpc = rpc
    this._network = network
    this.contractAddress = this._network === Networks.BNBChain ? ERC20.USDT.Binance : ERC20.USDT.Ethereum
    let provider = new ethers.providers.JsonRpcProvider(this.rpc);
    this._signer = signer !== 'undefined' ? signer : new ethers.Wallet(privateKey, provider)

    this.USDTContractInstance = new ethers.Contract(this.contractAddress, USDTABI, this._signer)
  }

  public async name(): Promise<string> {
    const contractName = await this.USDTContractInstance.name()
    return contractName
  }

  public async symbol(): Promise<string> {
    const tokenSymbol = await this.USDTContractInstance.name()
    return tokenSymbol
  }

  public async totalSupply(): Promise<number> {
    const balance = await this.USDTContractInstance.totalSupply()
    return Number(ethers.utils.formatUnits(balance, 18))
  }

  public async balanceOf(account: string): Promise<number> {
    const accountBalance = await this.USDTContractInstance.balanceOf(account)
    return Number(ethers.utils.formatUnits(accountBalance, 18))

  }

  public async transfer(recepient: string, amount: number): Promise<boolean> {
    const success = await this.USDTContractInstance.transfer(recepient, ethers.utils.parseUnits(String(amount), 18))
    return success
  }

  public async transferFrom(sender: string, recepient: string, amount: number): Promise<boolean> {
    const success = await this.USDTContractInstance.transferFrom(sender, recepient, ethers.utils.parseUnits(String(amount), 18))
    return success
  }
}