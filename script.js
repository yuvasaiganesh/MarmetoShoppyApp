let men=document.getElementById("men")
let women=document.getElementById("women")
let kid=document.getElementById("kid")
let updateData=document.getElementById("unOrderList")

function eachResult(eachdata){
   
    
        let one=document.createElement("li")
        one.id=eachdata.id
        let imageSection=document.createElement("div")
        let firstSection=document.createElement("div")
        let secondSection=document.createElement("div")

        let title=document.createElement("h3")
        title.textContent=eachdata.title
        title.classList.add("title")
        firstSection.appendChild(title)

        let vendor=document.createElement("h3")
        vendor.textContent=eachdata.vendor
        vendor.classList.add("vendor")
        firstSection.appendChild(vendor)


        let price=document.createElement("p")
        price.textContent="Rs. "+eachdata.price
        price.classList.add("price")
        secondSection.appendChild(price)

        let compare_at_price=document.createElement("p")
        compare_at_price.textContent="Rs. "+eachdata.compare_at_price
        compare_at_price.classList.add("comparePrice")
        secondSection.appendChild(compare_at_price)

       
        let badge_text=document.createElement("h2")
        badge_text.textContent=eachdata.badge_text
        one.appendChild(badge_text)

        let image=document.createElement("img")
        image.src=eachdata.image
        imageSection.appendChild(image)

        let second_image=document.createElement("img")
        second_image.src=eachdata.second_image
        imageSection.appendChild(second_image)

        let button=document.createElement("button")
        button.textContent="Add To Cart"
        button.classList.add("cartButton")

        firstSection.classList.add("firstSection")
        secondSection.classList.add("secondSection")
        imageSection.classList.add("imageSection")

        one.appendChild(imageSection)
        one.appendChild(firstSection)
        one.appendChild(secondSection)
        one.appendChild(button)
  
   

    
   
    updateData.appendChild(one)
}


function displayResults(search_results){
    console.log(search_results[0].category_products)
    updateData.textContent=""
    updateData.classList.remove("loading")

    
   
    search_results[0].category_products.map(each=>eachResult(each))
   

    
   
  
}



function searchData(event) {
    updateData.textContent="Loading Details..."
    updateData.classList.add("loading")
   
       let url = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    categories
                } = jsonData;
                console.log(categories)
              let finaldata
                if (event){
                finaldata=categories.filter(each=>{
                    if (each.category_name===event.target.value)
                    return each
                })}
                else{
                     finaldata=[categories[0]]
                }
                console.log(finaldata)
                if (finaldata[0].category_name==="Men"){
                    men.classList.add("color");
                    women.classList.remove("color");
                    kid.classList.remove("color");
                }
                else if (finaldata[0].category_name==="Women"){
                    men.classList.remove("color");
                    women.classList.add("color");
                    kid.classList.remove("color");
                }

                else if (finaldata[0].category_name==="Kids"){
                    men.classList.remove("color");
                    women.classList.remove("color");
                    kid.classList.add("color");
                }
                displayResults(finaldata);
            });
    
}

searchData();
men.addEventListener("click",searchData)
women.addEventListener("click",searchData)
kid.addEventListener("click",searchData)