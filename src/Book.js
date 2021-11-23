import {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        moveToOptions: PropTypes.array.isRequired,
        handleMoveBook: PropTypes.func.isRequired,
    }

    render() {
        const { book, moveToOptions, handleMoveBook } = this.props
        const hasSmallThumbnail = book.imageLinks && book.imageLinks.smallThumbnail;
        return (
            <div className="book" key={book.id}>
                <div className="book-top">
                    {hasSmallThumbnail && (
                        <div className="book-cover" 
                            style={{ backgroundImage: `url(${book.imageLinks.smallThumbnail}` }}>
                        </div>
                    )}
                    {!hasSmallThumbnail && (
                        <div className="book-cover">No Image</div>
                    )}
                </div>
                <h3 className="book-title">{book.title || 'Untitled'}</h3>
                <div className="book-authors">
                    Authors: {!book.authors ? 
                        (<p>Unknown author</p>) : 
                        book.authors.map(author=> this.renderAuthor( `${book.id}-${author}`, author))}
                </div>
                <div className="book-shelf-changer">
                    <span>Shelf </span>
                    <select value={book.shelf || 'none'} onChange={(event) => handleMoveBook(book, event.target.value)}>
                        <option value='' disabled>Move to...</option>
                        {moveToOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.display}</option>
                        ))}
                        <option value='none'>None</option>
                    </select>
                </div>
            </div>
        )
    }
    renderAuthor = (k, author) => {
        return (
            <p key={k}>{author}</p>
        )
    }
}

export default Book