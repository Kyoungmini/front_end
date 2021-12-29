const express=require("express");
const app=express();
const http=require("http");

http.createServer(app)
    .listen(8888,function(){
        console.log("port:8888 로 접속하세요");
    })
//__dirname 서버 파일이 저장된 위치
app.get("/scott",function(req,res){
    res.sendFile(__dirname+"/l09_index.html")
});    
app.get("/scott/empList",function(req,res){

})