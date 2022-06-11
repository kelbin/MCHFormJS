let express = require('express')
let http = require('http')
let nunjucks = require('nunjucks')
let path = require('path')
let sassMiddleware = require('node-sass-middleware')

let app = express()

nunjucks.configure('views', {
    autoescape: true,
    express: app
})

app.use(sassMiddleware({
    src: path.join(__dirname,  'bootstrap'),
    dest: path.join(__dirname, 'public'), 
    indentedSyntax: true, 
    sourceMap: true
}))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req,res,next) {
    let data = {
        content: 'Hello World!', 
        title: 'Example'
    }

    res.render('index.njk', data)
})

let server = http.createServer(app)

server.listen('3042', () => {
    console.log('Listening on port 3042')
  })

