const express = require("express");

const app = express();

diaryEntries = [
    {id:1, date:"March 1st", entry:"Entry 1"},
    {id:2, date:"March 2nd", entry:"Entry 2"},
    {id:3, date:"March 3rd", entry:"Entry 3"}
  ];

app.use('/diary-entries',(req,res,next)=>{
    res.json({'diaryEntries': diaryEntries});
})

module.exports=app;