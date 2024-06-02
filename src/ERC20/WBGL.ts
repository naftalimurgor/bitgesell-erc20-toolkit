import { ethers } from 'ethers'
import { Networks, RPCs } from '../constants/Networks';

/**
 * Token Wrapper for Wrapped BGL (WBGL)
 * @link
 */
export class WBGL implements IERC20 {
  private _signer: any
  private _network: Networks
  private WBGLContractInstance: any

  constructor(_signer, network: Networks, privateKey: string) {
    this._network = network
    this._signer = network === Networks.BNBChain ? new _signer(privateKey, RPCs.BNB_CHAIN) : new _signer(privateKey, RPCs.ETHEREUM)
    // this.WBGLContractInstance = new ethers.Contract(this._signer,)
  }
  public totalSupply(): number {
    throw new Error("Method not implemented.");
  }

  public balanceOf(account: string): number {
    throw new Error("Method not implemented.");
  }

  public transfer(recepient: string, amount: number): boolean {
    throw new Error("Method not implemented.");
  }

  public allowance(owner: string, spender: string): number {
    throw new Error("Method not implemented.");
  }

  public approve(spender: string, amount: number): boolean {
    throw new Error("Method not implemented.");
  }

  public transferFrom(sender: string, recepient: string, amount: number): boolean {
    throw new Error("Method not implemented.");
  }
}