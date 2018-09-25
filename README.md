#08-RESTful-apis
This project is a simple server that has been built from scratch (without the use of express). HTTP methods GET, PUT, POST, and DELETE
have been setup and are ready for use. The main purpose of this server is to gain an understanding of what is going on behind the
scenes in a package like express.
##Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.
Clone this repo and navigate to a directory on your local machine. Once you have the folder setup where you want to install, use
the command ```git clone <repo link>```. 

###Using the request methods
From the root of the repository in your terminal, use the command ```node src/app.js``` to begin the server. Open another terminal and
use the command ```http GET :3000/api/huskies``` to retrieve all of the data in huskyStorage. 

##Prerequisites
To install, you'll need a computer with access to the internet, your favorite text editor, your computer's terminal,
and npm installed. Once you have all of those things, use the command ```npm install``` to install all of the dependencies 
required to run the server.

##Running the tests
All you need to run the tests is jest which is included in the package.json and should be installed when you npm install.
Once you have everything installed, use the command ```npm run test```.

##Built With
1. Node
2. JavaScript(ES6)
3. Jest
4. uuid
5. http
6. logger
7. requestParser

##Authors
Tom North

##License
This project is licensed under the MIT License - see the LICENSE.md file for details