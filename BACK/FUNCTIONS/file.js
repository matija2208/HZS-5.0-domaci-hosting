async function getPocetna(req,res)
{
    res.sendFile("pocetna.html");
}

async function get(req,res)
{
    var file=req.params.file;
    res.sendFile(file);
}

module.exports=new Object({
    "get":get,
    "getPocetna":getPocetna
})