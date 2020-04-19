const http = require('http')
const cluster = require('cluster')
const cpus = require('os')

// No. of CPUs info
const noOfCpus = cpus.cpus().length;


// check if the the cluster is master
if(cluster.isMaster){
    console.log('This is a master cluster...', process.pid);

    // fork the worker here
    for(let i = 0; i < noOfCpus; i++){
        cluster.fork();
    }
}
else {
    http.createServer((req, res) => {
        const message = `Worker ${process.pid}`;
        console.log(message);
        res.end(message);
    }).listen(3000);
}


