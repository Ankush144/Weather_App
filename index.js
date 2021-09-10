//modules section
    const http = require('http');
    const fs = require('fs');
    const requests = require("requests");
 
//reading data from the html file
    const homeFile = fs.readFileSync("home.html","utf-8");


//creating a server
    const server = http.createServer();
//event handling of request of user
    server.on( "request",( req,res ) => {
        //using npm pacakage module "request" and geting data from api
        requests( "https://api.openweathermap.org/data/2.5/weather?q=Banswara&appid=60ef9914c7d2f33a55349066c0d59cac")
        .on( "data",(data) => { 
            //converting json file to object 
            const obj_data = JSON.parse(data);
            const arr = [obj_data];
            homeFile.replace("{%tempmax%}",obj_data.main.temp_max);
            homeFile.replace("{%tempmin%}",obj_data.main.temp_min); 
            homeFile.replace("{%tempval%}",obj_data.main.temp);
            homeFile.replace("{%location%}","Banswara");
            homeFile.replace("{%country%}","India");
            res.end(homeFile);
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