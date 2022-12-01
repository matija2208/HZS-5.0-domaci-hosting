async function getPocetna(req,res)
{
    console.log("get pocetna");
    res.sendFile("pocetna.html");

}

async function get(req,res)
{
    var file=req.params.file;
    console.log("get "+file);
    res.sendFile(file);
}

module.exports=new Object({
    "get":get,
    "getPocetna":getPocetna
})