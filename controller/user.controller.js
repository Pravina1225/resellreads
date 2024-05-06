const express = require('express');
const mongoose = require('mongoose');
const User = require('../model/user.model');


const createprofile = async (req,res)=>{  
  try{
    const{name,phone,email,gender,address,pinCode}=req.body;
    
     const profile = new User({
       name:req.body.name,
       phone:req.body.phone,
       email:req.body.email,
       gender:req.body.gender,
       address:req.body.address,
       pinCode:req.body.pinCode
     });
     const savedProfile = await profile.save();


res.status(201).json('Profile saved successfully');
    }
  
  catch(error){
    console.log(error.message);
    res.status(500).send({messge: error.message})
  }
};


const updateprofile = async(req,res) =>{
  const userId = req.params.id;
  const updateFields = req.body;

  try{
    const existingUser = await User.findById(userId);
    if(!existingUser){
     return res.status(404).json({error:"user not found"});
    }
    Object.assign(existingUser,updateFields);
    const updatedUser = await existingUser.save();
    res.status(200).json(updatedUser);
  }

  catch(error){
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
};


   
    

  const deleteprofile= async(req,res)=>{
 const userId = req.params.id;
 try{
  const deleteUser=await User.findByIdAndDelete(userId);
  if(!deleteUser){
    return res.status(404).json({error:'user not found'});
  }
  res.status(200).json({message:'user deleted successfully'});
 } catch(error){
  console.error(error);
  res.status(500).json({error:'Internal Server Error'});
 }
  };
     
module.exports={
    createprofile,
    updateprofile,
    deleteprofile

};