import { express } from 'expnress';
import path from 'path'
// var fileupload = require("express-fileupload");
// import express
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile("index.html", {root: path.join(__dirname)})
})

app.listen(port, () => {
  console.log(`Example app listening on port http//localhost:${port}`)
})

