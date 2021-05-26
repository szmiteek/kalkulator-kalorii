fetch("http://localhost:3000/random",{method:"GET",headers:{"Content-Type": "application/json"}})
.then((res)=>(res.json()))
.then((produkty)=>{

produkty.forEach(element => createListElement(element, "randomList"))
    
  
    
})

