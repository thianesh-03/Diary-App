const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Define your diary entries
const diaryEntries = [
  { id: 1, date: "March 1st", entry: "Entry 1" },
  { id: 2, date: "March 2nd", entry: "Entry 2" },
  { id: 3, date: "March 3rd", entry: "Entry 3" },
];

// Apply CORS middleware
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

app.get('/max-id',(req,res)=>{
  var max =0;
  for(var i=0;i<diaryEntries.length;i++){
    if(diaryEntries[i].id>max){
      max=diaryEntries[i].id
    }
  }
  res.json({
    maxId : max
  });
})

app.delete('/remove-entry/:id', (req,res)=>{
  const index = diaryEntries.findIndex(entry =>{
    return entry.id == req.params.id;
  })
  diaryEntries.splice(index,1);
  res.status(200).json({
    message: 'Post Deleted'
  })
})

app.put('/update-entry/:id', (req,res)=>{
  const index = diaryEntries.findIndex(entry =>{
    return entry.id == req.params.id;
  })
  diaryEntries[index]={id:req.body.id,date:req.body.date,entry:req.body.entry};
  res.status(200).json({
    message: 'Updated'
  })
})

// Endpoint to add a diary entry
app.post('/add-entry',(req,res)=>{
  // Extract data from the request body
  const { id, date, entry } = req.body;
  
  // Add the new entry to the diaryEntries array
  diaryEntries.push({ id, date, entry });
  
  // Send a JSON response indicating success
  res.json({
    message: 'Post submitted'
  });
});

// Set up CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Endpoint to get diary entries
app.get("/diary-entries", (req, res, next) => {
  res.json({ diaryEntries: diaryEntries });
});

module.exports = app;
