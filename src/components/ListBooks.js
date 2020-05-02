import React, { Component } from "react";
import { Link } from "react-router-dom";
import Shelf from "./Shelf";
import PropTypes from "prop-types";

class ListBooks extends Component {
  render() {
    const { Books } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content"></div>
        <div className="bookshelf">
          <Shelf
            Books={Books.filter((Book) => Book.shelf === "currentlyReading")}
            name="Currently Reading   "
            onUpdate={this.props.onChange}
          />
          <Shelf
            Books={Books.filter((Book) => Book.shelf === "wantToRead")}
            name="Want To Read"
            onUpdate={this.props.onChange}
          />
          <Shelf
            Books={Books.filter((Book) => Book.shelf === "read")}
            name="Read"
            onUpdate={this.props.onChange}
          />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
        <div className="footer">&copy; Udacity Project #1 </div>
      </div>
    );
  }
}

ListBooks.propTypes = {
  //Books: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ListBooks;
