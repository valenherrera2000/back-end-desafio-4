const express = require('express');
const exphbs = require('express-handlebars');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', 'views');

io.on('connection', (socket) => {
    socket.on('nuevoProducto', (producto) => {
        io.emit('productoAgregado', producto);
    });

    socket.on('eliminarProducto', (idProducto) => {
        io.emit('productoEliminado', idProducto);
    });
});

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

server.listen(8080, () => {
    console.log('Servidor en ejecución en el puerto 8080');
});
