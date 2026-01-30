function Book( title, author, pagesNbr, readState ) {
    this.title = title;
    this.author = author;
    this.pages = pagesNbr;
    this.read = readState;
    this.id = crypto.randomUUID();
}

Book.prototype.cleanNames = function () {
    this.title = this.title.split( " " ).map( ( word ) => word.charAt( 0 ).toUpperCase() + word.toLowerCase().slice( 1 ) ).join( " " );
    this.author = this.author.split( " " ).map( ( word ) => word.charAt( 0 ).toUpperCase() + word.toLowerCase().slice( 1 ) ).join( " " );
}

Book.prototype.info = function () {
    return `${ this.title } \n ${ this.author } \n ${ this.pages } pages`;
}

Book.prototype.toggleRead = function () {
    ( this.read ) ? this.read = false : this.read = true;
}

Book.prototype.createCard = function () {
    const bookCard = document.createElement( "li" );
    const bookIntro = document.createElement( "h1" );
    const readButton = document.createElement( "button" );
    bookIntro.textContent = this.info();
    displayReadButton( this, readButton );
    toggleReadButton( this, readButton );
    libraryBoard.appendChild( bookCard ).append( bookIntro, readButton );
}

Book.prototype.eraseCard = function () {

}

function addToLibrary( book ) {
    book.cleanNames();
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

const myLibrary = [];
const libraryBoard = document.querySelector( "ul" );
const addBookButton = document.querySelector( ".new-button" );
const dialogBox = document.querySelector( "dialog" )
const closeDialogButton = document.querySelector( "dialog > button" )
const form = document.querySelector( "form" )

const newBook1 = new Book( "ThE Hobbit", "TolkIen", 295, true );
const newBook2 = new Book( "Elephant Man", "Scott pip", 547, false );

addToLibrary( newBook1 )
addToLibrary( newBook2 )

addBookButton.addEventListener( "click", () => { dialogBox.showModal() } );

closeDialogButton.addEventListener( "click", () => { dialogBox.close() } );

myLibrary.forEach( book => {
    book.createCard();
} );

form.addEventListener( "submit", function ( e ) {
    e.preventDefault();
    const data = new FormData( form );
    const arrayData = [];
    for ( const [ name, value ] of data ) {
        arrayData.push( value );
    }
    console.log( arrayData )
    const newBook = new Book( "Elephant Man", "Scott pip", 547, false )
    addToLibrary( newBook );
    myLibrary.at( -1 ).createCard();
    dialogBox.close();
} )


