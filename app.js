let express = require('express')
let http = require('http')
let nunjucks = require('nunjucks')
let path = require('path')
let livereload = require('livereload')
let connectLivereload = require('connect-livereload')
let sassMiddleware = require('node-sass-middleware')
let bodyParser = require('body-parser')

let app = express()

let liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "views"));

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 50);
  });

nunjucks.configure('views', {
    autoescape: true,
    express: app
})

app.use(connectLivereload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
        title: 'MCH'
    }

    res.render('index.njk', data)
})

app.post('/send', function(req, res) {
    console.log(req.body)
})

let server = http.createServer(app)

server.listen('3046', () => {
    console.log('Listening on port 3046')
  })

