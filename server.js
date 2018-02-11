const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine', 'hbs');
app.use((req,res,next)=>{
    let now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log',log+'\n',(error)=>{
        if(error){
            console.log('Something went wrong.')
        }
    })
    next();
});

// app.use((req,res)=>{
//     res.render('maintenance')
// });

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(`${__dirname}/views/partials`);
hbs.registerHelper('date',()=>{
    return new Date().getFullYear();
})

// routes
app.get('/',(req,res)=>{
    res.render('home',{
        date : new Date().getUTCFullYear()
    })
});

app.get('/about', (req,res)=>{
    res.render('about',{
        friends : [
            {name :'aditya'},
            {name :'aman'},
            {name :'him'},
            {name :'nip'},
        ],
        date : new Date().getUTCFullYear()
    })
})

app.get('/error',(req,res)=>{
    res.send({
        errorMessage: 'Unable to connect',
        name : 'Aditya',
        likes: [
            'Football',
            'Philosophy',
            'History',
            'Books'
        ]
    })
});

app.get('/bad',(req,res)=>{
    res.send('bad res');
});

app.get('/bad/:id',(req,res)=>{
    res.send(req.params.id)
});

app.get('*',(req,res)=>{
    res.send('Error 404')
});

// listen
app.listen(3000,()=>{
    console.log('Server is up and running at localhost:3000')
});