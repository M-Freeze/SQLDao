"use strict";

//Bring in MySQL module and create connection object to it.
let mysql = require('mysql');
let connection = mysql.createConnection({
  host     : '0.0.0.0',
  user     : 'root',
  password : 'pass',
  database : 'data'
});

//Create connection to SQL db.
connection.connect(function(err, db) {
  if(!err) {
      console.log("Database is connected");    
  } else {
      console.log("Error connecting database");    
  }
});

//SQL DAO function to create object.
exports.create = function(id, text, isDone) {
  let query = `INSERT INTO Tasks(id, text,done) VALUES (${id},'${text}',${isDone})`;
  connection.query(query,function(err,result){
    if (err) throw err;
    console.log('in create');
    console.log(result);
  });
}

//SQL DAO function to get single object.
exports.read = function(id) {
  let query = `SELECT * FROM Tasks WHERE id=${id}`;
  connection.query(query,function(err,result){
    if (err) throw err;
    console.log('in read');
    console.log(result);
  });
}

//SQL DAO function to update object.
exports.update = function(id, text, isDone) {
  let query = `UPDATE Tasks SET text='${text}', done=${isDone} WHERE id=${id}`;
  connection.query(query,function(err,result){
    if (err) throw err;
    console.log('in update');
    console.log(result);
  });
}

//SQL DAO function to delete object.
exports.delete = function(id) {
  let query = `DELETE FROM Tasks WHERE id=${id}`;
  connection.query(query,function(err,result){
    if (err) throw err;
    console.log('in delete');
    console.log(result);
  });
}

//SQL DAO function to get a list of objects.
exports.list = function(isDone) {
  let query = `SELECT * FROM Tasks WHERE done=${isDone}`;
  connection.query(query,function(err,result){
    if (err) throw err;
    console.log('in list');
    console.log(result);
  });
}