import { Link} from "react-router-dom";
import { useState} from "react";
import * as BooksAPI from "./BooksAPI";
import BookInfo from "./BookInfo";
import PropTypes from "prop-types";

const SearchPage = ({books, onUpdateBooks, options})=>{
    const [booksResult, setBooksResult] = useState([]);
    const [query, setQuery] = useState("");
    const booksResultShelfAdded = [];
    
    const handleSearchBooks = (event)=>{
        const query = event.target.value;

        // if query is not empty, search result is not empty, 
        // then loop over search result and compare with books in the list
        if (query.length >0){
            BooksAPI.search(query, 20)
            .then(booksResult=>{
                if(booksResult.length >0){
                    booksResult.map(bookResult=>{
                        const bookFound = books.find(book=> book.id === bookResult.id)
                        // if same, asign "shelf" value of book in the list to search book
                        // if not, the book in search list has 'shelf' value as 'none
                        if(bookFound){
                            bookResult.shelf = bookFound.shelf;
                        }else{
                            bookResult.shelf = "none"
                        }
                        // then add book with shelf to new array "booksResultShelfAdded"
                        booksResultShelfAdded.push(bookResult)
                        return booksResultShelfAdded
                    })
                    // use setState to update "booksResult" array by "booksResultShelfAdded"
                    setBooksResult(booksResultShelfAdded)
            }})
        }else{
            // if query is empty, use setState to update "booksResult" as empty array
            setBooksResult([])
        }
        setQuery(query.trim());
        }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/">
                Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        className="search-books"
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={query}
                        onChange={handleSearchBooks}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {booksResult.length >0 && (booksResult.map((book)=>(
                        <BookInfo
                            key={book.id}
                            book={book}
                            books={books}
                            options={options}
                            onUpdateBooks={onUpdateBooks}
                        />
                    )))}
                    {booksResult.length <=0 && query.length >0 &&(
                        <p className="no-result-found">No Result Found. Please try again!</p>
                    )}
                </ol>
            </div>
        </div>
    )
}

SearchPage.propTypes = {
    books: PropTypes.array.isRequired,
    options: PropTypes.array.isRequired,
    onUpdateBooks: PropTypes.func.isRequired
}

export default SearchPage;