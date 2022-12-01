const komentar = require("../TEMPLATES/komentar");
const user = require("../TEMPLATES/user");
const enigma = require("../BAZA/enigma");

async function post(req,res)
{
    try{
        const newKomentar = new komentar({
            sadrzaj:req.body.sadrzaj,
            like:0,
            oblast:req.body.oblast,
            korisnik:enigma(req.body.idKorisnika)
        });
        const savedKomentar = await newKomentar.save();

        let USER = (await user.findById(enigma(req.body.idKorisnika)));
        USER.komentari.push(savedKomentar);
        await USER.save();

        res.json({
            uspesnost:true,
            komentar:savedKomentar
        })
    }
    catch(err)
    {
        res.json({
            uspesnost:false,
            poruka:err.message
        })
    }
}

async function get(req,res)
{
    try{
        const komentari = await komentar.find().populate("korisnik");
        res.json({
            uspesnost:true,
            komentari:komentari
        })
    }
    catch(err)
    {
        res.json({
            uspesnost:false,
            poruka:err.message
        })
    }
}

async function del(req,res)
{
    try{
        let users=await user.find();
        for(let i = 0;i<users.length;i++)
        {
            users[i].komentari=[];
            await users[i].save();
        }

        let komentari = await komentar.find();
        for(let i = 0;i<komentari.length;i++)
        {
            await komentari[i].delete();
        }

        res.json({uspesnost:true});
    } 
    catch(err)
    {
        res.json({
            uspesnost:false,
            poruka:err.message
        })
    }
}

module.exports = new Object({
    "post":post,
    "get":get,
    "del":del
})