class Cultura{
    constructor(nome, idEspecie, semanas){
        this.nome=nome;
        this.idEspecie=idEspecie;
        this.semanas=semanas//Id da referencia da espécie no banco de dados
    }
    getNome(){
        return this.nome;
    }
    getIdEspecie(){
        return this.idEspecie
    }
    getSemanas(){
        return this.semanas
    }
}

module.exports= Cultura