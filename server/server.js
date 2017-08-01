import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import falcor from 'falcor';
import falcorExpress from 'falcor-express';

//Connect to DB
mongoose.connect('mongodb://localhost/minh_app', { useMongoClient: true });
mongoose.connection.on('open', () => {
    console.log("Database connected");
})

const app = express();
app.server = http.createServer(app);

//Middlewares
app.use(cors());
app.use(bodyParser.json({ extended: false }));

//Cache
let cache = {
  articles: [
    {
      id: 987654,
      articleTitle: 'Lorem ipsum - article one',
      articleContent: 'Here goes the content of the article'
    },
    {
      id: 123456,
      articleTitle: 'Lorem ipsum - article two from backend',
      articleContent: 'Sky is the limit, the content goes here.'
    }
  ]
};

var model = new falcor.Model({
  cache: cache
});

app.use('/model.json', falcorExpress.dataSourceRoute((req, res) => {
    return model.asDataSource();
}));

app.use(express.static('dist'));

app.get('/', (req, res) => res.render('index'));

app.server.listen(process.env.PORT || 3000);

export default app;