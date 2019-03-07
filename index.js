var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


//add sample task
var task = ["buy stocks", "practise with nodejs"];

//post route for adding new task
app.post('/addtask', function(req,res){
	var newTask = req.body.newtask;


//add new task to the array
task.push(newTask);

//redirect to main page after successful operation
res.redirect("/");

});

//the completed task array with initial placeholders for removed task
var complete = ["finish jquery"];

app.post("/removetask", function(req, res) {
     var completeTask = req.body.check;

//check for the "typeof" the different completed task, then add into the complete task
if (typeof completeTask === "string") {
     complete.push(completeTask);

//check if the completed task already exist in the task when checked, then remove using the array splice method
  task.splice(task.indexOf(completeTask), 1);

  } else if (typeof completeTask === "object") {
    for (var i = 0; i < completeTask.length; i++) {     
    	complete.push(completeTask[i]);
    	task.splice(task.indexOf(completeTask[i]), 1);
	}
}
   res.redirect("/");
});

app.get('/', function(req,res) {
	//res.send('Hello World');
	res.render("index",{task:task});
});


app.listen(3000, function(){
	console.log('Example app listening on port 3000!');
});

app.set('view engine', 'ejs');