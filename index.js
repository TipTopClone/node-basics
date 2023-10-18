import express from 'express';
const app = express();

const PORT = 8000;

import path from 'path';
import fs from 'fs';

const __dirname = path.resolve();
app.use(express.urlencoded());

const fn = __dirname + '/userList.csv';

// API endpoints
app.get('/prem', (req, res) => {
  const obj = {
    message: 'server is well api',
  };
  res.json(obj);
});

// handle network request ssr

app.get('/registration', (req, res) => {
  console.log('registration', req.query);
  res.sendFile(__dirname + '/register.html');
});

app.post('/registration', (req, res) => {
  const { email, password } = req.body;

  const str = email + '|' + password + '\n';
  //store in csv file
  fs.appendFile(fn, str, (error) => {
    error
      ? console.log(error)
      : console.log('data has been written in the file');
  });

  res.send("<h1>Thank you, you are registered</h1><hr /> <a href='/'>Home</a>");
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const str = email + '|' + password;
  //reding the file and check if email and pass exist

  fs.readFile(fn, (error, data) => {
    if (error) {
      return res.send(error.message);
    }
    const users = data.toString();

    users.includes(str)
      ? res.send('Login successfully')
      : res.send('Invalid login');
  });
});

app.use('/', (req, res) => {
  //we do some server side code exe
  res.send(
    `<div><a href="/registration">Registration</a> <a href="/login">Login</a><h1 style='color:red'>Prem Bio</h1> <hr /> <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur saepe maiores tempore ullam nobis, voluptas accusamus fugit dolorem veniam veritatis vel obcaecati accusantium. Blanditiis at libero incidunt sequi officiis amet.</p> </div>`
  );
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log('your server is running at http://localhost:' + PORT);
});
