const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const passport = require('passport');
const session = require('express-session');
const {v4:uuidv4} = require("uuid");


const app= express();

const PORT = process.env.PORT || 3000;

// for converting res content to json file 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true})); 

// for exporting static files 
app.use(express.static('Public'));
app.use(express.static('Images'));
app.use(express.static(path.join(__dirname,'views')));


// setting ejs templating engine
app.set('view engine','ejs');
app.set('views','views');



// Set up session middleware
app.use(session({
    secret: uuidv4(), // Use the generated session secret
    resave: false,
    saveUninitialized: true
}));


// //home page
app.get('/',(req,res,next)=>{
    res.render('index',{
        pageTitle:'Home',
        path:'sideHub/home'
    });
    
});

// login page
app.get('/login', (req, res, next) => {
    res.render('login', {
        pageTitle: 'login',
        path: 'sideHub/home/login'
    });
});

 // Registration route
app.route('/register')
app.get((req, res,next) => {
    res.render('register',{
        pageTitle:'register',
        path:'sideHub/home/nav'
    })
});


    
app.post('/login-customer', (req, res) => {
    const credential = {
        username: 'admin@gmail.com',
        password: 'admin123'
    }
    if (req.body.username == credential.username && req.body.password == credential.password) {
        req.session.user = req.body.username;
        res.redirect('/home');
        console.log("login to page");
    }
    else {
        res.end("Invalid username or password!!");
    }
});

// choice page for new user
app.get('/nav',(req,res,next)=>{
    res.render('nav',{
         pageTitle:'navigation',
         path:'sideHub/home/nav'
    });
})

//sign up page 
app.get('/sign-up',(req,res,next)=>{
    res.render('signup',{
         pageTitle:'sign-up',
         path:'sideHub/home/nav'
    });
})


//home page 
app.get('/home',(req,res,next)=>{
    res.render('home',{
         pageTitle:'Home',
         path:'sideHub/home',
         username:req.body.username
    });
})

//logout page 
app.get('/logout',(req,res,next)=>{
    res.render('index',{
        pageTitle:'Home'
    });
    console.log("logout sucessfully!!!");
    // res.sendStatus("logout sucessfully!!!")
    });

app.get('/categories',(req,res,next)=>{
    res.render('categories',{
        pageTitle:'categories'
    });
});
  

// Create a database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'sideHub'
});

// Establish the connection
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

//insert sign-up data into database for user (customer)
app.post('/signup-user', (req, res) => {
    const { username, email, password } = req.body;
    
    // Perform validation, e.g., check for empty fields, valid email, etc.
    // Hash the password (use a library like bcrypt for security)

    // Insert data into the MySQL database
    const query = 'INSERT INTO customer (username, email, password) VALUES (?, ?, ?)';
    connection.query(query, [username, email, hashedPassword], (err, results) => {
        if (err) {
            console.error('Error inserting data into the database:', err);
            res.status(500).send('Error inserting data');
        } else {
            res.redirect('/login'); // Redirect to login page or a success page
        }
    });
});

//insert sign-up data into database for service provider
app.post('/signup-service', (req, res) => {
    const { username, email, password } = req.body;
    
    // Insert data into the MySQL database
    const query = 'INSERT INTO service_provider (username, email, password) VALUES (?, ?, ?)';
    connection.query(query, [username, email, hashedPassword], (err, results) => {
        if (err) {
            console.error('Error inserting data into the database:', err);
            res.status(500).send('Error inserting data');
        } else {
            res.redirect('/login'); // Redirect to login page or a success page
        }
    });
});

app.get('/services',(req,res,next)=>{
    res.render('services',{
        pageTitle:'services'});

    if(url==='/services/electrician'){
        
    }
});
  
// electrician


app.get('/services/electrician', (req, res) => {
    const selectedCategory = req.query.category; // Assuming you pass the category as a query parameter
    // Use the selectedCategory to filter the database query.
    const query = 'SELECT * FROM services WHERE type = "electrician" ';
    connection.query(query, [selectedCategory], (err, results) => {
        if (err) {
            console.error('Error fetching data from the database:', err);
            res.status(500).send('Error fetching data');
        } else {
            res.json(results); // Send the filtered data as JSON response
        }
    });
});

// packers
app.get('/services/packers', (req, res) => {
    const selectedCategory = req.query.category; // Assuming you pass the category as a query parameter
    // Use the selectedCategory to filter the database query.
    const query = 'SELECT * FROM services WHERE type = "packers" ';
    connection.query(query, [selectedCategory], (err, results) => {
        if (err) {
            console.error('Error fetching data from the database:', err);
            res.status(500).send('Error fetching data');
        } else {
            res.json(results); // Send the filtered data as JSON response
        }
    });
});

