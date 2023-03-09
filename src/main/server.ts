import express from 'express'

const app = express()
app.listen(5050, () => {
    console.log('server running at http://localhost:5050');
    
})