import { express } from 'expnress';
import path from 'path'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile("index.html", {root: path.join("./")})
})

app.listen(port, () => {
  console.log(`Example app listening on port http//localhost:${port}`)
})