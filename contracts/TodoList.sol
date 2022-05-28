// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
pragma experimental ABIEncoderV2;

contract TodoList {
    address _owner;
    uint32 _taskCounter;

    constructor() {
        _owner = msg.sender;
        _taskCounter = 0;
    }

    struct Task {
        string Name;
        State Status;
    }

    enum State {
        TO_DO,
        IN_PROGRESS,
        DONE
    }
    mapping(bytes32 => Task) tasks_byHash;
    Task[] tasks;

    function addTask(string memory _name, State _status) public {
        Task memory task = Task(_name, _status);
        bytes32 hash_idTask = keccak256(abi.encodePacked(_name, _status));
        tasks_byHash[hash_idTask] = task;
    }

    function getTask(bytes32 _hash_idTask) public view returns (Task memory) {
        return tasks_byHash[_hash_idTask];
    }

    function sayHello() public pure returns (string memory) {
        return 'Hello';
    }
}
