import { MongoClient } from "mongodb";

let _db;

export const mongoConnect= callback=>{
    MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster.cbjfzzk.mongodb.net/?retryWrites=true&w=majority`)
    .then(client=> 
        {
            console.log('connected');
            _db=client.db();
            callback();
        })
    .catch(err => console.log(err));
}

export const getDb= ()=>{
    if(_db)
    {
        return _db;
    }
    throw 'Database not found';
}
