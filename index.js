const { fork } = require('child_process')

const processes = [
    fork('./app', ['3000']),
    fork('./app', ['3001']),
    fork('./app', ['3002'])
];

console.log(`forked ${processes.length} process`);