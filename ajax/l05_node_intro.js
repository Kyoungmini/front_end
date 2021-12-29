const http=require('http');
//console.log("안녕 노드야")

const server=http.createServer(function(req,res){
    res.setHeader("Content-Type","text/html;charset=UTF-8")
    res.write("<h1>안녕 노드 http 서버야!</h1>");
    res.end();
});
server.listen(9000,'127.0.0.1',()=>{
    console.log("서버가 접속 대기중");
});