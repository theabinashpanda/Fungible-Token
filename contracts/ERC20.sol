// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {IERC20} from "./IERC20.sol";
import {Owner} from "./Ownable.sol";

/**
 * @title ERC20 Token Implementation
 * @dev This contract implements the ERC20 standard token functionality.
 *      For more details, refer to: https://eips.ethereum.org/EIPS/eip-20
 * @author https://gitlab.mindfire.co.in/abinash.p
 * @author https://github.com/theabinashpanda
 */
contract ERC20Token is IERC20,Owner {
    string private _name; // Token name
    string private _symbol; // Token symbol
    uint256 private _totalSupply; // Total token supply
    uint256 private constant MAX_SUPPLY = 1000000 * 10 ** 18; // Maximum supply
    mapping(address => uint256) private _balances; // Balances of token holders
    mapping(address => mapping(address => uint256)) private _allowances; // Allowances for token spending

    /**
    * @dev Modifier to ensure that the specified amount is not zero.
    * @param amount The amount to be checked.
    */
    modifier notZeroAmount(uint256 amount) {
        require(amount > 0, "ERC20: Amount should be greater than 0");
        _;
    }

    /**
     * @dev Modifier to ensure total supply does not exceed maximum supply.
     */
    modifier withinMaxSupply(uint256 amount) {
        require(_totalSupply + amount <= MAX_SUPPLY, "ERC20: Total supply exceeds maximum supply");
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
    ) withinMaxSupply(initialSupply_) Owner(){
        require(initialSupply_ > 0,"ERC20: Value less than or equal to 0");
        _name = name_; // Set the name of the token
        _symbol = symbol_; // Set the symbol of the token
        _totalSupply = initialSupply_;
        _balances[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
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
    function approve(address spender, uint256 amount) public notZeroAmount(amount) returns (bool) {
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
     * @dev Mints `amount` tokens to `account`, increasing the total supply.
     * @notice Only the owner of the contract can perform this operation.
     * 
     * Requirements:
     *      `account` cannot be the zero address.
     *      The caller cannot mint tokens to themselves.
     *      The minted amount must be within the maximum token supply limit and cannot be 0.
     *      
     * @notice Emits a {Transfer} event from the zero address to account.
     * @param account The address to which the tokens will be minted.
     * @param amount The amount of tokens to mint.
     */
    function mint(address account, uint256 amount) public onlyOwner withinMaxSupply(amount) {
        require(account != address(0), "ERC20: Cannot mint to zero address");
        require(msg.sender != account, "ERC20: Cannot mint to self");
        require(amount > 0, "ERC20: Amount cannot be 0");
        _totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);
    }

    /**
     * @dev Internal function to transfer tokens from one account to another.
     * @param sender The address of the sender.
     * @param recipient The address of the recipient.
     * @param amount The amount of tokens to transfer.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal notZeroAmount(amount){
        require(sender != recipient, "ERC20: cannot transfer to self");
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
        require(from != spender, "ERC20: cannot approve self");
        require(spender != address(0), "ERC20: approve to the zero address");
        _allowances[from][spender] = amount;
        emit Approval(from, spender, amount);
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
     * @dev Returns the number of decimal places for the token.
     */
    function decimals() public pure returns (uint8) {
        return 18;
    }

}