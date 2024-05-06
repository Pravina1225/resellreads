const express = require('express');
const mongoose = require('mongoose');
const Payment = require('../model/payment.model');


const createpayment = async (req,res)=>{  
  try{
    const{paymentMethod,cardName,cardNumber,expiryDate,cVV,totalPrice}=req.body;
    
     const payment = new Payment({
       paymentMethod:req.body.paymentMethod,
       cardName:req.body.cardName,
       cardNumber:req.body.cardNumber,
       expiryDate:req.body.expiryDate,
       cVV:req.body.cVV,
       totalPrice:req.body.totalPrice
     });
     const savedPayment = await payment.save(); 
res.status(201).json(savedPayment);
    }
  
  catch(error){
    console.log(error.message);
    res.status(500).send({messge: error.message})
  }
};




   
    

  const deletepayment= async(req,res)=>{
 const paymentId = req.params.id;
 try{
  const deletePayment=await Payment.findByIdAndDelete(paymentId);
  if(!deletePayment){
    return res.status(404).json({error:'payment information not found'});
  }
  res.status(200).json({message:'payment information deleted successfully'});
 } catch(error){
  console.error(error);
  res.status(500).json({error:'Internal Server Error'});
 }
  };
     
module.exports={
    createpayment,
    deletepayment

};