// this is a single-line javascript comment

// define a variable and place into it the http package (shared code) from node.js
let myhttp = require("http");

// use dot notation in javascript to access an object and its methods (commands) and properties
// createServer() takes some arguments to make it provide a useful http server
// 1: function (block of code) that will be run whenever the server receives an http request

let myserver = myhttp.createServer( 
  // createServer() uses our function to run when a request comes in
  function( myrequest, myresponse ) {
    //console.log( myrequest.url );
    let reqKey = myrequest.url;
    let bodyText = "<h1>Week 1: Assignment 2: Git + GitHub Basics</h1>";
    
    bodyText += "\n<p>" 
    bodyText += "\n<b>Client Information:</b>";
    bodyText += "\n<br>Date = " + Date().toString();
    bodyText += "\n<br>Request URL = " + reqKey;
    
    
 //let a =  (1+1==2) ? "Pass" : "Fail";
 //console.log("a=="+ a);//pass
 
try 
{
   let forwarded = myrequest.headers['x-forwarded-for'];
   let myip = forwarded ? forwarded.split(/, /)[0] : myrequest.connection.remoteAddress;
 /* 
 The first line of the function retrieves the value of the x-forwarded-for header. It is not always guaranteed to be present. So, in the second line, you check if there is a value, and if so, you split it on a comma (,) and use the first item in the resulting array. If the x-forwarded-for header doesn’t exist, then you use req.connection.remoteAddress as a fallback.
 */
 
    //console.log("forwarded=>" + forwarded);
    //console.log("myip="+ myip);
    //console.log("f==>" + forwarded.split(/, /)[0]);

     bodyText += "\n<br>Originating IP address = " + myrequest.headers['x-forwarded-for'];
     bodyText += "\n<br>Your IP = " +  myip;
     bodyText += "\n<br>User Agent: " + myrequest.headers['user-agent'];
     console.log(myrequest);
} catch(e){
  console.log('Error(001):', e.stack);
}


    var fs = require('fs');

    try {  
      bodyText += "\n<p><b>About this host (data from a local text file)</b><br>";
      let data = fs.readFileSync('text.txt', 'utf8');
      bodyText += data.replace('&#13;','<br>').replace('\n','<br>') + "</p>";
      console.log(data);
           
    } catch(e) {
        console.log('Error(002):', e.stack);
    }

  bodyText += "\n<p><small><i>by Jaruwan Pattanasing</i></small></p>"
 
    // writeHead() creates an http response header, including the status code (200 OK), the content type
    myresponse.writeHead( 200, { "Content-Type": "text/html" } );

    // end() returns some data and closes the response (sends it)
    myresponse.end( bodyText );
  }

 );

// ask http to start listening on a tcp port for incoming http requests
// listen() takes 2 args: 1: tcp port #, string of the ip address to listen (0.0.0.0)
myserver.listen(8080, "0.0.0.0");

console.log("server has started");


//ref:
// https://ipdata.co/blog/how-to-get-the-ip-address-in-javascript/
//https://javascript.plainenglish.io/what-does-the-question-mark-mean-in-javascript-code-353cfadcf760