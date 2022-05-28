const TodoList = artifacts.require('TodoList')
module.exports = (deployer) => {
    deployer.deploy(TodoList)
    // Additional contracts can be deployed here
}
