// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

/**
 * @title Owner contract to manage ownership functionality
 * @author https://gitlab.mindfire.co.in/abinash.p
 * @author https://github.com/theabinashpanda
 */
contract Owner {
    address private _owner; // Address of the owner

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /// @dev Throws if called by any account other than the owner
    modifier onlyOwner() {
        require(msg.sender == _owner, "Ownable: caller is not the owner");
        _;
    }

    /// @dev Sets the contract deployer as the initial owner
    constructor() {
        _owner = msg.sender;
        emit OwnershipTransferred(address(0), _owner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * @param newOwner The address to transfer ownership to. 
     */
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        require(newOwner != _owner, "Ownable: new owner is already the current owner");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }

    /**
     * @dev Returns the address of the current owner.
     * @return The address of the owner.
     */
    function owner() public view returns (address) {
        return _owner;
    }
}