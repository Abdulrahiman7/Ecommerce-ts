
function getId()
{
    const queryParams = new URLSearchParams(window.location.search);
    const id=queryParams.get('id');
    return id;
}

document.addEventListener('DOMContentLoaded',async ()=>{
    try{
        const id=getId();
        
    if(id)
    {
        console.log(id);
        const getProductDetails=await axios.get(`http://localhost:3000/getProduct/${id}`);
        console.log(getProductDetails);
    document.getElementById('title').value=getProductDetails.data.title;
    document.getElementById('price').value=getProductDetails.data.price;
    document.getElementById('description').value=getProductDetails.data.description ;
    document.getElementById('imageUrl').value=getProductDetails.data.imageUrl;

    }
    }catch(err)
    {
        console.log(err);
    }
    
});

const form=document.getElementById('form');
if(form)
{
    form.addEventListener('submit',editProduct);
}

async function editProduct(e)
{
    try{
        e.preventDefault();
    const titleElement=document.getElementById('title');
    const priceElement=document.getElementById('price') ;
    const descriptionElement=document.getElementById('description') ;
    const imageUrlElement=document.getElementById('imageUrl');
   if(!titleElement || !priceElement || !descriptionElement || !imageUrlElement) 
   {
    throw new Error('one or more elements not found');
   }
   const id=getId();
   const title = titleElement.value;
   const price=parseFloat(priceElement.value);
   const description=descriptionElement.value;
   const imageUrl=imageUrlElement.value;

   if(isNaN(price))
   {
    throw new Error('Invalid price entered');
   }

    const newProduct={
        'title':title,
        'price':price,
        'description':description,
        'imageUrl':imageUrl,
        'id':id
    };
    const genereateProduct =await axios.post('http://localhost:3000/addProduct', newProduct);
    console.log(genereateProduct);

}catch(err)
{
    console.log(err);
}
}