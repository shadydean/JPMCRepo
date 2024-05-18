const express = require('express');
const mongoose = require('mongoose');
const studentModel= require('../models/student.model')


async function getValueById(req,res){
    const {id} = req.params
    const student = await studentModel.findById(id)
    if(!student) return res.status(404).send("Student not found")
    res.status(200).json(student)
}

async function getValue (req,res){
    const students = await studentModel.find({})
    res.status(200).json(students)
}

async function modifyById(req,res){
    const {ids,name,phone,email} = req.body
    const {id} = req.params
    const student = await studentModel.findByIdAndUpdate(id,{
        name:name,phone:phone,email:email
    })
    if(!student) return res.status(404).send("Student not found")
    res.status(200).json(student)
}

async function postValue(req,res){
    const student = await studentModel.create({
        _id: req.body._id,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    })
    res.status(200).json(student)
}

async function deleteValueById (req,res){
    const {id} = req.params
    const student = await studentModel.findByIdAndDelete(id)
    if(!student) return res.status(404).send("Student not found")
    res.status(200).json(student)
}

module.exports = {getValueById, getValue, modifyById, postValue, deleteValueById}
