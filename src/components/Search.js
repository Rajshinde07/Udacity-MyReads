import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import PropTypes from "prop-types";

export default class Search extends Component {
  state = {
    books: [],
    query: "",
  };

  updateInput = (value) => {
    this.setState(() => ({
      query: value,
    }));
    this.updateBooks();
  };

  updateBooks = () => {
    if (this.state.query.length > 0) {
      BooksAPI.search(this.state.query).then((books) => {
        this.setState(() => ({
          books,
        }));
      });
    }
  };

  update = (book, value) => {
    this.props.onChange(book, value);
  };

  render() {
    //Added Here It Works But Not Sure Where to add it
    this.state.books.forEach((book) => {
      this.props.Books.forEach((myBook) => {
        if (myBook.id === book.id) {
          book.shelf = myBook.shelf;
        }
      });
    });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search By Title Or Author"
              onChange={(event) => this.updateInput(event.target.value)}
              value={this.state.query}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.query.length > 0 &&
              this.state.books.length > 0 &&
              this.state.books.map((book) => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      {book.imageLinks ? (
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url("${book.imageLinks.smallThumbnail}")`,
                          }}
                        ></div>
                      ) : (
                        ""
                      )}
                      <div className="book-shelf-changer">
                        <select
                          onChange={(event) =>
                            this.update(book, event.target.value)
                          }
                          value={book.shelf}
                        >
                          <option value="move" disabled>
                            Move to...
                          </option>
                          <option value="none">None</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="currentlyReading">
                            Currently Reading
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  Books: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};
