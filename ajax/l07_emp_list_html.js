const mysql=require("mysql");
const http=require("http");
const data_info={
    host:'localhost',
    port: 3306,
    user: 'root',
    password: 'mysql',
    database: 'scott'
}
//서버 요청이 왔을때 접속

http.createServer((req,resp)=>{
    resp.setHeader("Content-type","text/html;charset=UTF-8")
    let element="<h1>한글 깨질까요??</h1>";
    const con=mysql.createConnection(data_info);
    let emp_list;
    con.connect((err)=>{
        if(err) throw err; 
        con.query("SELECT * FROM `EMP`",(err,result,fields)=>{
            if(err) throw err
            emp_list=result;
            element+="<table>"
            element+="<tr><th>ename</th><th>deptno</th><th>sal</th></tr>"
            emp_list.forEach(function(item){
                console.log(item);
                element+=`<tr>
                            <td>${item.ENAME}</td>
                            <td>${item.DEPTNO}</td>
                            <td>${item.SAL}</td>
                        </tr>`
            });
            element+="</table>"
            con.end((err)=>{});
            resp.end(element);
        });
    });

}).listen(9002);