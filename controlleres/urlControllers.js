const url = require("../models/url");

const urlControllers = {
    createSortUrl:async(req,res)=>{
        try{
            const {userId,urlLink,hostedUrl} = req.body;
            const newUrl = new url({
                userId,
                urlLink,
                date:Date()
            })
            const savedUrl = await newUrl.save()
            const shortedUrl = `${hostedUrl}/${savedUrl._id}`
            await url.updateOne({_id:savedUrl._id},{$set:{sortUrlLink:shortedUrl}})
            res.status(200).json({message:'URL Has Been Shorted',url:savedUrl})
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    getAllUrl: async (req,res)=>{
        try{
            const userId = req.userId
            const urlList = await url.find({userId:userId});
            res.status(200).json(urlList)
        }
        catch(error){
            res.status(500).json({message:error.message})
        }
    },
    redirectUrl: async(req,res)=>{
        try{
            const clickedCount = 0;
            const {urlid} = req.params
            const selectedUrl = await url.findById(urlid);
            await url.updateOne({_id:urlid},{$inc:{clickedCount:clickedCount+1}})
            res.status(200).json(selectedUrl);    
        }catch(error){
            res.status(500).json({message:error.message})
        }
    }
}

module.exports = urlControllers;