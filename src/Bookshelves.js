import React from 'react'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

class Bookshelves extends React.Component {
    static propTypes = {
        shelves: PropTypes.array.isRequired,
        myReads: PropTypes.array.isRequired,
        handleMoveBook: PropTypes.func.isRequired
    }

    render() {
        const {shelves, myReads, handleMoveBook} = this.props;
        return (
            <div>
                {shelves.map( (shelf) => ( 
                    <BookShelf key={shelf.id} 
                        books={myReads.filter(book => book.shelf === shelf.value)} 
                        shelfName={shelf.display} 
                        moveToOptions={shelves} 
                        handleMoveBook={handleMoveBook}/>
                ))}
            </div>
        )
    }

}

export default Bookshelves;
