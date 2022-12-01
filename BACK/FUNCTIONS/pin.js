const pin = require("../TEMPLATES/pin");

async function post(req,res)
{
    try{
        const l = req.body.lokacija;
        const o = "";
        const t = req.body.tip;
        if(t==0)
        {
            var newPin = new pin(
                {
                    lokacija:l,
                    ocena:o,
                    tip:t,
                    BAND:req.body.band
                }
            )
        }
        else if(t==1)
        {
            var newPin = new pin(
                {
                    lokacija:l,
                    ocena:o,
                    tip:t,
                    KONCERT: req.body.dogadjaj

                }
            );
        }
        const savedPin = await newPin.save();
        res.json({
            uspesnost:true,
            pin:savedPin
        });

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
        const all_pins = await pin.find();

        res.json({
            uspesnost:true,
            pins:all_pins
        });
    }
    catch(err)
    {
        res.json({
            uspesnost:false,
            poruka:err.message
        })
    }
}

async function getOne(req,res)
{
    try{
        const all_pins = await pin.findById(req.params.id);

        res.json({
            uspesnost:true,
            pin:all_pins
        });
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
        let all_pins = await pin.find();

        for(let i =0;i<all_pins.length;i++)
        {
            await all_pins[i].delete();
        }

        res.json({
            uspesnost:true
        });
    }
    catch(err)
    {
        res.json({
            uspesnost:false,
            poruka:err.message
        })
    }
}

async function delOne(req,res)
{
    try{
        const PIN = await pin.findById(req.params.id);

        const deletedPin=await PIN.delete();

        res.json({
            uspesnost:true,
            pin:deletedPin
        });
    }
    catch(err)
    {
        res.json({
            uspesnost:false,
            poruka:err.message
        })
    }
}

async function put(req,res)
{
    try{
        const PIN = await pin.findById(req.params.id);

        const l = req.body.lokacija;
        const o = "";
        const t = req.body.tip;
        
        PIN.lokacija=l;
        PIN.ocena=o;
        PIN.tip=t;

        if(t==0)
        {
            PIN.BAND = req.body.band;
        }
        else if(t==1)
        {
            PIN.KONCERT = req.body.dogadjaj;
        }

        const savedPin=await PIN.save();

        res.json({
            uspesnost:true,
            pin:savedPin
        });
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
    "getOne":getOne,
    "del":del,
    "delOne":delOne,
    "put":put
});