
const net = require('net')
const server = net.createServer((c) => {
    console.log('Client Connected')

    c.on('end', () => {
        console.log('Client disconnected')
    })

    c.write('Hello World !\n')
    c.pipe(c)

})

server.listen(8080, () => {
    console.log('Server is running on http://localhost:8080/')
})