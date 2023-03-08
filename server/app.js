import expresss from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';;
import clientRoutes from "./routes/client.js";
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoute from './routes/sales.js'
//import data
import  User from './Models/users.js'
import Product from './Models/Product.js'
import ProductStat from './Models/ProductStat.js'
import Transaction from './Models/Transaction.js';
import OverallStats from './Models/OverallStat.js'
import {dataUser,dataProduct,dataProductStat,dataTransaction,dataOverallStat,dataAffiliateStat} from './data/index.js'
import AffiliateStat from './Models/AffiliateStat.js'
/**Configuration */

dotenv.config();
const app=expresss();
app.use(expresss.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors());


//Routes

app.use("/client",clientRoutes);
app.use("/general",generalRoutes);
app.use("/management",managementRoutes)
app.use("/sales",salesRoute)

/**mongoos setup */

const PORT=process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    app.listen(PORT,()=>{
        console.log("Server running")
    })
    // Product.insertMany(dataProduct)
    // ProductStat.insertMany(dataProductStat)
   // Transaction.insertMany(dataTransaction)
  // OverallStats.insertMany(dataOverallStat)
 // AffiliateStat.insertMany(dataAffiliateStat)
})
.catch((err)=>{
    console.log(err)
})