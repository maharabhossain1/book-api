// Selection document elements 
const inputField = document.getElementById('input-field');
const searchBtn = document.getElementById('search-btn');
const card = document.getElementById('cards');
const cardData = document.getElementById('cardData');
const searchResult = document.getElementById('search-results');

// Dynamic Html Arrow function 
const bookCards = (coverPic,bookTitle,authorName,year, publishName, numbers) =>{
    const div1 = document.createElement('div');
    div1.classList.add('col','my-3','rounded-3');
    const div = document.createElement('div');
    div.classList.add('card','d-flex','flex-column','justify-content-center', 'align-items-center', 'shadow');
    div.style.width="18rem";
    div.style.height= '35rem';
    div.innerHTML =`
    <img src="https://covers.openlibrary.org/b/id/${coverPic}-M.jpg" class="card-img-top img-fluid w-50" alt="">
    <div class="card-body overflow-hidden">
        <h5 class="card-text"> <u> Book title :</u> ${bookTitle}</h5>
        <p class="card-text"> <u>Authore Name :</u> ${authorName}</p>
        <p class="card-title"><u>First publish year :</u> ${year}</p>
        <p class="card-text "><u> Publishers :</u> ${publishName}</p>
    </div>`;
    div1.appendChild(div); 
    card.appendChild(div1);
    searchResult.innerText =`Search result :${numbers}` ;
};

// API calling funtion 
const bookApi =(bookName) =>{
    fetch(`https://openlibrary.org/search.json?q=${bookName}`)
    .then(res => res.json())
    .then(datas => {
        const {docs} = datas;       // Destructuring data object 
        card.textContent = '';
        if (docs.length !== 0){     //for error handling
            docs.forEach( element => {
                const {cover_i,title,author_name,first_publish_year,publisher} = element; // Destructuring element object 
                if ((author_name && cover_i && publisher) !== undefined){
                    bookCards(cover_i,title,author_name,first_publish_year,publisher, docs.length); //calling bookCards function and putting destructured variables into parameter 
                };
            });   
        }else{
            searchResult.innerText =`Result not found`
        }  
    })
};

// Search  butter Click Event 
searchBtn.addEventListener('click',function(){
    inputField.innerText = '';
    const inputValue = inputField.value;
    bookApi(inputValue);
});
