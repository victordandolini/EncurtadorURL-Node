import mongoose from "mongoose";
import { config } from "../config/Constants";

export class MongoConnection {
    public async connect(): Promise<void> {
    try {
        mongoose.connect(config.MONGO_CONNETION)
        console.log("Database Connected");
    } catch (err) {
        console.error(err);
        process.exit(1);
        
    }    
    }
}