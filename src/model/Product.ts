import { getDb } from "../util/database";
import { ObjectId } from 'mongodb';

export class Product{
    public title:string;
    public price:Number;
    public description:string;
    public imageUrl:string;
    public _id:any;
    constructor(title:string, price:Number, description:string, imageUrl:string, id?:any)
    {
        this.title=title;
        this.price=price;
        this.description=description;
        this.imageUrl=imageUrl;
        this._id=id instanceof ObjectId ? id.toString():id;
    }

    async save()
    {
        try{
            let dbRes:any;
            const db=getDb();
            if(this._id)
            {
                const id:string=this._id;
                const productObjectId=new ObjectId(id);
                dbRes= await db.collection('products').updateOne({ _id: productObjectId },{$set:{'title':this.title,
                'price':this.price,
                'description':this.description,
                'imageUrl':this.imageUrl}});

            }else{
                dbRes= await db.collection('products').insertOne(this);
            }
            
            return dbRes;
        }
        catch(err)
        {
            console.log(err);
        }
    }

    static async fetchAll()
    {
        try{
            const db=getDb();
            return await db.collection('products').find().toArray(); 
        }
        catch(err)
        {
            console.log(err);
        }
    }

    static async findById(prodId:string)
    {
        try{
            const db=getDb();
            const product= await db.collection('products').findOne({_id: new ObjectId(prodId)}); 
            console.log(product);
            return product;
        }
        catch(err)
        {
            console.log('error in the findbyid in the model');
        }
    }

    static async deleteById(prodId:string)
    {
        try{
            const db=getDb();
            return await db.collection('products').deleteOne({_id: new ObjectId(prodId)}); 
        }
        catch(err)
        {
            console.log(err);
        }
    }
}
