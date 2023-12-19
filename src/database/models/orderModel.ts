import  {  Schema, Types, model, models } from "mongoose";

export interface IOrder extends Document{
    _id:string,
    createdAt?: Date;
    stripeId: string;
    totalAmount?: string;
    event?: {_id:string,title:string}
    buyer?: {_id:string,firstName:string,lastName:string};
}

export type IOrderItem = {
    _id: string
    totalAmount: string
    createdAt: Date
    eventTitle: string
    eventId: string
    buyer: string
  }

const orderSchema = new Schema({
    createdAt:{type:Date,default:Date.now},
    stripeId:{type:String,required:true,unique:true},
    totalAmount:String,
    event:{type:Types.ObjectId,ref:"Event"},
    buyer:{type:Types.ObjectId,ref:"User"},

})

const Order =models.Order || model("Order",orderSchema)



export default Order