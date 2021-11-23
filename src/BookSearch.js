import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import {DebounceInput} from 'react-debounce-input';
import * as BooksAPI from './BooksAPI'

class BookSearch extends React.Component {
    static propTypes = {
        shelves: PropTypes.array.isRequired,
        myReads: PropTypes.array.isRequired,
        handleMoveBook: PropTypes.func.isRequired
    }

    state = {
        query: '',
        queryError: '',
        searchResults: []
    }

    componentDidMount() {
        this.searchBooks(this.state.query);
    }

    searchBooks = (query) => {
        if( query.trim() ) {
            //console.debug(`Searching for ${query.trim()}`)
            BooksAPI.search(query.trim())
                .then((results) => {
                    //console.debug(results)

                    if( results.error || !results )
                        this.setState( { query: query, searchResults: [], queryError: 'No results found' } );
                    else {
                        let searchResults = [];
                        results.forEach(result => {
                            // search results doesn't have the 'shelf' attribute
                            // if       the book is found in 'myReads' 
                            // then     use the book from 'myReads' 
                            // else     use the book from 'result'
                            let b = this.props.myReads.filter(myBook => myBook.id === result.id )
                            searchResults.push( b.length ? b[0] : result );
                        });
                        this.setState( { query: query, searchResults: searchResults, queryError: '' } );
                    }
                }
            )
        } else {
            this.setState( { query: query, searchResults: [], queryError: 'Search by title or author' }  );
        }
    }

    render() {
        const { shelves, handleMoveBook } = this.props
        const { query, queryError, searchResults } = this.state
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <DebounceInput debounceTimeout={300}
                            type="text" placeholder="Search by title or author" 
                            value={query}
                            onChange={(event) => this.handleSearch(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Search Results</h2>
                        {searchResults.map(book => (
                            <Book key={book.id} 
                                book={book} 
                                moveToOptions={shelves} 
                                handleMoveBook={handleMoveBook} />
                            ))}
                        {queryError && (
                            <h4>{queryError}</h4>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default BookSearch