const express=require("express")
const router=require("./route/router.js")
const app=express()
const host='192.168.100.46'
const port=3000
const cors = require('cors')

app.use(cors({
  origin: 'http://localhost:5173'
}))
app.use(express.json())
app.use("/", router)


const server=app.listen(port, host, ()=>{
    console.log(`Servidor conectado em http://${host}:${port}`)
})

server.on('error', (err)=>{
    console.log(err);
    process.exit(1)
})