const mysql=require("mysql");
const http=require("http");

const data_info={
    host:'localhost',
    port: 3306,
    user: 'root',
    password: 'mysql',
    database: 'scott'
}
//cons req= new XMLHttpRequest()
//req.open("http://127.0.0.1:9005/")
//req.open("mysql://127.0.0.1:3306?database=scott&user=root&pw=mysql")
//req.onreadystatechage()
//req.send()


//서버 요청이 왔을때 접속
http.createServer((req,resp)=>{
    resp.setHeader("Content-type","text/html;charset=UTF-8")
    let element="<h1>한글 깨질까요??</h1>";
    const con=mysql.createConnection(data_info);
    //let emp_list;

    const p = new Promise((resolve,rejects)=>{
        con.connect((err)=>{
            if(err){  rejects("err"); } //throw err; //p.catch()가 동기화 되는 시점 
            con.query("SELECT * FROM `EMP`",(err,result,fields)=>{
                if(err) throw err
                //emp_list=result;
                con.end((err)=>{});
                resolve(result); //p.then() resolve()가 실행되는 시점과 실행을 동기화 할 수 있다.
            });
        });
    });
    p.then((emp_list)=>{
        element+="<table>";
        element+="<tr><th>ename</th><th>deptno</th><th>sal</th><th>comm</th><th>job</th></tr>";
        emp_list.forEach(function(item){
            console.log(item);
            element+=`<tr>
                        <td>${item.ENAME}</td>
                        <td>${item.DEPTNO}</td>
                        <td>${item.SAL}</td>
                        <td>${item.COMM}</td>
                        <td>${item.JOB}</td>
                    </tr>`;
        });
        element+="</table>"
        resp.end(element);
    });
    
}).listen(9005);
