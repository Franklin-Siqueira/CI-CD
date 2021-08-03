# Original Article

*QUICK SUMMARY* In this article, we will create a set of API endpoints using Express from scratch in ES6 syntax, and cover some development best practices. Find out how all the pieces work together as you create a small project using Continuous Integration and Test-Driven Development before deploying to Heroku.

We will take a Test-Driven Development (TDD) approach and the set up Continuous Integration (CI) job to automatically run our tests on Travis CI and AppVeyor, complete with code quality and coverage reporting. We will learn about controllers, models (with PostgreSQL), error handling, and asynchronous Express middleware. Finally, we’ll complete the CI/CD pipeline by configuring automatic deploy on Heroku.

It sounds like a lot, but this tutorial is aimed at beginners who are ready to try their hands on a back-end project with some level of complexity, and who may still be confused as to how all the pieces fit together in a real project.

It is robust without being overwhelming and is broken down into sections that you can complete in a reasonable length of time.

Getting Started #
The first step is to create a new directory for the project and start a new node project. Node is required to continue with this tutorial. If you don’t have it installed, head over to the official website, download, and install it before continuing.

I will be using yarn as my package manager for this project. There are installation instructions for your specific operating system here. Feel free to use npm if you like.

## Hands on

Open your terminal, create a new directory, and start a Node.js project.

```
# create a new directory
mkdir express-api-template

# change to the newly-created directory
cd express-api-template

# initialize a new Node.js project
npm init

```

Answer the questions that follow to generate a package.json file. This file holds information about your project. Example of such information includes what dependencies it uses, the command to start the project, and so on.

You may now open the project folder in your editor of choice. I use visual studio code. It’s a free IDE with tons of plugins to make your life easier, and it’s available for all major platforms. You can download it from the official website.

Create the following files in the project folder:

 README.md
.editorconfig

Here’s a description of what .editorconfig does from the EditorConfig website. (You probably don’t need it if you’re working solo, but it does no harm, so I’ll leave it here.)

“EditorConfig helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.”

Open .editorconfig and paste the following code:

```
root = true
[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = false
insert_final_newline = true
```

The [*] means that we want to apply the rules that come under it to every file in the project. We want an indent size of two spaces and UTF-8 character set. We also want to trim trailing white space and insert a final empty line in our file.

Open README.md and add the project name as a first-level element.

** # Express API template **

# initialize the project folder as a git repository

```
git init
```
Create a .gitignore file and enter the following lines:

```
node_modules/
yarn-error.log
.env
.nyc_output
coverage
build/
```

### These are all the files and folders we don’t want to track. We don’t have them in our project yet, but we’ll see them as we proceed.

At this point, you should have the following folder structure.

EXPRESS-API-TEMPLATE
├── .editorconfig
├── .gitignore
├── package.json
└── README.md

I consider this to be a good point to commit my changes and push them to GitHub.

### Starting A New Express Project 

Express is a Node.js framework for building web applications. According to the official website, it is a

*** "Fast, unopinionated, minimalist web framework for Node.js." ***

There are other great web application frameworks for Node.js, but Express is very popular, with over 47k GitHub stars at the time of this writing.

In this article, we will not be having a lot of discussions about all the parts that make up Express. For that discussion, I recommend you check out Jamie’s series. The first part is here, and the second part is here.

Install Express and start a new Express project. It’s possible to manually set up an Express server from scratch but to make our life easier we’ll use the **express-generator** to set up the app skeleton.

```
# install the express generator globally
yarn global add express-generator

# install express
yarn add express

# generate the express project in the current folder
express -f
```
The -f flag forces Express to create the project in the current directory.

We’ll now perform some house-cleaning operations.

1. Delete the file index/users.js.
2. Delete the folders public/ and views/.
3. Rename the file bin/www to bin/www.js.
4. Uninstall jade with the command yarn remove jade.
5. Create a new folder named src/ and move the following inside it: 1. app.js file 2. bin/ folder 3. routes/ folder inside.
6. Open up package.json and update the start script to look like below.

```
"start": "node ./src/bin/www"
```

At this point, your project folder structure looks like below. You can see how VS Code highlights the file changes that have taken place.

EXPRESS-API-TEMPLATE
├── node_modules
├── src
|   ├── bin
│   │   ├── www.js
│   ├── routes
│   |   ├── index.js
│   └── app.js
├── .editorconfig
├── .gitignore
├── package.json
├── README.md
└── yarn.lock

Open src/app.js and replace the content with the below code.

```
var logger = require('morgan');
var express = require('express');
var cookieParser = require('cookie-parser');
var indexRouter = require('./routes/index');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', indexRouter);

module.exports = app;
```

After requiring some libraries, we instruct Express to handle every request coming to /v1 with indexRouter.

Replace the content of routes/index.js with the below code:

```
var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  return res.status(200).json({ message: 'Welcome to Express API template' });
});
module.exports = router;
```

We grab Express, create a router from it and serve the / route, which returns a status code of 200 and a JSON message.

Start the app with the below command:

```
# start the app
yarn start
```

If you’ve set up everything correctly you should only see $ node ./src/bin/www in your terminal.

