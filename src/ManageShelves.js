import {Component} from 'react'
import PropTypes from 'prop-types'

class ManageShelves extends Component {
    static propTypes = {
        shelves: PropTypes.array.isRequired,
        handleAddShelf: PropTypes.func.isRequired,
        handleRemoveShelf: PropTypes.func.isRequired,
    }

    state = {
        shelfName: '',
        validationMessage: ''
    }

    setShelfName = (event) => {
        this.setState({ shelfName: event.target.value })
    }

    addShelf = (event) => {
        event.preventDefault();
        const {shelfName} = this.state
        
        let nextId = this.props.shelves.length ? this.props.shelves[this.props.shelves.length-1].id+1 : 1;
        let newShelf = { 'id': nextId, 'value': this.camelCase(shelfName), 'display': shelfName }
        //console.debug( newShelf );

        if( this.validateShelf(newShelf) ) {
            this.props.handleAddShelf( newShelf )
            this.setState({ validationMessage: '', shelfName: '' });
        } else {
          this.setState({ validationMessage: `Duplicate shelf '${shelfName}' already exisits` }); 
        }
    }

    validateShelf = (newShelf) => {
        return this.props.shelves.filter(s => 
            s.display.toLowerCase() === newShelf.display.toLowerCase() || 
            s.value.toLowerCase() === newShelf.value.toLowerCase()).length ? 
                false : true;
    }

    // reference https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
    camelCase = (str) => {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }

    removeShelf = (shelf) => {
        this.props.handleRemoveShelf(shelf);
    }

    render() {
        return (
            <div className="books-shelf-manage">
                <div className="books-shelf-add">
                    <div className="books-shelf-add-input-wrapper">
                        <form onSubmit={(event) => this.addShelf(event)}>
                            <input 
                                type="text" placeholder="Enter Shelf Name" 
                                value={this.state.shelfName}
                                onChange={(event) => this.setShelfName(event)}
                                />
                            <button disabled={this.state.shelfName.trim() === ''}>Add Shelf</button>
                        </form>
                        <h4>{this.state.validationMessage}</h4>
                    </div>
                </div>
                <div className='grid'>
                    <h2 className="bookshelf-title">My Shelves</h2>
                    {this.props.shelves.map( (s) => this.displayShelf(s) )}
                </div>
            </div>
        )
    }

    displayShelf = (shelf) => {
        return (
            <div key={shelf.id} className="grid-item">
                <h4>{shelf.display}</h4>
                <button onClick={() => this.removeShelf(shelf)}>Remove Shelf</button> 
            </div>
        )
    }
}

export default ManageShelves
