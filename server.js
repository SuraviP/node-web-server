var express=require('express');
var hbs=require('hbs');
var fs=require('fs');

var app=express();

hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');



app.use((req,res,next)=>{
	var now=new Date().toString();
	var log=`${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log,(err)=>{
		if(err){
			console.log('unable to append to server.log');
		}
	});

	next();
});

app.use((req,res,next)=>{
	res.render('maintenance.hbs');
});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getcurrentyear',()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamit',(text)=>{
	return text.toUpperCase();
});

app.get('/',(req,res)=>{
	res.render('home.hbs',{
		pagetitle: 'Home Page',
		welcmsg:'welcome and enjoy',
		
	});
});

app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		pagetitle: 'About Page'
	});
});

app.get('/err',(req,res)=>{
	res.send({
		errmsg:'contact dumbledore'
	});
});

app.listen(3000,()=>{
	console.log('Server is up on port 3000');
});