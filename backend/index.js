const express=require('express')
const app=express()
const port=8080
const mongoose = require('mongoose');
const cors = require('cors');
const classescollection=require('./controller/classes')

app.use(cors())
app.use(express.json())
// classes route here below
app.post('/new-class',classescollection.postclasses);
app.get('/classes',classescollection.getclasses)
// get classes by instructor email address
app.get('/classes/:email',classescollection.getclassesemail)
// manage classes
app.get('/classes-manage',classescollection.getclasses_manage)

// update classes status and reason
app.patch('/change-status/:id',classescollection.patchclasses)


// Connect to MongoDB
main()
.then(res => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/yoga-master');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
app.listen(port, () => {
  console.log('Server is started on port', port);
});
