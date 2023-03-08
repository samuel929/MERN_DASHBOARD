import OverllStat from "../Models/OverallStat.js";

export const getSales=async(req,res)=>{
    try{

        const overallStat=await OverllStat.find();
        res.status(200).json(overallStat[0]);

    }catch(err){
        res.status(404).json({message:err.message})
    }
}