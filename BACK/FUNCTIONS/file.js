const link = '/home/matijacetrovic/HZS-5.0-domaci-hosting/BACK/FILES/';

function getPocetna(req,res)
{
    console.log(link+"get pocetna");
    res.sendFile(link+"pocetna.html");

}

function get(req,res)
{
    var file=req.params.file;
    console.log("get "+file);
    res.sendFile(file);
}

module.exports=new Object({
    "get":get,
    "getPocetna":getPocetna
})