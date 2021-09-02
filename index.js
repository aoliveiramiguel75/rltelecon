const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const port = 3000;
var path = require('path');
const app = express();

const users = [{
  _id: 1,
  username: "miguel",
  password: "1234"
},
{
  _id: 2,
  username: "gabriel",
  password: "123"
},
{
  _id: 3,
  username: "admin",
  password: "789"
},
];


app.use(session({
  secret: "qualquercoisaaqui",
  resave: false,
  saveUninitialized: false,
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));



app.post('/', (req, res) => {
  if (users.find(user => user.password == req.body.password && user.username == req.body.username && user._id === 1)) {

    req.session.users = users;
    res.render('logado');
  }
  else if(users.find(user => user.password == req.body.password && user.username == req.body.username && user._id === 2)) {
    req.session.users = users;
    res.render('Rltelecon');
  }

  else if(users.find(user => user.password == req.body.password && user.username == req.body.username && user._id === 3)) {
    req.session.users = users;
    res.render('Rltelecon');

  } else {
    res.render('index', { message: 'Usuário e/ou senha incorretos!' });
  }
});

app.get('/', (req, res) => {
  if (req.query.fail)
    res.render('index', { message: 'Usuário e/ou senha incorretos!' });
  else
    res.render('index', { message: null });

})

app.listen(port, () => {
  console.log('servidor rodando')
})
