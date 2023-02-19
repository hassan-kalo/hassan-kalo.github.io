    //Add tafsir and search
    
    //const explainContainer = document.getElementById('explain-container')
    const pageDiv = document.createElement('div')
    const pageInfoDiv = document.createElement('div')
    pageInfoDiv.classList.add('pageInfoDiv')
    pageDiv.classList.add('page')
    document.body.insertAdjacentElement("afterbegin", pageDiv)

    const nextPageBtn = document.createElement('div')
    nextPageBtn.classList.add('next-page-btn')
    nextPageBtn.textContent = '❯'
    const prevPageBtn = document.createElement('div')
    prevPageBtn.classList.add('prev-page-btn')
    prevPageBtn.textContent = '❮'
    document.body.append(prevPageBtn, nextPageBtn)

    tafsirContainer = document.createElement('div')
    tafsirContainer.classList.add('tafsir')
    pageDiv.after(tafsirContainer)
    pageDiv.before(pageInfoDiv)
    //document.body.insertBefore(tafsirContainer, pageDiv.nextSibling)

let pageNumCounter = parseInt(localStorage.getItem('lastPage')) || 1;
if(pageNumCounter==1){
    prevPageBtn.style.color = 'gray'
}
else if(pageNumCounter==pages.length){
    nextPageBtn.style.color = 'gray'
}
else{
    nextPageBtn.style.color = 'white'
    prevPageBtn.style.color = 'white'
}
function explainWord(e){
    const dictContainer = document.createElement('div')
    dictContainer.classList.add('dictContainer')
    dictContainer.innerText = `${e.target.innerText}: ${arQuranDictionary[e.target.innerText.replace(arDiacritics,'')]}`

}
function tafsir(e){
    
    tafsirContainer.textContent = e.target
}
function newContent(){
    pageDiv.innerText = ''
    //let divAyasCreated = false
    //let containerAyas
    let firstWordInFirstAyaFound = false
    pageDiv.innerText = ''
    pageInfoDiv.innerText = ''
    const pageNumDiv = document.createElement('div')
    pageNumDiv.classList.add('pageNumDiv')
    pageNumDiv.innerText = pageNumCounter 
    const pageArr = pages[pageNumCounter-1].split(' ')
    //let numOf1 = pageArr.filter(element => element === '۝١').length;
    for (let i = 0; i < pageArr.length; i++) {
        //console.log(pageArr.findIndex((element,i) => element.includes("۝")))
        
        const span = document.createElement('span')
        span.textContent = pageArr[i]
        pageDiv.append(span,' ')
        
        if(arQuranDictionary.hasOwnProperty(pageArr[i].replace(arDiacritics, ""))){
            span.classList.add('explained-word')
            span.addEventListener('click',explainWord)
        }            
       
        //if the following number is 1
        else if(firstWordInFirstAyaFound==false && !pageArr[i].includes("۝") && pageArr[pageArr.findIndex((element,index) => index>i && element.includes("۝"))] =='۝١'){
            span.classList.add('firstWordInFirstAya')
            firstWordInFirstAyaFound = true

            const h3 = document.createElement('h3')
            h3.classList.add('sura-h')
            //h3.textContent = pageArr.find((element,index)=>index>i&&namesOfSuras.includes(element.replace(arDiacritics,'')))
            pageDiv.insertBefore(h3,span)

            const h4 = document.createElement('h4')
            h4.classList.add('besm-h')
            h4.textContent = 'بسم الله الرحمن الرحيم'
            pageDiv.insertBefore(h4,span)

        }
        
        else if(pageArr[i].includes('۝')){
            
            span.classList.add('aya-num')
            if(pageArr[i] == '۝١'){
                span.classList.add('first-aya')
                firstWordInFirstAyaFound = false
            }

        }
        
        
    }
    /* const firstWordInFirstAya = document.querySelectorAll('.firstWordInFirstAya')
    firstWordInFirstAya.forEach(element=>{
        console.log(element)
        const h4 = document.createElement('h4')
        h4.textContent = 'سورة'
        pageDiv.insertBefore(h4,element)

        const h3 = document.createElement('h3')
        h3.textContent = 'بسم الله الرحمن الرحيم'
        pageDiv.insertBefore(h3,element)
    }) */
    pageDiv.append(pageNumDiv)
}
newContent()

nextPageBtn.addEventListener('click',()=>{
    if(pageNumCounter<pages.length){
        pageNumCounter++
        localStorage.setItem('lastPage', pageNumCounter)
        newContent() 
        prevPageBtn.style.color = 'white'
        if(pageNumCounter==pages.length){
            nextPageBtn.style.color = 'gray'
        }
    }
    else{
        nextPageBtn.style.color = 'gray'
        console.log('This is the last page')
    }
})
prevPageBtn.addEventListener('click',()=>{
    if(pageNumCounter>1){
        pageNumCounter--
        localStorage.setItem('lastPage', pageNumCounter)
        newContent() 
        nextPageBtn.style.color = 'white'
        if(pageNumCounter==1){
            prevPageBtn.style.color = 'gray'
        }
    }
    else{
        console.log('This is the first page')
        prevPageBtn.style.color = 'gray'
    }
})


//////////////////////////////////////////////

/* const string = "إِنَّ ٱلَّذِينَ كَفَرُواْ سَوَآءٌ عَلَيۡهِمۡ ءَأَنذَرۡتَهُمۡ أَمۡ لَمۡ تُنذِرۡهُمۡ لَا يُؤۡمِنُونَ";
const wordToFind = "أنذرتهم";

const collator = new Intl.Collator('ar', { sensitivity: "base" });
const normalizedString = string.normalize("NFD");
const normalizedWordToFind = wordToFind.normalize("NFD");
console.log(collator)
console.log(normalizedString)
console.log(normalizedWordToFind)
if (collator.compare(normalizedString, normalizedWordToFind) === 0) {
  console.log(`The word "${wordToFind}" was found in the string.`);
} else {
  console.log(`The word "${wordToFind}" was not found in the string.`);
} */