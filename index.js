const express = require("express");
const mysql = require("mysql");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  console.log(require("dotenv").config());
}

//create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected...");
});

const app = express();

//create db
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database created...");
  });
});

//create table
app.get("/createpoststable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Posts table created...");
  });
});

//insert post 1
app.get("/addpost1", (req, res) => {
  let post = { title: "Post One", body: "This is my first post" };
  let sql = "INSERT INTO posts SET ?"; //the question mark is like a place holder for post below
  db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post one created...");
  });
});

//insert post 2
app.get("/addpost2", (req, res) => {
  let post = { title: "Post Two", body: "This is my second post" };
  let sql = "INSERT INTO posts SET ?"; //the question mark is like a place holder for post below
  db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post two created...");
  });
});

//select posts
app.get("/getposts", (req, res) => {
  let sql = "SELECT * FROM posts";
  db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send("Posts fetched...");
  });
});

/*
in an application setting you can use a template engine like EJS or Handlebars.
you would make your query and grab onto the result param below and you would 
pass it into your template and loop though those and output the results.
*/

//select single post
app.get("/getpost/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`; //back ticks allow us to put a variable in the query
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Single post fetched...");
  });
});

//update post
app.get("/updatepost/:id", (req, res) => {
  let newTitle = "Updated Title";
  let sql = `UPDATE posts SET title = "${newTitle}" WHERE id = ${req.params.id}`; //back ticks allow us to put a variable in the query
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post updated...");
  });
});

//delete post
app.get("/deletepost/:id", (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`; //back ticks allow us to put a variable in the query
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post deleted...");
  });
});

//so this info is useful to build any CRUD application or restful api

//another option besides the mysql package is the sequelize ORM

app.listen("3000", () => {
  console.log("Server running on port 3000!");
});
