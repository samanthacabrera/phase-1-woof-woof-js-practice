document.addEventListener("DOMContentLoaded", (e) => {
    fetch("http://localhost:3000/pups")
        .then((r) => r.json())
        .then((data) => {
            filterPups(data)
            data.forEach((pup) => {
                displayPup(pup)
            })
    })
});
  

function displayPup(pup) {
    const dogBar = document.querySelector("#dog-bar")
    const span = document.createElement('span')
    span.textContent = pup.name

    span.addEventListener('click', () => {
        showPupInfo(pup)
    })
    dogBar.append(span)
    
}



 function showPupInfo(pup) {
     const dogInfo = document.querySelector("#dog-info")
     dogInfo.innerHTML = ""

     const img = document.createElement("img")
     img.src = pup.image

     const h2 = document.createElement("h2")
     h2.textContent = pup.name

     const btn = document.createElement("button")
     btn.setAttribute("id","toggle-button")
   
     if (pup.isGoodDog === true) {
          console.log("Good Dog")
         btn.textContent = "Good Dog"
     }
     else {
          console.log("Bad Dog")
         btn.textContent = "Bad Dog"
     }

   
    btn.addEventListener('click', () => {
        if (btn.textContent === "Good Dog") {
            console.log("toggled to bad")
            btn.textContent = "Bad Dog"  
            pup.isGoodDog = false
    }
        else {
            console.log("toggled to good")
            btn.textContent = "Good Dog"
            pup.isGoodDog = true
        }
        updatePup(pup)
    })
    
    dogInfo.append(img,h2,btn)
}
     
function updatePup(pup) {
  
    fetch(`http://localhost:3000/pups/${pup.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
           isGoodDog : pup.isGoodDog
        })
            
        })
} 
    
function filterPups(pups) {
    const filterButton = document.querySelector("#good-dog-filter")
    const dogBar = document.querySelector("#dog-bar")
    const on = 'Filter good dogs: ON'
    const off = 'Filter good dogs: OFF'
    const goodDogs = pups.filter((pup) => pup.isGoodDog === true)
    const badDogs = pups.filter((pup) => pup.isGoodDog === false)
    
    
    filterButton.addEventListener('click', (pups) => {
       
        if (filterButton.textContent === on) {
            // dogBar.innerHTML = goodDogs.forEach((dog)=>console.log(dog.name))
            // console.log(goodDogs)
            filterButton.textContent = off
        }
        else if (filterButton.textContent === off) {
            // console.log(badDogs)
            
            filterButton.textContent = on
        }
         dogBar.innerHTML = ""
    })
}


 

