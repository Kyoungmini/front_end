const mysql=require("mysql");
const data_info={
    host:'localhost',
    port: 3306,
    user: 'root',
    password: 'mysql',
    database: 'scott'
}
//require("mysql")를 사용하려면 npm i mysql 로 모듈을 다운 받아야한다.
//mysql_native_password 로 패스워드 타입을 변경해야 접속 가능
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'mysql'

const con=mysql.createConnection(data_info);
con.connect((err)=>{
    if(err){
        console.log(err);
        throw err;
    }
    con.query("SELECT * FROM `DEPT` WHERE DEPTNO IN(?,?)",[30,10],(err,result,fields)=>{
        if(err) throw err
        console.log(result);
        con.end((err)=>{});
    });
});