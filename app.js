import express from 'express';
import mongoose from 'mongoose';
import blogRouter from './routes/blog-routes';
import router from './routes/user-routes';

const app = express();
app.use(express.json());

app.use('/api/user', router)
app.use('/api/blog', blogRouter);

mongoose.connect('mongodb+srv://admin:buftij-wihMad-rarny0@cluster0.lni5zbf.mongodb.net/blog?retryWrites=true&w=majority')
.then(()=>console.log("db connected"))
.catch(()=>console.log("db disconnected"));


app.listen(3000)

