const functions = require('firebase-functions');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

bodyParser.urlencoded({extended:true});
bodyParser.json();
const app = express();
app.use(cors({ origin: true }));
app.use('/api',require("./router/apis.router"));

app.get('/',(req,res)=>{
res.send("ok")
})

exports.app = functions.https.onRequest(app);
