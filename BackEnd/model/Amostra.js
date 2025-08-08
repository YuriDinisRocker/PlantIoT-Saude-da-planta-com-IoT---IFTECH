class Amostra{
    constructor(id_cultura, N, P, K, Ph, Umidade){
        this.id_cultura=id_cultura;
        this.N=N;
        this.P=P;
        this.K=K;
        this.Ph=Ph;
        this.Umidade=Umidade;
    };
    

    getidCultura(){
        return this.id_cultura
    }
    getN(){
        return this.N
    }
    getP(){
        return this.P
    }
    getK(){
        return this.K
    }
    getPh(){
        return this.Ph
    }
    getUmidade(){
        return this.Umidade
    }
}

module.exports= Amostra