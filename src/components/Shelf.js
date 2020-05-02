import React, { Component } from "react";
import PropTypes from "prop-types";

class Shelf extends Component {
  update = (book, shelf) => {
    this.props.onUpdate(book, shelf);
  };
  render() {
    const { Books, name } = this.props;
    return (
      <div>
        <h2 className="bookshelf-title">{name}</h2>
        <hr
          style={{
            borderBottom: "1px dotted #dedede",
            width: "50%",
            marginBottom: "15px",
          }}
        />
        <div className="bookshelf-books">
          <ol className="books-grid">
            {Books.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    {book.imageLinks ? (
                      <div
                        className="book-cover"
                        style={{
                          width: 140,
                          height: 198,
                          backgroundImage: `url("${book.imageLinks.smallThumbnail}")`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "auto",
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

Shelf.propTypes = {
  Books: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Shelf;
