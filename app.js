// wybieramy dolne pole do wpisywania nowego todo:

const addForm = document.querySelector('.add');

// wybieramy okienko search:

const search = document.querySelector('.search input');

// wybieramy listę todos

const list = document.querySelector('.todos');


console.log(list);


// funkcja generowania nowego templatu HTML:

const generateTemplate = (todo) => {

    // tworzymy template string:

    const html = `

    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo}</span>
        <i class="far fa-trash-alt delete"></i>
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

    // sprawdzamy w konsoli:


    console.log(todo);

    // wywolujemy funkcje generateTmeplate i podajemy jako input zmienną todo czyli
    // przycięty o spacje string wpisany przez usera. Ale tylko jeśli string
    // ma długość większą od zera (czyli pomijamy jeśli user zostawi puste pole
    // i wcisnie enter). metoda .reset dziala an formularzach i usuwa wpisany
    // string po kliknieciu enter (czy po kliknieciu submit button):

    if(todo.length) {
        
        generateTemplate(todo);
        addForm.reset();
    }

});


// usuwanie elementów z listy z wykorzystaniem event delegation:
// nasluchujemy clicka ogólnie w liscie, i jesli target to była ikona
// trash, to usuwamy parent element, czyli list item li.



list.addEventListener('click', e => {
  if(e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  }

});

// Wyszukiwanie:

const filterTodos = (term) => {
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add('filtered'));

    // ten wykrzyknik wyżej to negowanie wartości boolean
    // czyli zamieni true na false


    Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove('filtered'));
      
    

};


// keyup event:



search.addEventListener('keyup', () => {

  const term = search.value.trim().toLowerCase();
  filterTodos(term);


});


