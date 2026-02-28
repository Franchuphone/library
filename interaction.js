class Book {

    constructor ( title, author, pagesNbr, readState ) {
        this.title = title;
        this.author = author;
        this.pages = pagesNbr;
        this.read = readState;
        this.id = crypto.randomUUID();
    }

    cleanNames() {
        this.title = this.title.split( " " ).map( ( word ) => word.charAt( 0 ).toUpperCase() + word.toLowerCase().slice( 1 ) ).join( " " );
        this.author = this.author.split( " " ).map( ( word ) => word.charAt( 0 ).toUpperCase() + word.toLowerCase().slice( 1 ) ).join( " " );
        return this;
    }

    cleanReadState() {
        ( this.read === "Yes" ) ? this.read = true : this.read = false;
        return this;
    }

    info() {
        return `${ this.title } \n ${ this.author } \n ${ this.pages } pages`;
    }

    toggleRead() {
        ( this.read ) ? this.read = false : this.read = true;
    }

    createCard() {
        const bookCard = document.createElement( "li" );
        const bookIntro = document.createElement( "h1" );
        const bookErase = document.createElement( "button" );
        const readButton = document.createElement( "button" );
        bookCard.dataset.id = this.id;
        bookIntro.textContent = this.info();
        displayReadButton( this, readButton );
        toggleReadButton( this, readButton );
        bookErase.classList.add( "erase-button" );
        bookErase.textContent = "X";
        bookErase.addEventListener( "click", removeBook );
        document.querySelector( "ul" ).appendChild( bookCard ).append( bookIntro, readButton, bookErase );
    }
}

function addToLibrary( book ) {
    book.cleanNames().cleanReadState().createCard();
    myLibrary.push( book );
}

function displayReadButton( book, bookNode ) {
    if ( book.read ) {
        bookNode.textContent = "Read !";
        bookNode.style.backgroundColor = "#9bb998";
    } else {
        bookNode.textContent = "Not read yet !";
        bookNode.style.backgroundColor = "#c08e8e";
    }
}

function toggleReadButton( book, bookNode ) {
    bookNode.addEventListener( "click", () => {
        book.toggleRead();
        displayReadButton( book, bookNode );
    } )
}

function removeBook() {
    this.parentElement.remove();
    myLibrary = myLibrary.filter( book => book.id !== this.parentElement.dataset.id );
}

let myLibrary = [];
const dialogBox = document.querySelector( "dialog" );
const form = document.querySelector( "form" );
const inputs = document.querySelectorAll( "input[type='text']" );

document.querySelector( ".new-button" ).addEventListener( "click", () => dialogBox.showModal() );

document.querySelector( "dialog button[type='button']" ).addEventListener( "click", () => {
    form.reset();
    removeInputsFormat();
    dialogBox.close();
} );


const inputTitle = document.querySelector( "#book-title" );
const inputAuthor = document.querySelector( "#book-author" );
const inputPages = document.querySelector( "#book-pages" );
const inputRead = document.querySelector( "fieldset" );

inputTitle.addEventListener( "input", () => {
    testTitle();
} );

inputAuthor.addEventListener( "input", () => {
    testAuthor();
} )

inputPages.addEventListener( "input", () => {
    testPages();
} )

inputRead.addEventListener( "click", () => {
    const inputReadState = document.querySelector( "input[type='radio']:checked" );
    console.log( inputReadState )
    if ( inputReadState ) inputRead.className = "field-valid"
} )

function testTitle() {
    testInput( inputTitle, `^[\\w-!+'"][\\w\\s-!$%^&*()_+'"]*$`, "Enter a valid title" )
}

function testAuthor() {
    testInput( inputAuthor, `^[\\w][\\w\\s'"-]*$`, "Enter a valid name" )
}

function testPages() {
    testInput( inputPages, `^[1-9][\\d]*$`, "Enter a valid number" )
}

function testInput( element, test, message ) {
    const constraint = new RegExp( test, '' );
    if ( constraint.test( element.value ) ) {
        element.setCustomValidity( "" );
        element.className = "field-valid"
    } else {
        element.setCustomValidity( message );
        element.reportValidity();
        element.className = "field-invalid"
    }
}

function removeInputsFormat() {
    inputTitle.className = "";
    inputAuthor.className = "";
    inputPages.className = "";
    inputRead.className = "";
}

form.addEventListener( "submit", function ( e ) {
    e.preventDefault();
    if ( !form.checkValidity() ) {
        testAuthor();
        testPages();
        testTitle();
        inputRead.className = "field-invalid"
        return
    }
    const newBook = new Book( form[ 0 ].value, form[ 1 ].value, form[ 2 ].value, document.querySelector( 'input[name="read-state"]:checked' ).value );
    addToLibrary( newBook );
    removeInputsFormat();
    form.reset();
    dialogBox.close();
} );