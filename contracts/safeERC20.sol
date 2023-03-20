pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StoreFund {
    using SafeERC20 for IERC20;
    mapping(address => mapping(address => uint256)) public balances;

    function deposit(address tokenAddress, uint256 amount) public payable {
        require(amount > 0, "Amount should be larger than 0.");
        IERC20 token = IERC20(tokenAddress);
        balances[msg.sender][tokenAddress] += amount;
        token.safeTransferFrom(msg.sender, address(this), amount);
    }

    function withdraw(address tokenAddress, uint256 amount) public {
        require(balances[msg.sender][tokenAddress] >= amount, "Insufficient funds.");
        require(amount > 0, "Amount should be larger than 0.");
        balances[msg.sender][tokenAddress] -= amount;
        IERC20 token = IERC20(tokenAddress);
        token.safeTransfer(msg.sender, amount);
    }
}
