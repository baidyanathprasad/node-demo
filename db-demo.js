const http = require('http')
const { LocalStorage } = require('node-localstorage')

// get DB Instance
const db = new LocalStorage('./data');


const server  = http.createServer((req, res) => {
    if (req.url === '/'){
        // get data
        let requests = db.getItem('requests');

        // increament the count and update in the Db
        db.setItem('requests', ++requests);

        console.log(`${process.pid}: ${requests}`);
        res.end(JSON.stringify(requests));

        res.end(JSON.stringify('Hello, World!'))
    }
})

server.listen(3000);

console.log(`counting requests`);