//food
app.get('/services/food', (req, res) => {
    const selectedCategory = req.query.category; // Assuming you pass the category as a query parameter
    // Use the selectedCategory to filter the database query.
    const query = 'SELECT * FROM services WHERE type = "food" ';
    connection.query(query, [selectedCategory], (err, results) => {
        if (err) {
            console.error('Error fetching data from the database:', err);
            res.status(500).send('Error fetching data');
        } else {
            res.json(results); // Send the filtered data as JSON response
        }
    });
});


//housekeeping
app.get('/services/housekeeping', (req, res) => {
    const selectedCategory = req.query.category; // Assuming you pass the category as a query parameter
    // Use the selectedCategory to filter the database query.
    const query = 'SELECT * FROM services WHERE type = "housekeeping" ';
    connection.query(query, [selectedCategory], (err, results) => {
        if (err) {
            console.error('Error fetching data from the database:', err);
            res.status(500).send('Error fetching data');
        } else {
            res.json(results); // Send the filtered data as JSON response
        }
    });
});

//beauty
app.get('/services/beauty', (req, res) => {
    const selectedCategory = req.query.category; // Assuming you pass the category as a query parameter
    // Use the selectedCategory to filter the database query.
    const query = 'SELECT * FROM services WHERE type = "beauty" ';
    connection.query(query, [selectedCategory], (err, results) => {
        if (err) {
            console.error('Error fetching data from the database:', err);
            res.status(500).send('Error fetching data');
        } else {
            res.json(results); // Send the filtered data as JSON response
        }
    });
});

//driver
app.get('/services/driver', (req, res) => {
    const selectedCategory = req.query.category; // Assuming you pass the category as a query parameter
    // Use the selectedCategory to filter the database query.
    const query = 'SELECT * FROM services WHERE type = "driver" ';
    connection.query(query, [selectedCategory], (err, results) => {
        if (err) {
            console.error('Error fetching data from the database:', err);
            res.status(500).send('Error fetching data');
        } else {
            res.json(results); // Send the filtered data as JSON response
        }
    });
});

//repair
app.get('/services/repair', (req, res) => {
    const selectedCategory = req.query.category; // Assuming you pass the category as a query parameter
    // Use the selectedCategory to filter the database query.
    const query = 'SELECT * FROM services WHERE type = "repair" ';
    connection.query(query, [selectedCategory], (err, results) => {
        if (err) {
            console.error('Error fetching data from the database:', err);
            res.status(500).send('Error fetching data');
        } else {
            res.json(results); // Send the filtered data as JSON response
        }
    });
});

//pestcontrol 
app.get('/services/pestcontrol', (req, res) => {
    const selectedCategory = req.query.category; // Assuming you pass the category as a query parameter
    // Use the selectedCategory to filter the database query.
    const query = 'SELECT * FROM services WHERE type = "pestcontrol" ';
    connection.query(query, [selectedCategory], (err, results) => {
        if (err) {
            console.error('Error fetching data from the database:', err);
            res.status(500).send('Error fetching data');
        } else {
            res.json(results); // Send the filtered data as JSON response
        }
    });
});

//plumber
app.get('/services/plumber', (req, res) => {
    const selectedCategory = req.query.category; // Assuming you pass the category as a query parameter
    // Use the selectedCategory to filter the database query.
    const query = 'SELECT * FROM services WHERE type = "plumber" ';
    connection.query(query, [selectedCategory], (err, results) => {
        if (err) {
            console.error('Error fetching data from the database:', err);
            res.status(500).send('Error fetching data');
        } else {
            res.json(results); // Send the filtered data as JSON response
        }
    });
});

//painter
app.get('/services/painter', (req, res) => {
    const selectedCategory = req.query.category; // Assuming you pass the category as a query parameter
    // Use the selectedCategory to filter the database query.
    const query = 'SELECT * FROM services WHERE type = "painter" ';
    connection.query(query, [selectedCategory], (err, results) => {
        if (err) {
            console.error('Error fetching data from the database:', err);
            res.status(500).send('Error fetching data');
        } else {
            res.json(results); // Send the filtered data as JSON response
        }
    });
});

//waterproofing
app.get('/services/waterproofing', (req, res) => {
    const selectedCategory = req.query.category; // Assuming you pass the category as a query parameter
    // Use the selectedCategory to filter the database query.
    const query = 'SELECT * FROM services WHERE type = "waterproofing" ';
    connection.query(query, [selectedCategory], (err, results) => {
        if (err) {
            console.error('Error fetching data from the database:', err);
            res.status(500).send('Error fetching data');
        } else {
            res.json(results); // Send the filtered data as JSON response
        }
    });
});



//error page
app.use((req,res,next)=>{
    res.status(404).render('404');
    res.end();
  });


app.listen(PORT,()=>{
    console.log('Listning on port:',`${PORT}`);
  });
