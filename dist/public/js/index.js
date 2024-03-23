document.addEventListener('DOMContentLoaded',async ()=>{
    try{
        const productsRow=document.getElementById('productsRow');
        const response=await axios.get('http://localhost:3000/fetchProducts');
        const productsList=response.data;
        if(productsList.length)
        {
            productsList.forEach(element => {
                displayProducts(element.title, element.price, element.description, element.imageUrl, element._id, productsRow)
            });
            console.log(productsList);
        }
    }catch(err)
    {
        console.log(err);
    }
})
async function displayProducts(title, price, description, imageUrl, id, row) {
    try{
    const colDiv=document.createElement('div');
    colDiv.setAttribute('class','col');
    colDiv.setAttribute('id',id);
    colDiv.style.textAlign='center';

    const imgDiv=document.createElement('div');
    imgDiv.setAttribute('class','box-img');
    imgDiv.style.backgroundImage=`url(${imageUrl})`;
    colDiv.appendChild(imgDiv);

    const textTitle=document.createTextNode(title);
    colDiv.appendChild(textTitle);

    const div1=document.createElement('div');
    div1.setAttribute('class','priceText');
    const textPrice=document.createTextNode(price.toString());
    div1.appendChild(textPrice);
    
    colDiv.appendChild(textTitle);
    colDiv.appendChild(textPrice);
  
    const addToCart=document.createElement('button');
    addToCart.textContent='Add to cart';
    
    colDiv.appendChild(addToCart);
    addToCart.addEventListener('click',async (e)=>{
        // const x=await axios.post('addToCart')
    });

    row.appendChild(colDiv);
    
    }catch(err)
    {
        console.log(err);
    }
}