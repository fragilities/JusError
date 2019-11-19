const express = require('express')
const app = express()
const PORT = 3000

const JuiceRouter = require('./routers/JuiceRouter')

app.listen(PORT, () => console.log(`listening on port ${PORT}`))

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.use('/juice', JuiceRouter)

