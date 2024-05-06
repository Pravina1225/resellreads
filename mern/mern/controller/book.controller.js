const express = require('express');
const mongoose = require('mongoose');
const Book = require('../model/book.model');

const getAllBooks = async(req,res)=>{
    try{
        const books=await Book.find({});
        res.render('shop', { books });
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};


const getBookById = async(req,res)=>{
    const{id}=req.params;
    try{
        const book = await Book.findById(id);
        res.json(book);
    }
    catch(error){
        res.status(404).json({message:'book not found'});
    }
};


const path = require('path');
const fs = require('fs');
const uploadBook = async(req,res)=>{
    try{
        const {bookId,bookName,author,edition,bookType,bookCondition,yourPrice,shippingCharges,publisher,description,name,email,phone,address,rentoption}=req.body;
        const imagePath = req.file.path;
        const newBook = new Book({
            bookId:req.body.bookId,
            bookName:req.body.bookName,
            author:req.body.author,
            editon:req.body.edition,
            bookType:req.body.bookType,
            bookConditon:req.body.bookCondition,
            rentoption:req.body.rentoption,
            yourPrice:req.body.yourPrice,
            shippingCharges:req.body.shippingCharges,
            bookimage: {data: fs.readFileSync(path.join(__dirname + '../../uploads/' + req.file.filename)),
            contentType: 'image/png'// Set the image path here if you're handling file uploads 
        },
            publisher:req.body.publisher,
            description:req.body.description,
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            address:req.body.address,
           


        });
        await newBook.save();
        res.status(201).json({
            message:"book uploaded successfully"
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            error:'Internal server error'
        });
    }
    };


const updateBook= async (req, res) => {
    try {
        const{id}=req.params;
        const {bookId,bookName,edition,bookType,bookCondtion,yourPrice,shippingCharges,publisher,description}=req.body;
        let image = '';
        if(req.file){
            image=req.file.path;
        }
        else{
            const existingBook = await Book.findById(id);
           image=existingBook.image;
        }
        const updatedBook = await Book.findByIdAndUpdate(
       id,{bookId,bookName,edition,bookType,bookCondtion,yourPrice,shippingCharges,publisher,description,image},
        { new: true }
      );
      res.json(updatedBook);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


const deleteBook = async(req,res)=>{
    const{id}=req.params;
    try{
        await Book.findByIdAndDelete(id);
        res.json({message:'book deleted successfully'});
    } catch(error){
        res.status(404).json({message:'Book not found'});
    }
};
module.exports = {
    getAllBooks,getBookById,updateBook,uploadBook,deleteBook,
}

