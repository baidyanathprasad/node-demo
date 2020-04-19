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

    // on exit process
    cluster.on('exit', worker => {
        console.log(`worker process ${process.pid} had died`);

        // show no of remaining worker
        console.log(`only ${Object.keys(cluster.workers).length} remaining`);

        //start new worker
        console.log(`starting new worker`);
        cluster.fork();
    })
}
else {
    console.log(`started a worker at ${process.pid}`);
    http.createServer((req, res) => {
        res.end(`Process: ${process.pid}`);

        if(req.url === '/kill'){
            process.exit();
        } 
        else if (req.url === '/'){
            console.log(`servering from ${process.pid}`);
        }
    }).listen(3000);
}


