const fs = require('fs');
var requests = require('requests');
const homeFile = fs.readFileSync("home.html","utf-8");
const http = require('http');
const { url } = require('inspector');
const replaceVal = (temp,orgVal)=>{
    let temperature = temp.replace("{%tempval%}",((orgVal.main.temp)-273.15).toFixed(2));
    temperature = temperature.replace("{%tempmin%}",((orgVal.main.temp_min)-273.15).toFixed(2));
    temperature = temperature.replace("{%tempmax%}",((orgVal.main.temp_max)-273.15).toFixed(2));
    temperature = temperature.replace("{%location%}",orgVal.name);
    temperature = temperature.replace("{%country%}",orgVal.sys.country);
    return temperature;
}
const server =  http.createServer((req,res)=>{ 
            requests("https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=60ef9914c7d2f33a55349066c0d59cac ")
        .on('data',(chunk) => {
            const obj = JSON.parse(chunk);//converting JSON into js object
            const arr = new Array(obj);
            //console.log(arr[0].main.temp);//now data will be in the form of array of objects
            const realTimeData = arr.map( val=> replaceVal(homeFile,val)).join("");
            res.write(realTimeData);
            //console.log(realTimeData);
        })
        .on('end',(err) => {
        if (err) return console.log('connection closed due to errors', err);
        res.end();
        });
});
server.listen(9000,"127.0.0.1",()=>{
     console.log("starting our server");
});