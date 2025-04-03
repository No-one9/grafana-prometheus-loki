const express = require('express')
const responseTime=require('response-time')
const client =require('prom-client');
//const { createLogger, transports } = require("winston");
const { createLogger, transports } = require("winston");
const LokiTransport = require("winston-loki");
const options = {
  transports: [
    new LokiTransport({
	labels:{
	  appName:"express",
	},
      host: "http://<your_IP>:3100"
    })
  ]
  
};
const logger = createLogger(options);
const {doSomeHeavyWork}=require('./util')
const app= express();
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({register: client.register})
const reqResTime = new client.Histogram({
	name:"http_express_req_res_time",
	help:"This tells how much time is taken by req and res",
	labelNames:['method','route','status_code'],
	buckets:[1,20,100,200,400,500,800,1000,2000],
});
const totalReqCounter= new client.Counter({
	name:'total_req',
	help:'Tells total req'
})
app.use(responseTime((req,res,time)=>{
	totalReqCounter.inc();
	reqResTime.labels(req.method,req.url,res.statusCode.toString()).observe(time);

}));
app.get('/',(req,res)=>{
	logger.info('Req came on / route');
    return res.json({
        message:"Hellow from Express Server"
    });
})
app.get('/slow',async(req,res)=>{
    try{
	logger.info('Req came on /slow route');
        const timeTaken= await doSomeHeavyWork();
        return res.json({
            status:"Success",
            message:`Heavy task completed in ${timeTaken}ms`
        })
    }
    catch(error){
	logger.error(error.message);
        return res
            .status(500)
            .json({
                status:"Error",
                error:"Internal Server Error"
            })
    }
})
app.get('/metrics',async(req,res)=>{
	logger.info('Req came on /metrics route');
	res.setHeader('Content-Type',client.register.contentType)
	const metrics = await client.register.metrics();
	res.send(metrics)

});
app.listen(3000,(req,res)=>{
    console.log("listening on http://localhost:3000")
})
