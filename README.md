# MyReads Project Description

This is my completed project for the final assessment.

A React bookshelf application that allows users to organize books into different shelves and search for new books using the Books API.

## Features
The user can:
- Organize books into the selected shelves (Currently Reading, Want to Read, Read)
- Search for any books by title, author, or ISBN on search result page
- Move the selected books between shelves in real time
- Remove the selected book if the user chooses "None" option on main page
- Select any option (Currently Reading, Want to Read, Read) of any book on search result page, a message notification will appear informing the user about it
- Remove books using the "None" option and it can update on both main and search pages
- Click the book image to redirect to book detail page for more information

## Installation Steps

1. Clone the repository
2. cd starter
3. Run `npm install` to install all project dependencies
4. Run `npm start` to run the server

Note: Please do not use `npm audit fix --force` because it can break dependencies changes e.g. "react-scripts": "^0.0.0" instead of "react-scripts": "^5.0.1"

## Project Structure

```bash
├──starter
    ├── CONTRIBUTING.md
    ├── README.md - This file.
    ├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
    ├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
    ├── public
    │   ├── favicon.ico # React Icon, You may change if you wish.
    │   └── index.html # DO NOT MODIFY
    └── src
        ├── components
            ├── Book
                ├── Book.css
                └── Book.js
            ├── BookDetail
                ├── BookDetail.css
                └── BookDetail.js
            ├── BookShelf
                ├── BookShelf.css
                └── BookShelf.js
            ├── BookShelfChanger
                ├── BookShelfChanger.css
                └── BookShelfChanger.js
            ├── Header
                ├── Header.css
                └── Header.js
            ├── SearchBook
                ├── searchBook.css
                └── searchBook.js
        ├── App.css # Styles for your app. Feel free to customize this as you desire.
        ├── App.js # This is the root of your app. Contains static HTML right now.
        ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
        ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
        ├── icons # Helpful images for your app. Use at your discretion.
        │   ├── add.svg
        │   ├── arrow-back.svg
        │   └── arrow-drop-down.svg
        ├── index.css # Global styles. You probably won't need to change anything here.
        └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

- [`getAll`](#getall)
- [`update`](#update)
- [`search`](#search)

### `getAll`

Method Signature:

```js
getAll();
```

- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf);
```

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query);
```

- query: `<String>`
- Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
- These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebook/create-react-app/blob/main/packages/cra-template/template/README.md).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
