const express = require('express');
const mongoose = require('mongoose');
const Message = require('../model/message.model');

const getAllMessage = async(req,res)=>{
    try{
        const message=await Message.find();
        res.json(message);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};

const getMessageById = async(req,res)=>{
    const{id}=req.params;
    try{
        const message = await Message.findById(id);
        res.json(message);
    }
    catch(error){
        res.status(404).json({message:'book not found'});
    }
};




const createmessage = async (req,res)=>{  
  try{
    const{name,email,message}=req.body;
    
     const messaged = new Message({
       name:req.body.name,
       email:req.body.email,
      message:req.body.message
     });
     const savedMessage = await messaged.save();
// 
res.status(201).json(savedMessage);
    }
  
  catch(error){
    console.log(error.message);
    res.status(500).send({messge: error.message})
  }
};


const updatemessage = async(req,res) =>{
  const messageId = req.params.id;
  const updateFields = req.body;

  try{
    const existingMessage = await Message.findById(messageId);
    if(!existingMessage){
     return res.status(404).json({error:"message not found"});
    }
    Object.assign(existingMessage,updateFields);
    const updatedMessage = await existingMessage.save();
    res.status(200).json(updatedMessage);
  }

  catch(error){
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
};


   
    

  const deletemessage= async(req,res)=>{
 const messageId = req.params.id;
 try{
  const deleteMessage=await Message.findByIdAndDelete(messageId);
  if(!deleteMessage){
    return res.status(404).json({error:'message not found'});
  }
  res.status(200).json({message:'message deleted successfully'});
 } catch(error){
  console.error(error);
  res.status(500).json({error:'Internal Server Error'});
 }
  };
     
module.exports={
    getAllMessage,
    getMessageById,
    createmessage,
    updatemessage,
    deletemessage

};