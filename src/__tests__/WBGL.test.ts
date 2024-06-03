import { ethers } from 'ethers';
import { ERC20 } from '../constants';
import { Networks } from '../constants/Networks';
import { WBGL } from '../ERC20/WBGL';

jest.mock('ethers')

describe('WBGL', () => {
  const rpc = 'http://localhost:8545';
  const provider = new ethers.providers.JsonRpcProvider(rpc)

  const privateKey = process.env.PRIVATE_KEY;
  const network = Networks.BNBChain;
  const signer = new ethers.Wallet(privateKey, provider);
  const contractAddress = ERC20.WBGL.Binance;

  let wbglInstance: WBGL
  let contractMock;

  beforeEach(() => {
    contractMock = {
      name: jest.fn().mockResolvedValue('Wrapped Binance Gold Token'),
      symbol: jest.fn().mockResolvedValue('WBGL'),
      totalSupply: jest.fn().mockResolvedValue(ethers.utils.parseUnits('1000000', 18)),
      balanceOf: jest.fn().mockResolvedValue(ethers.utils.parseUnits('1000', 18)),
      transfer: jest.fn().mockResolvedValue(true),
      transferFrom: jest.fn().mockResolvedValue(true),
    };

    ethers.Contract.mockImplementation(() => contractMock);
    ethers.Signer.mockImplementation(() => signer);

    wbglInstance = new WBGL({ signer, rpc, privateKey, network });
  });

  it('should return the name of the token', async () => {
    const name = await wbglInstance.name();
    expect(name).toBe('Wrapped Binance Gold Token');
    expect(contractMock.name).toHaveBeenCalled();
  });

  it('should return the symbol of the token', async () => {
    const symbol = await wbglInstance.symbol();
    expect(symbol).toBe('WBGL');
    expect(contractMock.symbol).toHaveBeenCalled();
  });

  it('should return the total supply of the token', async () => {
    const totalSupply = await wbglInstance.totalSupply();
    expect(totalSupply).toBe(1000000);
    expect(contractMock.totalSupply).toHaveBeenCalled();
  });

  it('should return the balance of an account', async () => {
    const balance = await wbglInstance.balanceOf('0xaccount');
    expect(balance).toBe(1000);
    expect(contractMock.balanceOf).toHaveBeenCalledWith('0xaccount');
  });

  it('should transfer tokens to a recipient', async () => {
    const success = await wbglInstance.transfer('0xrecipient', 500);
    expect(success).toBe(true);
    expect(contractMock.transfer).toHaveBeenCalledWith('0xrecipient', ethers.utils.parseUnits('500', 18));
  });

  it('should transfer tokens from a sender to a recipient', async () => {
    const success = await wbglInstance.transferFrom('0xsender', '0xrecipient', 500);
    expect(success).toBe(true);
    expect(contractMock.transferFrom).toHaveBeenCalledWith('0xsender', '0xrecipient', ethers.utils.parseUnits('500', 18));
  });
});
