const dataBase= require("../model/db.js")
const Amostra = require("../model/Amostra.js")


class Control{
    constructor(){
        this.db=new dataBase();
    }

    async setMonitoramento(amostra){
        try{
            const query="INSERT INTO monitoramento(id_cultura, n_media, p_media, k_media, ph_media, umidade_media, data_monitoria) VALUES ($1, $2, $3, $4, $5, $6, NOW())";
            const values=[amostra.getidCultura(), amostra.getN(), amostra.getP(), amostra.getK(), amostra.getPh(), amostra.getUmidade()];
            await this.db.query(query, values);
        }
        catch (err){
            console.log(err);
        }
    }

    async setCultura(cultura){
        try{
            const query="INSERT INTO culturas(id_ref, nome, semanas, data_criacao) VALUES ($1, $2, $3, NOW())";
            const values=[cultura.getIdEspecie(), cultura.getNome(), cultura.getSemanas()];
            await this.db.query(query, values);
        }
        catch (err){
            console.log(err);
        }
    }

    async getMonitoramento(amostra_id){
        try{
            const query="SELECT * FROM monitoramento WHERE id_cultura=$1";
            const values=[amostra_id];
            const res= await this.db.query(query, values);
            return res;
        }
        catch (err){
            console.log(err);
        }
    }

    async getCultura(){
        try{
            const query="SELECT * FROM culturas";
            const res=await this.db.query(query);
            return res
        }
        catch (err){
            console.error("Erro em getCultura:", err);
            return null;
        }
    }

    async deleteCultura(idCultura){
        try{
            const query="DELETE FROM culturas WHERE id=$1";
            const value=[idCultura];
            const res= await this.db.query(query, value);
            
        }
        catch (err){
            console.log(err)
        }
    }

    consultaValores(req){
        const amostra= new Amostra(req.idCultura, req.N, req.P, req.K, req.Ph, req.Umidade);
        return amostra;
    }

    async ultimoMonitoramento(idCultura){
        try{
            const query="SELECT * FROM monitoramento WHERE id_cultura=$1 AND data_monitoria=(SELECT MAX(data_monitoria) FROM monitoramento WHERE id_cultura = $1)"
            const value=[idCultura]
            const res=await this.db.query(query, value);
            return res;
        }
        catch(err){
            console.log("Não foi possível buscar os valores");
        }
    }

    async valorReferencia(idRef){
        try{
            const query="SELECT * FROM referencias WHERE id=$1"
            const value=[idRef]
            const result= await this.db.query(query, value)
            return result;
        }catch(err){
            console.log("Erro ao retornar valores de referencia")
        }
    }

    async getReferencias(){
        try{
            const query="SELECT * FROM referencias"
            const result= await this.db.query(query, null)
            return result;
        }catch(err){
            console.log("Erro ao retornar valores de referencia")
        }
    }



    
}

module.exports= Control