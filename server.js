const express = require('express')
const request = require('request')
const cors = require('cors')
const path = require('path')

function format(body) {
    var stock = JSON.parse(body)
    var ratio = {}
    var labels = process.env.LABELS || [
        "Mar 14",
        "Mar 15",
        "Mar 16",
        "Mar 17",
        "Mar 18"
    ]

    for (var i in labels) {
        var key = labels[i]
        for (var type in stock.ratio[key]) {
            if (!ratio[type]) {
                ratio[type] = []
            }
            ratio[type].push(stock.ratio[key][type])
        }
    }

    return {
        name: stock.name,
        id: stock.id,
        labels: labels,
        ratio: ratio
    }
}

var baseUrl = process.env.BASE_URL || "http://localhost:5000"
console.log("Base URL:", baseUrl)

const app = express()
app.use(cors())

app.get('/stocks', (req, res) => request(baseUrl).pipe(res))
app.get('/stocks/:stockId', 
    (req, res) => {
        var path = baseUrl + "/" + req.params.stockId
        request(path, (error, response, body) => res.send(format(body)))
    })
app.use('/', express.static(path.join(__dirname, 'dist')))


var port = process.env.PORT || 3000
app.listen(port, () => console.log('Example app listening on port 3000!'))