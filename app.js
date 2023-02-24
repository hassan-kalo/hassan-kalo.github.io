//Add tafsir and search

//const explainContainer = document.getElementById('explain-container')
const pageDiv = document.createElement("div");
const pageInfoDiv = document.createElement("div");
pageInfoDiv.classList.add("pageInfoDiv");
pageDiv.classList.add("page");
document.body.insertAdjacentElement("afterbegin", pageDiv);

const nextPageBtn = document.createElement("div");
nextPageBtn.classList.add("next-page-btn");
nextPageBtn.textContent = "❯";
const prevPageBtn = document.createElement("div");
prevPageBtn.classList.add("prev-page-btn");
prevPageBtn.textContent = "❮";
document.body.append(prevPageBtn, nextPageBtn);

const tafsirsContainer = document.createElement("div");
tafsirsContainer.classList.add("tafsirs-container");
pageDiv.after(tafsirsContainer);
//document.body.insertBefore(tafsirsContainer, pageDiv.nextSibling)

let pageNumCounter = parseInt(localStorage.getItem("lastPage")) || 1;
let suraName;
let suraNum;
if (pageNumCounter == 1) {
  prevPageBtn.style.color = "gray";
} else if (pageNumCounter == pages.length) {
  nextPageBtn.style.color = "gray";
} else {
  nextPageBtn.style.color = "white";
  prevPageBtn.style.color = "white";
}

const dictContainer = document.createElement("div");
dictContainer.classList.add("dict-container");
dictContainer.classList.add("tafsir-container");
tafsirsContainer.prepend(dictContainer);
function explainWord(e) {
  const div = document.createElement("div");
  //div.classList.add('explained-word')
  div.innerHTML = `<span class="explained-word">${e.target.innerText}:</span> ${
    arQuranDictionary[e.target.innerText.replace(arDiacritics, "")]
  }`;
  dictContainer.append(div);
}

// /[\u0660-\u0669]/ any ar digit

function showTafsir() {
  if (this.checked) {
    const div = document.createElement("div");
    div.classList.add("tafsir-container");
    div.id = "div" + this.dataset.tafsirName;

    const h3 = document.createElement("h3");
    //Object.keys(tafsirs)[i]
    h3.innerText = this.dataset.tafsirName;
    div.append(h3);

    tafsirs[this.dataset.tafsirName][pageNumCounter - 1].forEach(
      (element, index) => {
        const divAyaTafsir = document.createElement("div");
        divAyaTafsir.classList.add("aya-tafsir");

        const divAya = document.createElement("div");
        divAya.classList.add("div-aya");
        divAya.innerText =
          pages[pageNumCounter - 1].split(/[\u0660-\u0669]/)[index];
        //divAya.innerText = pages[pageNumCounter-1].match(/.+[\u0660-\u0669]+۝/)[index]
        //divAya.innerText = pages[pageNumCounter-1].match(/^[^\u0660-\u0669۝]+\u0660-\u0669۝$/)[index]
        //divAya.innerText = pages[pageNumCounter-1].match(/(?=\d\\۝)/)[index]
        //divAya.innerText = pages[pageNumCounter-1].match(/[^۝]/)[index]

        const divTafsir = document.createElement("div");
        divTafsir.classList.add("div-tafsir");
        divTafsir.innerText = element;

        divAyaTafsir.append(divAya, divTafsir);
        div.append(divAyaTafsir);
      }
    );
    tafsirsContainer.append(div);
  } else {
    console.log(this);
    document.getElementById("div" + this.dataset.tafsirName).remove();
    //document.getElementById
  }
}
console.log(Object.keys(tafsirs));
const checkboxContainer = document.createElement("div");
checkboxContainer.classList.add("checkbox-container");
for (let i = 0; i < Object.keys(tafsirs).length; i++) {
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.dataset.tafsirName = Object.keys(tafsirs)[i];
  checkbox.id = `checkbox${i}`;
  checkbox.addEventListener("click", showTafsir);
  const label = document.createElement("label");
  label.setAttribute("for", `checkbox${i}`);
  label.innerText = Object.keys(tafsirs)[i];
  checkboxContainer.append(checkbox, label);
}
pageDiv.before(checkboxContainer, pageInfoDiv);

