const section2=document.getElementById('section2')
let notask=document.getElementById("notask")










 function compte(){
  let i=section2.children.length
 
  console.log(i)
  if(i==1){
    notask.style.display="block"
  }
  else {
   notask.style.display="none"
  }

 }
function ouvrirPopup() {
  document.querySelector('.overlay').style.display = 'flex'; notask.style.display="none"
}

function removepopup() {
  document.querySelector('.overlay').style.display = 'none';
}

function ouvrirPopups() {
  document.querySelector('.overlays').style.display = 'flex';
}

function removepopups() {
  document.querySelector('.overlays').style.display = 'none';
}

/// recuperation de la section qui va contenir tt les petits div

const section=document.querySelectorAll(".section")
console.log(section)

 function ajouter_tache(){

  
  const title=document.getElementById('title')
  const description=document.getElementById('description')
  const taches=document.createElement("div")
  taches.classList.add('section')


  fetch("http://localhost:3000/inscription",
    {method:"POST",
      headers:{"Content-Typle":"application/json"},
      body:JSON.stringify({title:title,description:description})
    }
  )
  .then((res)=>{
    if(res.status==200){
      return res.json()
    }
  })

  .then((data)=>{
    console.log(data.message)
    
  taches.innerHTML=`    
  <div id="div1">
      <p id="paragraph1">${title.value}</p>
      <p  id="paragraph2">Not completed</p>
  </div>
  <div id="div2">${description.value}</div>
  <div id="div3">
  
      <img src="ecrire (1).png" alt="" class="rename">
    <img src="supprimer (1).png "  class="delete"alt="">
      <input type="checkbox" class="checkbox">
  </div>
  `
  section2.appendChild(taches)

  compte()

  })

            
                
                
        const checbox=section2.querySelectorAll(".checkbox") 
        checbox. forEach((Element)=>{
           Element.addEventListener("change",()=>{
            const a=Element.parentNode
            const c =a.parentNode
            const paragraph2=c.querySelector("#paragraph2")
            
              if(Element.checked){
                paragraph2.textContent="Completed"
              }
            
            else{
              paragraph2.textContent="Not completed"
            }

        })
        })       
 
 title.value=""
 description.value=""
 removepopup()
const supprimer=section2.querySelectorAll('.delete')
supprimer.forEach((Element)=>{
  Element.addEventListener('click',()=>{
    const a=Element.parentNode
    const c =a.parentNode
    console.log(c)
    fetch("http://localhost:3000/inscription",{
      method:"DELETE",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({_id:id})

    })
    .then((res)=>{
      if(res.ok){
        return res.json()
      }
    })
    .then((data)=>{
      console.log(data.message)
      
    c.remove()
    compte()



    })
    
   
  

  })
})
 
const rename=section2.querySelectorAll(".rename")
console.log(rename)
rename.forEach((Element)=>{
  Element.addEventListener("click",()=>{
    const a=Element.parentNode
    const c =a.parentNode
    const paragraph1=c.querySelector("#paragraph1")
    const description_div=c.querySelector("#div2")
  

  ouvrirPopups()
 
  const title=document.getElementById('titles')
  const description=document.getElementById("descriptions")
  title.value=paragraph1.textContent
   description.value=description_div.textContent
   const ajouter=document.querySelector('.rename_button')
   console.log(ajouter)
   ajouter.onclick=function(){
    fetch("http://localhost:3000/inscription",{
      method:"PATCH",headers:{"Content-Type":'application/json'},body:JSON.stringify({title:title,description:description})
    })
    .then((res)=>{
      if(res.ok){
        return res.json()
      }
    })
    .then((data)=>{
      console.log(data.message)
      description_div.textContent=description.value
      paragraph1.textContent=title.value
      removepopups()
      title.value=""
      description.value=""
      
    })
   
   }
  })
})


 }
 compte()


