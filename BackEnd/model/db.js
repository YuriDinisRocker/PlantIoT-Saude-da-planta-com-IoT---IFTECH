const {Pool} = require("pg")
require('dotenv').config();
const url = require("url");
const params= url.parse(process.env.DATABASE_URL)
const auth= params.auth.split(':')

class dataBase{
    constructor(){
        this.config={
            user: auth[0],
            password: auth[1],
            host: params.hostname,
            port: params.port,
            database:params.pathname.split('/')[1],
            ssl: false
        };
        this.pool= new Pool(this.config);
    }

    async query(sql, values=[]){
        const client= await this.pool.connect();
        try{
            const res = client.query(sql, values);
            return res;
        }catch (err){
            console.log(`Erro ao executar query ${err}`);
        }finally{
            client.release();
        }
    }

    async close(){
        await this.pool.end();
    }

}

module.exports= dataBase