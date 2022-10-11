import BookInfo from "./BookInfo";
import { Link} from "react-router-dom";
import PropTypes from "prop-types";

const MainPage = ({books, onUpdateBooks, options})=>{
    return(
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                {options.map(option=>(
                    option.value !== 'none' &&
                        (
                        <div key={option.value}>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">{option.text}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                    {books.filter((book)=>book.shelf===option.value).map((book)=>(
                                    <BookInfo
                                        key={book.id}
                                        books={books}
                                        book={book}  
                                        onUpdateBooks={onUpdateBooks}
                                        options={options}
                                    />
                                    ))}
                                    </ol>
                                </div>
                            </div>
                        </div>
                        )
                    ))}
            </div>
            <Link to="/search" className="open-search">
                Add a Book
            </Link>
        </div>
    )
}

MainPage.propTypes = {
    books: PropTypes.array.isRequired,
    options: PropTypes.array.isRequired,
    onUpdateBooks: PropTypes.func.isRequired
}

export default MainPage;