import { ObjectId } from "mongodb";
import { getDb } from "../util/database";
import { Product } from "./Product";

export class User{
    public name:string;
    public email:string;
    public password:string;
    public number:number;
    public cart:[];
    public _id:string;
    constructor(name:string, email:string, password:string, number:number, cart?:any,_id?:any)
    {
        this.name=name;
        this.email=email;
        this.password=password;
        this.number=number;
        this.cart=cart;
        this._id=_id instanceof ObjectId ? _id.toString():_id;
    }

    async save()
    {
        try
        {
            const db=getDb();
            return await db.collection('users').insertOne(this);
        }catch(err)
        {
            console.log(err);
        }
    }

    static async findUser(email:string)
    {
        try{
            const db=getDb();
            return db.collection('users').findOne({email:email});

        }catch(err)
        {
            console.log(err);
        }
    }

    async addToCart(product:Product)
    {
        try{
            const db=getDb();
            const updatedCart={items:[{...product, quantity:1}]};
            return await db.collection('users').updateOne({_id:new ObjectId(this._id)},{$set:{cart:updatedCart}});
        }catch(err)
        {
            console.log(err);
        }
    }
}