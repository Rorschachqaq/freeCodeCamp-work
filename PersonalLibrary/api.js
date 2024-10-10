/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;
require('dotenv').config();


const URI = process.env.MONGO_URI;

const db = mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });


const bookSchema = new Schema({
  title: { type: String, required: true },
  comments: [String], 
});

const Book = mongoose.model('Book', bookSchema);



module.exports = function (app) {

  app.route('/api/books')
  .get(async (req, res)=>{
    
      const books = await Book.find();
      if(!books) return res.json([]);
      
      const booksObj = books.map(book => ({
        _id: book._id,
        title: book.title,
        commentcount: book.comments ? book.comments.length : 0  
      }));

       res.json(booksObj);

     
  })
    
    .post(async (req, res) => {
       
      let title = req.body.title ;
      
       if (!title) {
        return res.send('missing required field title');
      }
      
       const newBook = new Book({ title: title, comments: [] });
      
       await newBook.save();
      
       res.json({
        _id: newBook._id,
        title: newBook.title
      });     
    
  })
  
    
    .delete(async(req, res)=>{
       const result = await Book.deleteMany({});
       res.send('complete delete successful');
    });



    app.route('/api/books/:id')
      .get(async (req, res) => {
       
        let bookid = req.params.id;
        
        if (!mongoose.Types.ObjectId.isValid(bookid)) {
          return res.send("no book exists");
        } 
         
        const book = await Book.findById(bookid);
        
        if (!book) {
          return res.send("no book exists");
        }
  
        res.json({
          _id: book._id,
          title: book.title,
          comments: book.comments || []
        });
    
        
    })
  
    
    .post(async(req, res)=>{
      let bookid = req.params.id;
      let comment = req.body.comment;

      if (!mongoose.Types.ObjectId.isValid(bookid)) {
        return res.send("no book exists");
      }
      if(!comment) return res.send("missing required field comment");
      
      
      const book = await Book.findById(bookid);

      if (!book) return res.send("no book exists");

      book.comments.push(comment);
      await book.save();

        res.json({
        _id: book._id,
        title: book.title,
        comments: book.comments || []
      });
       
    })
    
    .delete(async(req, res)=>{
      let bookid = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(bookid)) {
        return res.send("no book exists");
      }
      //if successful response will be 'delete successful'
      const book = await Book.findOneAndDelete({ _id: bookid });
      if (!book) return res.send("no book exists");
      res.send('delete successful');
   
    });
  
};