'use strict'
var express=require("express");
const app=express();
var spawn=require("child_process").execFile;
var bodyParser=require("body-parser");

var multer=require("multer")
var upload= multer()
const os=require("os");
app.use(bodyParser());

app.use((req, res, next)=> {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","PUT,DELETE,POST,GET")
  next();
});
var osType=os.type().toLowerCase()

var fpcalc;
if(osType.includes("windows")){
  console.log("windows environment")
  console.error("\n\n/t fffffrfdj")
  fpcalc=`./-fpcalc/fpcalc.exe`
}
else if(osType.includes("linux")){
  console.error("linux environment ")
  fpcalc=`fpcalc`
}
else{
  console.error("\n\n/t fffffrfdj")
}
app.get("/",(req,res)=>{
  res.json({status:"Running.......",msg:"FPCALC fingerprinter API running"});
});
app.post("/t",upload.single('photo'),async(req,res)=>{
  console.log(req.file)
  res.json({req:"Tt"})
})
app.post("/getFingerprint",async(req,res)=>{
  var fileOpt={
    length:req.body.length,
    file:"skinnylove.mp3",
    type:"json"
  }
  var {length,type,file}=fileOpt
  type?type=type:type="json"
  try{
      spawn(`${fpcalc}`,["-length",`${length}`,`-${type}`,`${file}`],(err,stdout,stderr)=>{
        if(stderr) res.json({type:"error",msg:"Couldnt get fingerprint",err:stderr})
        else if(stdout) res.json({type:"success",msg:"Audio Fingerprint compplete",result:stdout})
        else console.error(err)
      })
  }
  catch(err){
    console.error(err)
    return {type:"error",error:err}
  }
})
app.get("/getFingerprint/:length",async(req,res)=>{
  var fileOpt={
    length:req.params.length,
    file:"skinnylove.mp3",
    type:"json"
  }
  var {length,type,file}=fileOpt
  type?type=type:type="json"
  try{
    if (osType.includes("windows") ){
      spawn(`${fpcalc}`,["-length",`${length}`,`-${type}`,`${file}`],(err,stdout,stderr)=>{
        if(stderr) res.json({type:"error",msg:"Couldnt get fingerprint",err:stderr})
        else if(stdout) res.json({type:"success",msg:"Audio Fingerprint complete",result:stdout})
        else console.error(err)
      })
    }
    else if(osType.includes("linux")){
      spawn(`${fpcalc}`,["--length",`${length}`,`${file}`],(err,stdout,stderr)=>{
        if(stderr) res.json({type:"error",msg:"Couldnt get fingerprint",err:stderr})
        else if(stdout) res.json({type:"success",msg:"Audio Fingerprint complete",result:stdout})
        else console.error(err)
      })
    }
    else{
      res.json({type:"error",msg:"Dont know what to do"})
    }
  }
  catch(err){
    console.error(err)
    return {type:"error",error:err}
  }
})
app.listen(process.env.PORT,(err)=>{
  if(err) return console.error(err)
  else console.log("Audio Fingerprint server running")
})
