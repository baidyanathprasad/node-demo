const http = require('http');
const fs = require('fs')

const port = parseInt(process.argv[2] || '3000');

const options = [
    'I can not help you!',
    'Sure, I will help you',
    'Go, this way',
    'Go, that way'
];

const server = http.createServer((req, res) => {

        // Home page as Hello People
        if(req.url === '/'){
            fs.readFile('resource/MyPage.html', (err, pageResp) => {
                if(err){
                    res.writeHead(404);
                    res.write('NOT FOUND!');
                }
                if(pageResp){
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(pageResp);
                }
                res.end();
            })            
        }
        // New endpoint `help` which provides random advi
        else if (req.url == '/help'){
            const randomIndex = Math.floor(Math.random() * options.length);
            const resModel = JSON.stringify({
                port,
                processID: process.pid,
                advice: options[randomIndex]
            })

            res.writeHead(200, {'Content-Type': 'text/json'});
            res.write(resModel)
            res.end();
        }
})


server.listen(port);
console.log(`Listening on port ${port}..`)