// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title ERC20 Token Interface
 * @dev Interface for ERC20 token standard.
 *      For more details, see: https://eips.ethereum.org/EIPS/eip-20
 * @author https://gitlab.mindfire.co.in/abinash.p
 * @author https://github.com/theabinashpanda
 */

interface IERC20 {

    /**
     * @dev Returns the total token supply.
     */

    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the balance of the specified account.
     * @param account The address of the account to query the balance of.
     */

    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Transfers tokens from the caller's account to another account.
     * @param recipient The address of the recipient.
     * @param amount The amount of tokens to transfer.
     * @return A boolean indicating whether the transfer was successful or not.
     */

    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that the spender is allowed to spend on behalf of the owner.
     * @param owner The address of the owner.
     * @param spender The address of the spender.
     */

    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets the allowance for a spender.
     * @param spender The address of the spender.
     * @param amount The amount of tokens to be approved.
     * @return A boolean indicating whether the approval was successful or not.
     */

    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Transfers tokens from one account to another using the allowance mechanism.
     * @param sender The address of the sender.
     * @param recipient The address of the recipient.
     * @param amount The amount of tokens to transfer.
     * @return A boolean indicating whether the transfer was successful or not.
     */

    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Emitted when tokens are transferred from one account to another.
     * @param from The address of the sender.
     * @param to The address of the recipient.
     * @param value The amount of tokens transferred.
     */

    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a spender for an owner is set by the owner.
     * @param owner The address of the owner.
     * @param spender The address of the spender.
     * @param value The amount of tokens allowed.
     */

    event Approval(address indexed owner, address indexed spender, uint256 value);

}