Visit http://localhost:3000/v1 in your browser. You should see the following message:

```
{
  "message": "Welcome to Express API template"
}
```

This is a good point to commit our changes.

*** MODIFY *** The corresponding branch in my repo is 01-install-express.

## Converting Our Code To ES6 #

The code generated by **express-generator** is in ES5, but in this article, we will be writing all our code in ES6 syntax. So, let’s convert our existing code to ES6.

Replace the content of **routes/index.js** with the below code:

```
import express from 'express';

const indexRouter = express.Router();

indexRouter.get('/', (req, res) =>
  res.status(200).json({ message: 'Welcome to Express API template' })
);

export default indexRouter;
```

It is the same code as we saw above, but with the import statement and an arrow function in the / route handler.

Replace the content of **src/app.js** with the below code:

```
import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index';
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/v1', indexRouter);

export default app;
```

Let’s now take a look at the content of **src/bin/www.js**. We will build it incrementally. Delete the content of **src/bin/www.js** and paste in the below code block.

```
/**
 * Module dependencies.
 */
import debug from 'debug';
import http from 'http';
import app from '../app';
/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = val => {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
};

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

// next code block goes here

```

This code checks if a custom port is specified in the environment variables. If none is set the default port value of 3000 is set on the app instance, after being normalized to either a string or a number by normalizePort. The server is then created from the http module, with app as the callback function.

The **#!/usr/bin/env node** line is optional since we would specify node when we want to execute this file. But make sure it is on line 1 of **src/bin/www.js** file or remove it completely.

Let’s take a look at the error handling function. Copy and paste this code block after the line where the server is created.

```
/**
 * Event listener for HTTP server "error" event.
 */
const onError = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.log(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.log(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
};
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
```

The **onError** function listens for errors in the http server and displays appropriate error messages. The **onListening** function simply outputs the port the server is listening on to the console. Finally, the server listens for incoming requests at the specified address and port.

At this point, all our existing code is in ES6 syntax. Stop your server (use Ctrl + C) and run yarn start. You’ll get an error SyntaxError: Invalid or unexpected token. This happens because Node (at the time of writing) doesn’t support some of the syntax we’ve used in our code.

We’ll now fix that in the following section.

## Configuring Development Dependencies: babel, nodemon, eslint, And prettier

It’s time to set up most of the scripts we’re going to need at this phase of the project.

Install the required libraries with the below commands. You can just copy everything and paste it in your terminal. The comment lines will be skipped.

```
yarn add @babel/cli @babel/core @babel/plugin-transform-runtime @babel/preset-env @babel/register @babel/runtime @babel/node --dev
```

This installs all the listed babel scripts as development dependencies. Check your package.json file and you should see a devDependencies section. All the installed scripts will be listed there.

The babel scripts we’re using are explained below:

**@babel/cli**
A required install for using babel. It allows the use of Babel from the terminal and is available as ./node_modules/.bin/babel.

**@babel/core**
Core Babel functionality. This is a required installation.

**@babel/node**
This works exactly like the Node.js CLI, with the added benefit of compiling with babel presets and plugins. This is required for use with nodemon.

**@babel/plugin-transform-runtime**
This helps to avoid duplication in the compiled output.

**@babel/preset-env**
A collection of plugins that are responsible for carrying out code transformations.

**@babel/register**
This compiles files on the fly and is specified as a requirement during tests.

**@babel/runtime**
This works in conjunction with @babel/plugin-transform-runtime

Create a file named **.babelrc** at the root of your project and add the following code:

```
{
  "presets": ["@babel/preset-env"],
  "plugins": ["@babel/transform-runtime"]
}
```

Let’s install **nodemon**:

```
yarn add nodemon --dev
```

**nodemon** is a library that monitors our project source code and automatically restarts our server whenever it observes any changes.

Create a file named nodemon.json at the root of your project and add the code below:

```
{
  "watch": [
    "package.json",
    "nodemon.json",
    ".eslintrc.json",
    ".babelrc",
    ".prettierrc",
    "src/"
  ],
  "verbose": true,
  "ignore": ["*.test.js", "*.spec.js"]
}
```

The watch key tells **nodemon** which files and folders to watch for changes. So, whenever any of these files changes, nodemon restarts the server. The 'ignore' key tells it the files not to watch for changes.

Now update the 'scripts' section of your **package.json** file to look like the following:

```
# build the content of the src folder
"prestart": "babel ./src --out-dir build"

# start server from the build folder
"start": "node ./build/bin/www"

# start server in development mode
"startdev": "nodemon --exec babel-node ./src/bin/www"
```
1. prestart scripts builds the content of the src/ folder and puts it in the build/ folder. When you issue the yarn start command, this script runs first before the start script.
2. start script now serves the content of the build/ folder instead of the src/ folder we were serving previously. This is the script you’ll use when serving the file in production. In fact, services like Heroku automatically run this script when you deploy.
3. yarn startdev is used to start the server during development. From now on we will be using this script as we develop the app. Notice that we’re now using babel-node to run the app instead of regular node. The --exec flag forces babel-node to serve the src/ folder. For the start script, we use node since the files in the build/ folder have been compiled to ES5.






