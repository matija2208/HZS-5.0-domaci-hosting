const user = require("../TEMPLATES/user");
const enigma = require("../BAZA/enigma");

async function get(req, res)
{
    try{
        let users = await user.find();

        

        res.json({
            uspesnost:true,
            users:users
        });
    }
    catch(err){
        res.json({
            uspesnost:false,
            poruka:err.message
        });
    }
    
}

async function getOne(req, res)
{
    try{
        let USER = await user.findById(enigma(req.body.id));

        res.json({
            uspesnost:true,
            user:USER
        });
    }
    catch(err){
        res.json({
            uspesnost:false,
            poruka:err.message
        });
    }
}

async function login(req,res)
{
    try{
        const users= await user.find();
        const pass = enigma(req.body.password);
        let x = false;

        for(let i = 0; i<users.length;i++)
        {
            let e = users[i];
            if((req.body.mail===e.mail || req.body.mail === e.username) && pass === e.password)
            {
                const ID = enigma((String)(e._id))
                x=true;
                res.json({
                    uspesnost:true,                    
                    id:ID
                });
                break;
            }
        }

        

        if(!x)
        {
            res.json({
                uspesnost:false
            });
        }
    }
    catch(err){
        res.json({
            uspesnost:false,
            poruka:err.message
        });
    }
}

async function post(req, res)
{
    try{
        const pass = enigma(req.body.password);
        const newUser = new user(
            {
                ime:req.body.ime,
                prezime:req.body.prezime,
                username:req.body.username,
                password:pass,
                mail:req.body.mail
            }
        );

        const savedUser = await newUser.save();
        delete savedUser.password;
        let ID = await enigma((String)(savedUser._id));
        console.log(ID);
        res.json({
            uspesnost:true,
            id:ID
        });
    }
    catch(err){
        res.json({
            uspesnost:false,
            poruka:err.message
        });
    }
}

async function del(req, res)
{
    try{
        let users = await user.find();

        for(let i =0; i<users.length;i++)
        {
            await users[i].delete();
        }

        res.json({
            uspesnost:true,
        });
    }
    catch(err){
        res.json({
            uspesnost:false,
            poruka:err.message
        });
    }
}

async function delOne(req, res)
{
    try{
        let USER = await user.findById(enigma(req.body.id));

        const deletedUser = await USER.delete();

        res.json({
            uspesnost:true
        });
    }
    catch(err){
        res.json({
            uspesnost:false,
            poruka:err.message
        });
    }
}

async function put(req, res)
{
    try{
        let newUser = await(user.findById(enigma(req.body.id)))
            
        newUser.ime=req.body.ime;
        newUser.prezime=req.body.prezime;
        newUser.username=req.body.username;
        newUser.mail=req.body.mail;

        await newUser.save();

        res.json({
            uspesnost:true,
        });
    }
    catch(err){
        res.json({
            uspesnost:false,
            poruka:err.message
        });
    }
}

async function updatePassword(req,res)
{
    const id = enigma(req.body.id);
    const newPass = req.body.noviPassword;
    const oldPass = req.body.stariPassword;

    try{
        let USER = await user.findById(id);

        if(oldPass === enigma(USER.password))
        {
            USER.password=enigma(newPass);
            await USER.save();
            
            res.json({
                uspesnost:true
            });
        }
        else
        {
            res.json({
                uspesnost:false,
                poruka:"pogresna stara sifra"
            });
        }
    }
    catch(err){
        res.json({
            uspesnost:false,
            poruka:err.message
        });
    }
}

module.exports = new Object({
    "get":get,
    "getOne":getOne,
    "login":login,
    "post":post,
    "del":del,
    "delOne":delOne,
    "put":put,
    "updatePassword":updatePassword
});