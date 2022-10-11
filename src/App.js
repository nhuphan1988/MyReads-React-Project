import "./App.css";
import { useState, useEffect } from "react";
import {Route, Routes} from "react-router-dom"
import MainPage from "./MainPage";
import SearchPage from "./SearchPage";
import * as BooksAPI from "./BooksAPI"


function App() {
    // declare list of books currently on shelf
    const [books, setBooks] = useState([]);

    // declare list of category options
    const options = [
        {value: 'currentlyReading', text: 'Currently Reading'},
        {value: 'wantToRead', text: 'Want to Read'},
        {value: 'read', text: 'Read'},
        {value: 'none', text: 'None'}
    ]
    
    useEffect (()=>{
        const getBooks = async ()=>{
            const res = await BooksAPI.getAll();
            setBooks(res);
        };
        getBooks();
    }, [])

    const onUpdateBooks = (books)=>{
        setBooks(books);
    }

    return (
    <div className="app">
        <Routes>
            <Route 
                exact path="/" 
                element={
                <MainPage 
                    books={books} 
                    onUpdateBooks={onUpdateBooks}
                    options={options}
                />
            } 
            />
            <Route 
                path="/search" 
                element={
                <SearchPage  
                    books={books} 
                    onUpdateBooks={onUpdateBooks}
                    options={options}
                />
                } 
            />
        </Routes>
    </div>
  );
}

export default App;
