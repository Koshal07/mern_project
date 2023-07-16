const mongoose=require('mongoose');

const DB=process.env.DATABASE;

mongoose.set('strictQuery', true);
mongoose.connect(DB, {
    useNewUrlParser: true, 
    
    useUnifiedTopology: true,
    
})
.then(() => console.log('MongoDB Connected...'))
.catch((err) => console.log("error in connecting",err));