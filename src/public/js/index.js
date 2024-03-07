const posts=[];
function updateLastUserActivityTime(){
    return new Promise( (resolve,reject) => {
        setTimeout(() =>{
        const ti=new Date();
        posts.push(ti);
        resolve(ti);
        },1000);
    });
}
function createPost(name){
    return new Promise( (resolve,reject) => {
        resolve(name);
    });
}
function deletePost(){
    return new Promise((resolve, reject) => {
        if(posts.length>0)
        {
            posts.pop();
            resolve();
        }else reject('Error');
    });
}
async function f(){
    try{
const name=await createPost('nam');
console.log(name);
const time=await updateLastUserActivityTime();
console.log(time);
    } catch(err){
        console.log(err);
    }
}
f();