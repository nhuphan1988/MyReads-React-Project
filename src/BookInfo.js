import Options from "./Options";
import PropTypes from "prop-types";

const BookInfo = ({book, options, onUpdateBooks})=>{
    
    // handle search result error if authors is empty/more than 1 author
    let authors = ""
    if (book.authors){
        if (book.authors.length >1){
            authors = book.authors.join(" & ");
        }else if(book.authors.length <0){
            authors = "Unknown author"
        }else{
            authors = book.authors
        }
    }
    
    // handle search result error if image URL is empty
    let imageLink = ""
    if (book.imageLinks){
        imageLink = book.imageLinks.smallThumbnail;
    }
        
    return(
        <div>
            <li key={book.id}>
                <div className="book">
                    <div className="book-top">
                        <div
                            className="book-cover"
                            style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${imageLink})`,
                            }}
                        ></div>
                        <Options onUpdateBooks ={onUpdateBooks} book={book} options={options}/>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{authors}</div>
                    
                </div>
            </li>
        </div>
    )
}

BookInfo.propTypes = {
    book: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    onUpdateBooks: PropTypes.func.isRequired
}

export default BookInfo;