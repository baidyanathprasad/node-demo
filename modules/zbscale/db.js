const { LocalStorage } = require('node-localstorage')
const path = require('path')

// get DB Instance
const db = new LocalStorage(path.resolve('data'));


// load requests data
const loadRequests = () => db.getItem("requests");

// load users data
const loadUsers = () => JSON.parse(db.getItem("users") || '[]');

const hasUsers = name => loadUsers()
    .map(user => user.name)
    .includes(name)


module.exports = {

    getRequestsCount() {
        return loadRequests();
    },

    incrementRequestCount() {
        let requestsCount = loadRequests();
        db.setItem("requests", ++requestsCount) 
    },

    addUser(newUser) {
        if(!hasUsers(newUser.name)) { 
            let users = loadUsers();
            users.push(newUser);
            db.setItem("users", JSON.stringify(users, null, 2));
        }
    },

    findUserByName(name) {
        let users = loadUsers();
        return users.find(user => user.name === name);
    },

    findUsersByAge(age) {
        let users = loadUsers();
        return users.find(user => user.age === age)
    }, 

    getUsers() { 
        return loadUsers();
    }

}    