//document.body.append(checkboxContainer)
//function ayaNumClickHandler(e){
//    console.log('ayaNumClicked')
/* checkboxContainer.style.display = 'grid'
    checkboxContainer.style.top = e.target.offsetTop + 'px'
    checkboxContainer.style.left = e.target.offsetLeft + 'px'
    console.log(suraNum + e.target.innerText)
    console.log(e.target.offsetTop) */
//}
function newContent() {
  if (pageNumCounter < 2) {
    suraName = "سورة الفاتحة";
    suraNum = 1;
  } else if (pageNumCounter < 50) {
    //suraName = 'سورة البقرة'
    suraName = "سورة الإخلاص    سورة الفلق    سورة الناس";
    suraNum = 2;
  } else if (pageNumCounter < 77) {
    suraName = "سورة آل عمران";
    suraNum = 3;
  } else if (pageNumCounter < 106) {
    suraName = "سورة النساء";
    suraNum = 4;
  } else if (pageNumCounter < 128) {
    suraName = "سورة المائدة";
    suraNum = 5;
  } /* else{
        suraName = 'سورة الإخلاص    سورة الفلق    سورة الناس'
    } */
  pageDiv.innerText = "";
  //let divAyasCreated = false
  //let containerAyas
  let firstWordInFirstAyaFound = false;
  pageDiv.innerText = "";
  pageInfoDiv.innerText = "";
  const pageNumDiv = document.createElement("div");
  pageNumDiv.classList.add("pageNumDiv");
  pageNumDiv.innerText = pageNumCounter;
  const pageArrWord = pages[pageNumCounter - 1].split(" ");
  //let numOf1 = pageArrWord.filter(element => element === '۝١').length;
  for (let i = 0; i < pageArrWord.length; i++) {
    if (pageArrWord[i] != "") {
      //console.log(pageArrWord.findIndex((element,i) => element.includes("۝")))
      //tafsirsContainer.innerText += pageArrWord[i]
      const span = document.createElement("span");
      span.textContent = pageArrWord[i];
      pageDiv.append(span, " ");

      if (
        arQuranDictionary.hasOwnProperty(
          pageArrWord[i].replace(arDiacritics, "")
        )
      ) {
        span.classList.add("explained-word");
        span.style.cursor = "pointer";
        span.addEventListener("click", explainWord);
      }

      //if the following number is 1
      else if (
        firstWordInFirstAyaFound == false &&
        !pageArrWord[i].includes("۝") &&
        pageArrWord[
          pageArrWord.findIndex(
            (element, index) => index > i && element.includes("۝")
          )
        ] == "۝١"
      ) {
        span.classList.add("firstWordInFirstAya");
        firstWordInFirstAyaFound = true;

        const h3 = document.createElement("h3");
        h3.textContent = suraName;
        h3.classList.add("sura-h");
        //h3.textContent = pageArrWord.find((element,index)=>index>i&&namesOfSuras.includes(element.replace(arDiacritics,'')))
        pageDiv.insertBefore(h3, span);

        if(pageNumCounter!=1){
            const h4 = document.createElement("h4");
            h4.classList.add("besm-h");
            h4.textContent = "بسم الله الرحمن الرحيم";
            pageDiv.insertBefore(h4, span);
        }
      } else if (pageArrWord[i].includes("۝")) {
        span.classList.add("aya-num");
        span.classList.add(`aya${suraNum}${span.innerText}`);
        //span.style.cursor= 'pointer';
        //span.addEventListener('click', ayaNumClickHandler)
        if (pageArrWord[i] == "۝١") {
          span.classList.add("first-aya");
          firstWordInFirstAyaFound = false;
        }
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
  pageDiv.append(pageNumDiv);
}
newContent();

nextPageBtn.addEventListener("click", () => {
  if (pageNumCounter < pages.length) {
    pageNumCounter++;
    localStorage.setItem("lastPage", pageNumCounter);
    newContent();
    prevPageBtn.style.color = "white";
    if (pageNumCounter == pages.length) {
      nextPageBtn.style.color = "gray";
    }
  } else {
    nextPageBtn.style.color = "gray";
    console.log("This is the last page");
  }
});
prevPageBtn.addEventListener("click", () => {
  if (pageNumCounter > 1) {
    pageNumCounter--;
    localStorage.setItem("lastPage", pageNumCounter);
    newContent();
    nextPageBtn.style.color = "white";
    if (pageNumCounter == 1) {
      prevPageBtn.style.color = "gray";
    }
  } else {
    console.log("This is the first page");
    prevPageBtn.style.color = "gray";
  }
});

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
