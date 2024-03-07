

const form=document.getElementById('form');
if(form)
{
    form.addEventListener('submit',addProduct);
}

async function addProduct(e)
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
        'imageUrl':imageUrl
    };
    const genereateNewProduct =await axios.post('http://localhost:3000/addProduct', newProduct);
    console.log(genereateNewProduct);
    alert('new product added');
    
    }catch(err)
    {
        console.log(err);
    }
    
}