const http = require('http')
const db = require('./db')

const server  = http.createServer((req, res) => {
    if (req.url === '/'){
        // get data
        let requests = db.getRequestsCount();

        // increament the count and update in the Db
        db.incrementRequestCount();

        console.log(`${process.pid}: ${requests}`);
        res.end(JSON.stringify(requests));

        res.end(JSON.stringify('Hello, World!'))
    }
    else if(req.url === '/addUser') {
        db.addUser({name: 'Ram', age: '20'});
        db.addUser({name: 'Shyam', age: '222'});
        db.addUser({name: 'Sita', age: '28'});
        db.addUser({name: 'Laxman', age: '26'});
        db.addUser({name: 'Bharat', age: '27'});
        db.addUser({name: 'Shatrughan', age: '24'});

        res.end(JSON.stringify('user added'));
    }
    else if(req.url === '/getUsers') {
        console.log(db.getUsers());
        res.end(JSON.stringify(db.getUsers()));
    }
})

server.listen(3000);
console.log('Listening on 3000...')


