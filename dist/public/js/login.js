

const form=document.getElementById('form');

form.addEventListener('submit',login);

async function login(e)
{
    try{
        e.preventDefault();
        const email=document.getElementById('email').value;
        const password=document.getElementById('password').value;
        if(!email || !password)
        {
            alert('Please fill all the fields');
            return;
        }
        const credentials={
            email:email,
            password:password
        }
        const login=await axios.post('http://localhost:3000/login',credentials);
        if(login.status==200)
        {
            localStorage.setItem('token',login.data.token);
            console.log(login.data.user);
            window.location.href='../views/admin.html';
        }

    }catch(err)
    {
        if(err.response==401)
        {
            alert('User not authorized');
        }else if(err.response==404)
        {
            alert('User not found');
        }else{
            console.log(err);
        }
    }
    
    
}