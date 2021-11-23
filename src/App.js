import React from 'react'
import './App.css'
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom'
import BookSearch from './BookSearch'
import Bookshelves from './Bookshelves'
import ManageShelves  from './ManageShelves'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {

  state = {
    myShelves: [ 
      { 'id': 1, 'value':'currentlyReading', 'display': 'Currently Reading' },
      { 'id': 2, 'value':'wantToRead', 'display': 'Want to Read' },
      { 'id': 3, 'value':'read', 'display': 'Read' },
    ],
    myReads: []
  }

  componentDidMount() {
    this.fetchAllBooks()
  }

  componentDidUpdate() {
    localStorage.setItem('myShelves', this.state.myShelves);
    localStorage.setItem('myReads', this.state.myReads);
  }

  fetchAllBooks = () => {
      BooksAPI.getAll()
          .then((myReads) => {
              //console.log(myReads)
              this.setState(() => (
                  { myReads: myReads }
              ))
          }
      )
  }

  moveBook = ( book, shelf ) => {
      //console.debug(`Moving ${book.title} to ${shelf}`)
      let booksNotMoved = this.state.myReads.filter(b => b.id !== book.id)
      book.shelf = shelf;

      BooksAPI.update(book, shelf)
      .then((data) => {
          let myReads = [...booksNotMoved, book];
          this.setState(() => (
              { myReads: myReads }
          ))
      })
  }

  addShelf = (shelfObj) => {
    this.setState((currentState) => ({
      myShelves: [...currentState.myShelves, shelfObj]
    }))
  }

  removeShelf = (shelfObj) => {
    console.log(`Removing shelf ${shelfObj.display}`)
    let books = this.state.myReads.filter( b => b.shelf === shelfObj.value )
    books.forEach(book => this.moveBook(book, 'none') )

    this.setState((currentState) => ({
      myShelves: currentState.myShelves.filter( s => s.id !== shelfObj.id )
    }))
  }

  render() {
    const {myReads,myShelves} = this.state
    return (
      <div className="App">
        <div className="list-books">
          <div className="list-books-title">
              <h1>MyReads</h1>
          </div>
          <BrowserRouter>
            <div className="books-menu-bar">
              <Link to="/" className="App-link">Home</Link>
              <Link to="/search" className="App-link">Search</Link>
              <Link to="/manageShelves" className="App-link">Manage Shelves</Link>
            </div>
            <Routes>
              <Route path="/" element={<Bookshelves 
                myReads={myReads} 
                shelves={myShelves}
                handleMoveBook={this.moveBook}
                />}/>
              <Route exact path="/search" 
                element={<BookSearch 
                  shelves={myShelves}
                  myReads={myReads} 
                  handleMoveBook={this.moveBook}
                  />}/>
              <Route exact path="/manageShelves" 
                element={<ManageShelves 
                  shelves={myShelves}
                  handleAddShelf={this.addShelf}
                  handleRemoveShelf={this.removeShelf}
                  />}/>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    )
  }
}

export default BooksApp