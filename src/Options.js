import { useState } from "react";
import * as BooksAPI from "./BooksAPI";
import PropTypes from "prop-types";

const Options = ({book, options, onUpdateBooks})=>{
    const [shelf, setShelf] = useState (book.shelf)

    // call method BookAPI.update() to update shelf value of book
    // then reload the book list by calling method BookAPI.getAll() to get respond
    // then update books list by useState
    const handleUpdate = (book, shelfSelected)=>{
        const update = async()=>{
            try{
                const res = await BooksAPI.update(book, shelfSelected);
                BooksAPI.getAll()
                .then(books=>onUpdateBooks(books))
            }catch(error){
                console.log(error)
            }
        }
        update()
    }
    // change in the shelf selected by user will call the function "handleUpdate" inside the function "onSelectOption"
    // then update shelf value by useState
    const onSelectOption = (event)=>{
        event.preventDefault();
        const select = event.target.value;
        handleUpdate(book, select)
        setShelf(select) 
    }

    return(
        <div className="book-shelf-changer">
            <select onChange={onSelectOption} value={shelf}>
                <option value="unselected" disabled>Move to...</option>
                {options.map(option=>(
                <option 
                    key={option.value} 
                    value={option.value}
                >{option.text}
                </option>
            ))}
            </select>
        </div> 
    )
}

Options.propTypes = {
    book: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    onUpdateBooks: PropTypes.func.isRequired
}

export default Options