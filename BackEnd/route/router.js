const express=require("express")
const Amostra=require("../model/Amostra.js")
const Cultura=require("../model/Cultura.js")
const Control=require("../controller/control.js")
const router=express.Router()


let ultimaLeitura = null;

router.post("/api/monitoramento", async (req, res)=>{
    const amostra= new Amostra(req.body.idCultura, req.body.N, req.body.P, req.body.K, req.body.Ph, req.body.Umidade);
    const control= new Control();
    await control.setMonitoramento(amostra);
    res.send("Monitoramento concluido");
})

router.post("/api/cultura", async (req, res)=>{
    try{
        const cultura= new Cultura(req.body.Nome, req.body.idRef, req.body.semanas)
        const control= new Control()
        await control.setCultura(cultura)
        res.send("Cultura criada")
    }catch(err){

    }
    
})

router.post("/api/consultaMonitoramento", async (req,res)=>{
    try{
        const idCultura=req.body.idCultura;
        const control = new Control();
        const result = await control.ultimoMonitoramento(idCultura)
        res.status(200).json(result.rows)
    }
    catch(err){
        res.status(404).json("Não foi possível localizar o último monitoramento.")
    }
})

router.post("/api/consulta", (req, res)=>{
    const control= new Control();
    res.send(control.consultaValores(req.body))
})

router.get("/api/cultura", async (req, res)=>{
    try{
        const control= new Control()
        const result = await control.getCultura()
        res.status(200).json(result.rows)
    }catch(err){

    }
})

router.delete("/api/cultura", async (req, res)=>{
    try{
        const idCultura=req.body.idCultura
        const control= new Control()
        await control.deleteCultura(idCultura)
        res.send("Cultura deletada com sucesso!")
    }catch(err){

    }
})

router.post("/api/historicoMonitoramento", async (req, res)=>{
    try{
        const control= new Control()
        const result = await control.getMonitoramento(req.body.idCultura);
        res.status(200).json(result.rows)
    }catch(err){

    }
})

router.post("/api/referencia", async (req, res)=>{
    try{
        const control= new Control()
        const result= await control.valorReferencia(req.body.id_ref)
        res.status(200).json(result.rows)
    }catch(err){

    }
})

router.get("/api/referencia", async (req,res)=>{
    try{
        const control= new Control()
        const result= await control.getReferencias()
        res.status(200).json(result.rows)
    }catch(err){

    }
})

router.post("/api/dadosIoT", (req, res) => {
    ultimaLeitura = {
        n: req.body.n,
        p: req.body.p,
        k: req.body.k,
        ph: req.body.ph,
        umidade: req.body.umidade
    };
    res.status(200).json({ status: "ok" });
});

router.post("/api/recebeDados", (req, res) => {
    if (!ultimaLeitura) {
        return res.status(404).json({ error: "Nenhuma leitura recebida ainda" });
    }
    res.status(200).json(ultimaLeitura);
    ultimaLeitura=null
});



module.exports=router