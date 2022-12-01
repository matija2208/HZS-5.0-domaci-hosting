const path = require('path');
const music = require("../TEMPLATES/music");

async function getSong(req,res){
    var file = req.params.name;
    try{
        
        await res.sendFile("C:\\Users\\lazic\\Desktop\\Dule\\Škola\\III\\Programiranje\\Takmičenja\\HZS\\Domaci\\HZS\\HZS-5.0-domaci\\BACK\\MUSIC\\"+String(file));
    }
    catch(err)
    {
        res.send({
            uspesnost:false,
            poruka:err.message
        });
    }
}

async function getList(req,res){
    try{
        const list = await music.find();
        res.json({
            uspesnost:true,
            lista:list
        });
    }
    catch(err)
    {
        res.send({
            uspesnost:false,
            poruka:err.message
        });
    }
}

async function post(req,res){
    try{
        const newSong = new music({
            naziv:req.body.naziv,
            autor:req.body.autor,
            path:req.body.path,
            region:req.body.region
        });
        await newSong.save();

        res.json({uspesnost:true});
    }
    catch(err)
    {
        res.send({
            uspesnost:false,
            poruka:err.message
        });
    }
}

async function del(req,res){
    try{
        const Song = await music.findById(req.params.id);
        await Song.delete();
        res.json({uspesnost:true});
    }
    catch(err)
    {
        res.send({
            uspesnost:false,
            poruka:err.message
        });
    }
}

module.exports = new Object({
    "getSong":getSong,
    "getList":getList,
    "post":post,
    "delOne":del
});