// modulos de npm
const express = require('express');
const path    = require('path');
//const mysql   = require('mysql2');
const moment  = require('moment'); // libreria de JS para laburar con fechas
const connectionString = process.env.DATABASE_URL;
const { Client } = require('pg');

// creo el objeto app
const app = express();

const client = new Client({
  connectionString: connectionString,
  ssl: true
});

/*
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'merva',
  password: 'merva1234',
  port: 5432
});
*/
client.connect();

/*
// conexion a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'merva'
});
*/

// config de app (para que funcionen los parametros del POST)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// para que funcionen los archivos estaticos (css por ejemplo)
app.use(express.static('public'));

// config de vistas (views)
app.set('view engine', 'pug');
app.set('views', './views');

// funciones enrutadoras (routers)
// mostrar index
app.get('/', (req, res) => {
  res.render('index', { title: 'MERVA' });
});

// mostrar logs en forma de lista sacados de la DB
app.get('/logs', (req, res) => {
  // query usando el conector mysql2 (sin ORM)
  client.query(
    'SELECT * FROM logs L JOIN termografos T ON L.termografo_id = T.id ORDER BY creado DESC',
    (err, rs) => {                         // FUNCION CALLBACK DE la query
      moment.locale('es');
      for (let log of rs.rows) {
        log.creado = moment(log.creado).format('L LTS');
      }
      res.render('logs', { title: 'Logs',
                           logs: rs.rows });
    }
  );
});

// logs en formato json
app.get('/logs.json', (req, res) => {
  client.query(
    'SELECT * FROM logs',
    (err, rs) => {
      moment.locale('es');
      for (let log of rs.rows) {
        log.creado = moment(log.creado).format('L LTS');
      }
      res.json(rs.rows);
    }
  );
});

// el ultimo log de la tabla
app.get('/ultimo.json', (req, res) => {
  client.query(
    'SELECT creado, temp FROM logs ORDER BY creado DESC LIMIT 1',
    (err, rs) => {
      moment.locale('es');
      for (let log of rs.rows) {
        log.creado = moment(log.creado).format('L LTS');
      }
      res.json(rs.rows);
    }
  );
});

// uso el metodo post para cargar logs a la DB
// (vienen del formulario o del esp8266)
app.post('/logs', (req, res, next) => {
  // hago un insert usando parametros (los ?)
  //if (req.body.creado) {
    console.log(req.body.creado);
    client.query(
      'INSERT INTO logs(creado ,temp, termografo_id) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING',
      [req.body.creado, req.body.temp, req.body.termografo_id],
      (err, rs) => {
        if (err) res.send('Error');
        console.log("INSERT OK desde el ESP");
        res.send('INSERT OK')
      }
    );
  //} else {
  //  client.query(
  //    'INSERT INTO logs(temp, termografo_id) VALUES ($1,$2) ON CONFLICT DO NOTHING',
  //    [req.body.temp, req.body.termografo_id],
    //  (err, rs) => {
    //    if (err) res.send('Error');
    //    else res.send('INSERT OK');
    //  }
    //);
  //}
});

// para arrancar el servidor http
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, () => {
  console.log('Server listening on localhost:3000');
});
