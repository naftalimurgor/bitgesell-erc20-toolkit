import { ethers } from 'ethers';
import { ERC20 } from '../constants';
import { Networks } from '../constants/Networks';
import jest from 'jest'

describe('WBGL', () => {
  const rpc = 'http://localhost:8545';
  const privateKey = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
  const network = Networks.BNBChain;
  const signer = new ethers.Signer(privateKey, rpc);
  const contractAddress = ERC20.WBGL.Binance;

  let wbglInstance;
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

  it('should initialize correctly', () => {
    expect(wbglInstance.rpc).toBe(rpc);
    expect(wbglInstance._network).toBe(network);
    expect(wbglInstance._signer).toBe(signer);
    expect(wbglInstance.contractAddress).toBe(contractAddress);
    expect(wbglInstance.WBGLContractInstance).toBeDefined();
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
