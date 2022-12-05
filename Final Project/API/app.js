const express = require('express')

const app = express()

app.use(
express.json({
limit: '50mb'
})
)

app.use(express.json())


app.use('/API/V1/', require('./routes/apiRoutes'))


// This should be the last route else any after it won't work
app.use('*', (req, res) => {
res.status(404).json({
success: 'false',
message: 'Page not found',
error: {
statusCode: 404,
message: 'You reached a route that is not defined on this server'
}
})
})
const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`))