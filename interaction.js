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

document.querySelector( ".new-button" ).addEventListener( "click", () => dialogBox.showModal() );

document.querySelector( "dialog > button" ).addEventListener( "click", () => {
    form.reset();
    dialogBox.close();
} );

form.addEventListener( "submit", function ( e ) {
    e.preventDefault();
    const newBook = new Book( form[ 0 ].value, form[ 1 ].value, form[ 2 ].value, document.querySelector( 'input[name="read-state"]:checked' ).value );
    addToLibrary( newBook );
    form.reset();
    dialogBox.close();
} )