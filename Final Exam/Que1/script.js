let products =[
    {name:"Headphones",price:7999,desc:"Noise-cancelling over-ear headphones",img:"headphones.jpeg "},
    {name:"Headphones",price:7999,desc:"Noise-cancelling over-ear headphones",img:"headphones.jpeg"},
    {name:"Headphones",price:7999,desc:"Noise-cancelling over-ear headphones",img:"headphones.jpeg"},
    {name:"Headphones",price:7999,desc:"Noise-cancelling over-ear headphones",img:"headphones.jpeg"},
    {name:"Headphones",price:7999,desc:"Noise-cancelling over-ear headphones",img:"headphones.jpeg"},
    {name:"Headphones",price:7999,desc:"Noise-cancelling over-ear headphones",img:"headphones.jpeg"},
    {name:"Headphones",price:7999,desc:"Noise-cancelling over-ear headphones",img:"headphones.jpeg"},
    {name:"Headphones",price:7999,desc:"Noise-cancelling over-ear headphones",img:"headphones.jpeg"},
    {name:"Headphones",price:7999,desc:"Noise-cancelling over-ear headphones",img:"headphones.jpeg"},
    {name:"Headphones",price:7999,desc:"Noise-cancelling over-ear headphones",img:"headphones.jpeg"},
    {name:"Headphones",price:7999,desc:"Noise-cancelling over-ear headphones",img:"headphones.jpeg"},
    {name:"Headphones",price:7999,desc:"Noise-cancelling over-ear headphones",img:"headphones.jpeg"},
    {name:"Headphones",price:7999,desc:"Noise-cancelling over-ear headphones",img:"headphones.jpeg"},
    {name:"Headphones",price:7999,desc:"Noise-cancelling over-ear headphones",img:"headphones.jpeg"}

];

let perPage=10;
let page=1;

function showData()
{
    let body =document.getElementById("body");
    body.innerHTML="";

    let start=(page-1)*perPage;
    let end=start+perPage;

    for(let i=start ;i<end && i<products.length;i++)
    {
        let p=products[i];
        body.innerHTML+=`
        <tr>
            <td><img src="${p.img}" width="50" height="50"></td>
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td>${p.desc}</td>
        </tr>
        `;
    }
}

function pages()
{
    let total=Math.ceil(products.length/perPage);
    let div=document.getElementById("pages");

    for(let i=1;i<=total;i++){
        div.innerHTML += `<button onclick="page=${i}; showData()">${i}</button>`;
    }
}

showData();
pages();