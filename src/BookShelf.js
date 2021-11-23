import {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
    static propTypes = {
        shelfName: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        moveToOptions: PropTypes.array.isRequired,
        handleMoveBook: PropTypes.func.isRequired,
    }
    render() {
        const { books, shelfName, moveToOptions, handleMoveBook } = this.props
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfName}</h2>
                <div className="bookshelf-books">
                    {books.map(book => (
                        <Book key={book.id} book={book} moveToOptions={moveToOptions} handleMoveBook={handleMoveBook}/>
                    ))}
                </div>
            </div>
        )
    }
}

export default BookShelf