# bitgesell-erc20-toolkit
<img src="Icon.png" style="height: 60px;"/>

A TypeScript wrapper around Wrapped BGL(WBGL) token on BNB Chain, Ethereum EVM chains for use in Node and Browser. Also, included is USDT ERC20 token for both EVM Networks.

## Usage

```typescript
import {
  USDT,
  WBGL,
  Networks
} from 'bitgesell-erc20-toolkit'

const options = {
  network: Networks.Ethereum,
  rpc: RPCs.ETHEREUM,
  privateKey: process.env.PRIVATE_KEY,
}

const WBGLInstance = new WBGL(options)

(async () => (
  // Returns all WBGL Tokens in existence
  const totalSupply = await WBGLInstance.totalSupply()
  console.log(totalSupply)
))()
```

## `transfer` method

For non-readonly methods, the caller account needs to be a signer,i.e should be able to sign transctions. This can be done as follows:

```typescript
// Browsers environments
const signer = new ethers.Signer(RPCs.ETHEREUM, window.provider)
const signer = new ethers.Signer(RPCs.ETHEREUM, process.env.PRIVATE_KEY)

const options = {
  network: Networks.Ethereum,
  rpc: RPCs.ETHEREUM,
  signer: signer
}

const wbglInstance = new WBGL(options)

(async() => {
  const recepient = ''
  const amount = 20 
  const success = await wbglInstance.transfer(recepient, amount)
  console.log(success)
})()
```

NB: Always keep PrivateKeys secure under all circumstances.Never check seedphrases and PrivateKeys into Version control systems like Git

## API

```typescript
interface IERC20 {
  totalSupply(): number
  balanceOf(account: string): number
  transfer(recepient: string, amount: number): boolean
  transferFrom(sender: string, recepient: string, amount: number): boolean
}
```

## License
`MIT`