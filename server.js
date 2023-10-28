

const http = require('http');
require('fs').promises;


const server = http.createServer( async (req, res) => {
try {
    let filePath = " ";
    if (req.url === '/') {
    filePath = "index.html";
    res.setHeader('Content-Type', 'text/html');
    } else if (req.url === '/css/style.css') {
        filePath = "style.css";
        res.setHeader('Content-Type', 'text/css'); 
    } else if (req.url === '/js/script.js') {
        filePath = "script.js";
        res.setHeader('Content-Type', 'text/javascript'); 
    } 
    const data = await fs.readFile(filePath, 'utf-8'); // Reads the file
    res.statusCode = 200;
    res.end(data);

} catch (err) {
    res.statusCode = 404;
    res.end(err.message);
    console.log(err);
}

});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});  // The server starts to listen on port 3000