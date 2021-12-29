const fs=require('fs');
const mysql=require('mysql');
const url=require('url');
const con_info={
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mysql",
    database: "scott"
}


require('http').createServer(function(req,res){
    res.setHeader("Content-type","text/html;charset=UTF-8")
    const url_parse=url.parse(req.url,true);

    if(url_parse.pathname=="/"&&req.method=="GET"){
        fs.readFile("l09_index.html",(err,data)=>{
            res.end(data)
        })
    }else if(url_parse.pathname=="/empList"&&req.method=="GET"){
        const conn=mysql.createConnection(con_info);
        conn.connect((err)=>{
            conn.query("SELECT * FROM EMP",function(err,result){
                //console.log(result);
                res.setHeader("Content-type","application/json;charset=UTF-8")
                res.end(JSON.stringify(result))
            })
        });
    }else if(url_parse.pathname=="/empDelete"&&req.method=="DELETE"){
        let empno=Number(url_parse.query.empno);
        const conn=mysql.createConnection(con_info);
        conn.connect((err)=>{
            conn.query("DELETE FROM `EMP` WHERE EMPNO=?",[empno],
            (err,result)=>{
                const msg_obj={msg:"실패",deleteRow:0, empno:empno}
                if(result['affectedRows']>0){
                    msg_obj.msg="성공";
                    msg_obj.deleteRow=result['affectedRows'];
                }
                res.setHeader("Content-type","application/json;charset=UTF-8")
                console.log(msg_obj);
                res.end(JSON.stringify(msg_obj));
            })
        });
    }else if(url_parse.pathname=="/registEmp"&& req.method=="GET"){
        //post 파라미터 전달은 요청의 해더에 포함되는데 이때 파라미터가
        //버퍼로 분석되기 때문에 post로 파라미터 받는 것이어렵다.
        const msg={inserRow:0, msg:"실패",empno:0};
        //console.log(url_parse.query);
        const emp=url_parse.query;
        const conn=mysql.createConnection(con_info);
        conn.connect((err)=>{
            conn.query("INSERT INTO `EMP` (EMPNO,ENAME,JOB,MGR,HIREDATE,SAL,DEPTNO) VALUES (?,?,?,?,?,?,?)",
            [emp.empno,emp.ename,emp.job,emp.mgr,emp.hiredate,emp.sal,emp.deptno],(err,result)=>{
                console.error(err);
                console.log("result",result);
                if(result["affectedRows"]>0){
                    msg.inserRow=result["affectedRows"];
                    msg.msg="성공";
                    msg.empno=emp.empno;
                    res.setHeader("Content-type","application/json;charset=UTF-8")
                    res.end(JSON.stringify(msg));
                }
            })
        })
    }else if(url_parse.pathname=="/registEmpFormLoad"){
        fs.readFile("l09_registEmpForm.html",(err,data)=>{
            res.setHeader("Content-type","text/html;charset=UTF-8")
            res.end(data);
        });
    }else if(url_parse.pathname=="/updateEmpFormLoad"){
        fs.readFile("l09_updateEmpForm.html",(err,data)=>{
            res.setHeader("Content-type","text/html;charset=UTF-8")
            res.end(data);
        });
    }else if(url_parse.pathname=="/empLoad"){
        ///empLoad?empno=7877;
        let empno=url_parse.query.empno;
        const con=mysql.createConnection(con_info);
        con.connect((err)=>{
            con.query("SELECT * FROM `EMP` WHERE EMPNO=?",[Number(empno)],(err,result)=>{
                console.log(err);
                res.setHeader("Content-type","application/json;charset=UTF-8")
                res.end(JSON.stringify(result));  
            })
        })
    }


}).listen(6001,'127.0.0.1')