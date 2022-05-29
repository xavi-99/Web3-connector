// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
pragma experimental ABIEncoderV2;

contract TodoList {

    constructor() {
    }
    // Struct used to define Task object
    struct Task {
        bytes32 Identifier;
        string Name;
        State Status;
    }

    // Fixed values for Task status
    enum State {
        TO_DO,
        IN_PROGRESS,
        DONE
    }

    mapping(bytes32 => Task) tasks;
    Task [] taskList;

    function addTask(string memory _name, State _status) public {
        // Generate hash as Identifier from name and status
        bytes32 hash_idTask = keccak256(abi.encodePacked(_name, _status));
        // Create Task item
        Task memory task = Task(hash_idTask,_name, _status);
        //Store this task in our mapping
        tasks[hash_idTask] = task;
        // Add this new task inside our array
        taskList.push(task);
    }


    function getTask(bytes32 task_hash) public view returns (Task memory) {
        return tasks[task_hash];
    }

    function updateTask(bytes32 task_hash,string memory _taskName ,State _status) public {
        // Update name and status from task hash
        tasks[task_hash] = Task(task_hash,_taskName,_status);
        // Iterate a task list to update the one matching with the task_hash
        for(uint i=0;i<taskList.length;i++){
            if(taskList[i].Identifier == task_hash){
                taskList[i].Name = _taskName;
                taskList[i].Status = _status;
                // break the loop to reduce the computational cost
                break;
            }
        }
    }

    function sayHello() public pure returns (string memory) {
        return 'Hello';
    }

    function getTaskList() public view returns (Task[] memory){
        return taskList;
    }
}
