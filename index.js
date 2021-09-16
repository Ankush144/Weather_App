//modules section
    const http = require('http');
    const fs = require('fs');
    const requests = require("requests");
 
//reading data from the html file
    const homeFile = fs.readFileSync("home.html","utf-8");
//defining replaceVal function here
const replaceVal = (dummy,orgVal) => {
    //here dummy is string which contain the code of html file 
    //here the html code is acting as a string  
    dummy = dummy.replace("{%tempmax%}",(orgVal.main.temp_max-273).toPrecision(4));
    dummy = dummy.replace("{%tempmin%}",(orgVal.main.temp_min-273).toPrecision(4)); 
    dummy = dummy.replace("{%tempval%}",(orgVal.main.temp-273).toPrecision(4));
    dummy = dummy.replace("{%location%}","Banswara");
    dummy = dummy.replace("{%country%}","India");
    return dummy;
}
//creating a server
    const server = http.createServer();
//event handling of request of user
    server.on( "request",( req,res ) => {
        //using npm pacakage module "request" and geting data from api
        //add appid here , it's kinda secret thing
        requests( "https://api.openweathermap.org/data/2.5/weather?q=Banswara&appid={appid}")
        .on( "data",(data) => { 
            //converting json file to object 
            const obj_data = JSON.parse(data);
            const arr = [obj_data];
            const realdata = replaceVal(homeFile,obj_data);
            res.write(realdata);
            res.end();
        })
        .on( "end",(err) => {
            if(err) console.log(err);
            res.end();
        });
    });
//responce is done
    server.listen(9000,"127.0.0.1",()=>{
        console.log("Working fine")
    });

//creating this function to set data in the html file
