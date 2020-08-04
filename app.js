// wybieramy dolne pole do wpisywania nowego todo:

const addForm = document.querySelector('.add');

// wybieramy okienko search:

const search = document.querySelector('.search input');

// wybieramy listę todos

const list = document.querySelector('.todos');



// FUNKCJA UPDATE LOCAL STORAGE:

const store = () => {
  window.localStorage.myitems = list.innerHTML;
}

const getValues = () => {

  let storedValues = window.localStorage.myitems;
  
  if (!storedValues) {
    list.innerHTML = `
    <li class="list-group-item d-flex justify-content-between align-items-center p-0 mb-1">
    <span class="px-3 my-3">Add some todos</span><i class="far fa-trash-alt delete p-4"></i></li>

    <li class="list-group-item d-flex justify-content-between align-items-center p-0 mb-1">
    <span class="px-3 my-3">Make a coffe</span><i class="far fa-trash-alt delete p-4"></i></li>

    <li class="list-group-item d-flex justify-content-between align-items-center p-0 mb-1">
    <span class="px-3 my-3">Start working:)</span><i class="far fa-trash-alt delete p-4"></i></li>
    `;
  }

  else {
    list.innerHTML = storedValues;
  }
}

getValues();



//funkcja generowania nowego templatu HTML:

const generateTemplate = (todo) => {

  // tworzymy template string:

  const html = `
    
    <li class="list-group-item d-flex justify-content-between align-items-center p-0 mb-1">
    <span class="px-3 my-3">${todo}</span>
    <i class="far fa-trash-alt delete p-4"></i>
    </li>
    
    `;

  // wstrzykujemy nowy html:

  list.innerHTML += html;


}

// przypinamy event submit do wybranego elementu

addForm.addEventListener('submit', e => {

  // zapobieganie domyslnej akcji

  e.preventDefault();

  //  tworzymy zmienną todo, pobieramy z niej wartość czyli to co wpisze user,
  // metoda .trim przycina spacje przed i po wpisanym wyrazeniu.

  const todo = addForm.dodaj.value.trim();

  // wywolujemy funkcje generateTmeplate i podajemy jako input zmienną todo czyli
  // przycięty o spacje string wpisany przez usera. Ale tylko jeśli string
  // ma długość większą od zera (czyli pomijamy jeśli user zostawi puste pole
  // i wcisnie enter). metoda .reset dziala an formularzach i usuwa wpisany
  // string po kliknieciu enter (czy po kliknieciu submit button). Potem wywołujemy
  // metode store zeby zupdejtowac local storage:

  if (todo.length) {

    generateTemplate(todo);
    addForm.reset();


    store();
    // console.log(localStorage.myitems);
  }

});


// ! USUWANIE TODOS Z LISTY

// usuwanie elementów z listy z wykorzystaniem event delegation:
// nasluchujemy clicka ogólnie w liscie, i jesli target to była ikona
// trash, to usuwamy parent element, czyli list item li.
// sfdkljgsldkg


list.addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {
    console.log("clicked");
    e.target.parentElement.remove();
    store();
    
  }

});

// Wyszukiwanie:

const filterTodos = (term) => {
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add('filtered'));

  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove('filtered'));

};

// keyup event:

search.addEventListener('keyup', () => {

  const term = search.value.trim().toLowerCase();
  filterTodos(term);


});


// ! zegar

const clock = document.querySelector('.clock');

const tick = () => {

  const now = new Date();

  console.log(dateFns.format(now, 'HH mm'));


  const weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";


  let n = weekday[now.getDay()];
  let day = document.querySelector('.day');
  day.innerHTML = n;


  // * czas - z uzyciem date-fns library:

  const h = (dateFns.format(now, 'HH'));
  const m = (dateFns.format(now, 'mm'));

  // sekundy:

  // const s = (dateFns.format(now, 'ss'));



  const html = `
    <span>${h}</span> :
    <span>${m}</span>

  `;

  clock.innerHTML = html;

};

setInterval(tick, 1000);




