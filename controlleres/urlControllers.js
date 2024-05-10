const { ObjectId } = require("mongodb");
const url = require("../models/url");
const { format } = require("morgan");

const urlControllers = {
  createSortUrl: async (req, res) => {
    try {
      const { urlLink, hostedUrl } = req.body;
      const newUrl = new url({
        userId: req.userId,
        urlLink,
        date: Date(),
      });
      const savedUrl = await newUrl.save();
      const shortedUrl = `${hostedUrl}/${savedUrl._id}`;
      await url.updateOne(
        { _id: savedUrl._id },
        { $set: { sortUrlLink: shortedUrl } }
      );
      res.status(200).json({ message: "URL Has Been Shorted", url: savedUrl });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAllUrl: async (req, res) => {
    try {
      const userId = req.userId;
      const urlList = await url.find({ userId: userId });
      res.status(200).json(urlList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  redirectUrl: async (req, res) => {
    try {
      const { urlid } = req.params;
      const selectedUrl = await url.findById(urlid);
      await url.updateOne(
        { _id: urlid },
        { $push: { clickedCount: new Date()} }
      );
      res.status(200).json(selectedUrl);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  dateWiseClicked: async (req, res) => {
    try {
      const userId = req.userId;
      const dateWiseClicked = await url.aggregate([
        { $match: { userId: new ObjectId(userId)}},
        { $unwind: "$clickedCount" },
        {
            $set: {
                clickedCount: {
                $dateToString: {
                  format: "%Y-%d-%m",
                  date: "$clickedCount"
                }
              }
            }
          },
          {
            $group:{
                _id:{date:"$clickedCount",urlid:"$_id"},
                count:{$sum:1}
            }
          }
      ]);
      res.status(200).json(dateWiseClicked);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  monthWiseClicked:async(req,res)=>{
    try{
        const userId = req.userId;
        const monthWiseClicked = await url.aggregate([
            {$match:{userId:new ObjectId(userId)}},
            {$unwind:"$clickedCount"},
            {$addFields:{
                month:{
                    $month:"$clickedCount"
                }
            }},
            {$addFields:{
                year:{
                    $year:"$clickedCount"
                }
            }},
            {
                $group:{
                    _id:{month:"$month",year:"$year",urlid:"$_id"},
                    count:{$sum:1}
                }
            }
        ])
        res.status(200).json(monthWiseClicked)
      }catch(error){
        res.status(500).json({message:error.message})
      }
      
    }
};

module.exports = urlControllers;
