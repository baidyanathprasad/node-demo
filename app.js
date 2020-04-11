const http = require('http');
const fs = require('fs')

const server = http.createServer((req, res) => {
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
})


server.listen(3000);
console.log('Listening on port 3000..')