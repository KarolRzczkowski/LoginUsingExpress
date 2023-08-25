import express, { Response, Request } from 'express';
import { MongoClient, Db, ObjectId } from 'mongodb';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let db: Db;

client.connect()
  .then(() => {
    db = client.db('mydatabase');
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to MongoDB', err);
  });

// Endpoint do pobierania danych z kolekcji "books"
app.get('/books', async (req: Request, res: Response) => {
  try {
    const booksCollection = db.collection('books');
    const booksData = await booksCollection.find().toArray();
    res.json({ books: booksData });
  } catch (error) {
    res.status(500).send('Error fetching data');
    console.error('Error fetching data', error);
  }
});

app.post('/books' , (req , res) =>{
  try {
    res.status(200).send('Lecture added successfully');
  } catch (error) {
   res.status(500).send('There is a problem inside the server code') 
   console.log('Server problem')
  }
})


// Endpoint do pobierania danych z kolekcji "lectures"
app.get('/lectures', async (req: Request, res: Response) => {
  try {
    const collection = db.collection('lectures');
    const lecturesData = await collection.find().toArray();
    res.json(lecturesData);
  } catch (error) {
    res.status(500).send('Error fetching lectures data');
    console.error('Error fetching lectures data', error);
  }
});

app.post('/lectures' , (req , res) =>{
  try {
    res.status(200).send('Lecture added successfully');
  } catch (error) {
   res.status(500).send('There is a problem inside the server code') 
   console.log('Server problem')
  }
})

// Endpoint do pobierania danych z kolekcji "shoes"
app.get('/shoes', async (req: Request, res: Response) => {
  try {
    const collection = db.collection('shoes');
    const shoesData = await collection.find().toArray();
    res.json(shoesData);
  } catch (error) {
    res.status(500).send('Error fetching shoes data');
    console.error('Error fetching shoes data', error);
  }
});

app.post('/shoes' , (req , res) =>{
  try {
    res.status(200).send('Lecture added successfully');
  } catch (error) {
   res.status(500).send('There is a problem inside the server code') 
   console.log('Server problem')
  }
})


// Endpoint do usuwania danych z kolekcji "shoes" na podstawie ID
app.delete('/shoes/:id', async (req: Request, res: Response) => {
  try {
    const collection = db.collection('shoes');
    const { id } = req.params;
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      res.status(200).send('Shoe deleted successfully');
    } else {
      res.status(404).send('Shoe not found');
    }
  } catch (error) {
    res.status(500).send('Error deleting shoe');
    console.log('Error deleting shoe', error);
  }
});

//adding user to data base


app.post('/emails' , async(req:Request , res:Response) =>{
  try {
    const {email} = req.body;
    const emailscollection = db.collection('emails')
    await  emailscollection.insertOne({email});
    res.status(200).send("User added sukcessfully to your data base")
  } catch (error) {
    res.status(500).send('Error adding user')
    console.log("Error adding user" , error)
  }
})
  
//adding endpoint to users
app.post('/emails'  , (req , res)  =>{
  try {
    res.status(200).send("Everything is Looking great")
  } catch (error) {
    res.status(500).send("You must to change something inside server code")
    console.log("Server code has got an isuee")
  }
})

//adding password to database


app.post('/passwords' , async(req:Request  , res:Response) =>{
  try {
    const {password} = req.body;
    const passwordcollection = db.collection('passwords');
    await passwordcollection.insertOne({password})
    res.status(200).send("User added sukcessfully to your data base")
  } catch (error) {
    res.status(500).send("Something it's wrong inside server code ")
    console.log('Check server code')
  }
})

app.post('/passwords'  , (req , res)  =>{
  try {
    res.status(200).send("Everything is Looking great")
  } catch (error) {
    res.status(500).send("You must to change something inside server code")
    console.log("Server code has got an isuee")
  }
})




// Obsługa sygnału SIGINT do zamknięcia połączenia z MongoDB przed wyłączeniem serwera
process.on('SIGINT', () => {
  client.close().then(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

app.listen(port, () => {
  console.log(`Server is already running on port ${port}`);
});
