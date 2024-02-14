// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title ERC20 Token Implementation
 * @dev This contract implements the ERC20 standard token functionality.
 *      For more details, refer to: https://eips.ethereum.org/EIPS/eip-20
 * @author https://gitlab.mindfire.co.in/abinash.p
 * @author https://github.com/theabinashpanda
 */

import {IERC20} from "./IERC20.sol";

contract ERC20Token is IERC20 {
    string private _name; // Token name
    string private _symbol; // Token symbol
    uint256 private _totalSupply; // Total token supply
    address private _owner; // Owner of the contract
    mapping(address => uint256) private _balances; // Balances of token holders
    mapping(address => mapping(address => uint256)) private _allowances; // Allowances for token spending

    /**
     * @dev Emitted when ownership of the contract is transferred to a new address.
     * @param previousOwner The address of the previous owner.
     * @param newOwner The address of the new owner.
     */

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    /**
     * @dev Modifier to only allow the owner of the contract to perform a certain action.
     * @notice Reverts if the caller is not the owner.
     */
    
    modifier onlyOwner() {
        require(msg.sender == _owner, "ERC20: Only owner can perform this action");
        _;
    }

    /**
     * @dev Constructor to initialize the token with a name and symbol.
     * @param name_ The name of the token.
     * @param symbol_ The symbol of the token.
     * @param initialSupply_ Initial supply of the token.
     */

    constructor(
        string memory name_
        , string memory symbol_
        , uint256 initialSupply_
    ) {
        require(initialSupply_ > 0,"ERC20: Value less than or equal to 0");
        _name = name_; // Set the name of the token
        _symbol = symbol_; // Set the symbol of the token
        _owner = msg.sender; // Set the owner of the token
        _totalSupply = initialSupply_;
        _balances[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }

    /**
     * @dev Returns the name of the token.
     */

    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token.
     */

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the number of decimal places for the token.
     */

    function decimals() public pure returns (uint8) {
        return 18;
    }

    /**
     * @dev Returns the name of the owner.
     */

    function owner() public view returns (address) {
        return _owner;
    }

    /**
     * @dev Returns the total supply of the token.
     */

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev Returns the balance of the specified account.
     * @param account The address of the account to query the balance of.
     */

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    /**
     * @dev Returns the allowance of a spender for a specific owner.
     * @param from The address of the owner.
     * @param spender The address of the spender.
     */

    function allowance(address from, address spender) public view returns (uint256) {
        return _allowances[from][spender];
    }

    /**
     * @dev Transfers ownership of the contract to a new address.
     * @param _newOwner The address to transfer ownership to.
     * @notice Only the current owner can call this function. Also, the new owner cannot be 
     * the zero address, and the current owner cannot set the owner to themselves again.
     */

    function transferOwnership(address _newOwner) public onlyOwner {
        require(_newOwner != address(0), "ERC20: new owner is the zero address");
        require(_newOwner != _owner, "ERC20: new owner is already the current owner");
        emit OwnershipTransferred(_owner, _newOwner);
        _owner = _newOwner;
    }

    /**
     * @dev Internal function to transfer tokens from one account to another.
     * @param sender The address of the sender.
     * @param recipient The address of the recipient.
     * @param amount The amount of tokens to transfer.
     */

    function _transfer(address sender, address recipient, uint256 amount) internal{
        require(recipient != msg.sender, "ERC20: cannot transfer to self");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _balances[sender] -= amount;
        _balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
    }

    /**
     * @dev Internal function to approve a spender to spend tokens on behalf of an owner.
     * @param from The address of the owner.
     * @param spender The address of the spender.
     * @param amount The amount of tokens to be approved.
     */

    function _approve(address from, address spender, uint256 amount) internal {
        require(spender != msg.sender || from != spender, "ERC20: cannot approve self");
        require(spender != address(0), "ERC20: approve to the zero address");
        _allowances[from][spender] = amount;
        emit Approval(from, spender, amount);
    }

    /**
     * @dev Transfers tokens from the sender's account to another account.
     * @param recipient The address of the recipient.
     * @param amount The amount of tokens to transfer.
     * @return A boolean indicating whether the transfer was successful or not.
     */

    function transfer(address recipient, uint256 amount) public returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    /**
     * @dev Approves a spender to spend a specific amount of tokens on behalf of the sender.
     * @param spender The address of the spender.
     * @param amount The amount of tokens to be approved.
     * @return A boolean indicating whether the approval was successful or not.
     */

    function approve(address spender, uint256 amount) public returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }
    
    /**
     * @dev Transfers tokens from one account to another on behalf of the owner.
     * @param sender The address of the sender.
     * @param recipient The address of the recipient.
     * @param amount The amount of tokens to transfer.
     * @return A boolean indicating whether the transfer was successful or not.
     */

    function transferFrom(address sender, address recipient, uint256 amount) public returns (bool) {
        uint256 currentAllowance = _allowances[sender][msg.sender];
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
        require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
        _transfer(sender, recipient, amount);
        _approve(sender, msg.sender, currentAllowance - amount);
        return true;
    }

    /**
     * @dev Increases the allowance for a spender.
     * @param spender The address of the spender.
     * @param addedValue The amount of increase in allowance.
     * @return A boolean indicating whether the increase in allowance was successful or not.
     */
    
    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        _approve(msg.sender, spender, _allowances[msg.sender][spender] + addedValue);
        return true;
    }

    /**
     * @dev Decreases the allowance for a spender.
     * @param spender The address of the spender.
     * @param subtractedValue The amount of decrease in allowance.
     * @return A boolean indicating whether the decrease in allowance was successful or not.
     */

    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        uint256 currentAllowance = _allowances[msg.sender][spender];
        require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
        _approve(msg.sender, spender, currentAllowance - subtractedValue);
        return true;
    }

}