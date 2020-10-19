var express = require ("express");

var app = express();

let path = require("path");
var PORT = 3000; 

app.use(express.urlencoded({extended :true}));
app.use(express.json());

var reservaciones = [];
var waitlist = [];


app.get("/", function(req,res){
	 res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req,res){
	 res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req,res){
	 res.sendFile(path.join(__dirname, "reserve.html"));
});

app.post("/api/tables", function(req,res){
	 var newReserv =req.body;
	 if (reservaciones.length < 3){
	 	reservaciones.push(newReserv);
	 	return res.json(true);
	 } else{
	 	waitlist.push(newReserv);
	 	return res.json(false);
	 }
});

app.get("/api/waitlist", function(req,res){
	return res.json(waitlist);
});

app.get("/api/tables",function(req,res){
	return res.json(reservaciones);
});

app.post("/api/clear", function(req,res){
    reservaciones = [];
    waitlist = [];
})
app.listen(PORT, function(){
	console.log("APP listening on PORT" + PORT);
});