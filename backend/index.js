const express = require('express');
const cors=require('cors');
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://dwivedishreya0822:WQ9wvD45yhizWRa6@cluster0.e0nlag1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    
  }
});

async function run() {
  try {
  
    await client.connect();
   
    const postCollection=client.db('database').collection('posts')
    const userCollection=client.db('database').collection('users')
    const userSchema =client.db('database').collection('followers')
    
  app.post('/follow', async (req, res) => {
    const followerEmail = req.body.followerEmail;
    const followedEmail = req.body.followedEmail;

    // Update the follower's document to include the followed user
    await userCollection.updateOne(
        { email: followerEmail },
        { $addToSet: { following: followedEmail } }
    );

    // Update the followed user's document to include the follower
    await userCollection.updateOne(
        { email: followedEmail },
        { $addToSet: { followers: followerEmail } }
    );

    res.send("Follow successful");
});
app.post('/unfollow', async (req, res) => {
  const followerEmail = req.body.followerEmail;
  const followedEmail = req.body.followedEmail;

  // Remove the followed user from the follower's following list
  await userCollection.updateOne(
      { email: followerEmail },
      { $pull: { following: followedEmail } }
  );

  // Remove the follower from the followed user's followers list
  await userCollection.updateOne(
      { email: followedEmail },
      { $pull: { followers: followerEmail } }
  );

  res.send("Unfollow successful");
});

app.get('/followers/:email', async (req, res) => {
  const userEmail = req.params.email;

  // Find the user document by email and return the followers list
  const user = await userCollection.findOne({ email: userEmail });
  if (user) {
      res.send(user.followers);
  } else {
      res.status(404).send("User not found");
  }
});


    app.get('/user', async (req, res) => {
        const user = await userCollection.find().toArray();
        res.send(user);
    })
    app.get('/loggedInUser', async (req, res) => {
        const email = req.query.email;
        const user = await userCollection.find({ email: email }).toArray();
        res.send(user);
    })
    app.get('/post', async (req, res) => {
        const post = (await postCollection.find().toArray()).reverse();
        res.send(post);
    })
    app.post('/post',async(req,res)=>{
        const post=req.body;
        const result=await postCollection.insertOne(post);
        res.send(result);

    })
    app.get('/userPost', async (req, res) => {
      const email = req.query.email;
      const post = (await postCollection.find({ email: email }).toArray()).reverse();
      res.send(post);
  })
    app.post('/register',async(req,res)=>{
        const user=req.body;
        const result=await userCollection.insertOne(user);
        res.send(result);

    })
    app.get('/usersToFollow/:email', async (req, res) => {
      const currentUserEmail = req.params.email;
  
      // Fetch all users except the current user
      const usersToFollow = await userCollection.find({ email: { $ne: currentUserEmail } }).toArray();
      
      res.send(usersToFollow);
  });
    app.get('/users', async (req, res) => {
      // Retrieve details of all users
      const users = await userCollection.find().toArray();
      res.send(users);
  });
    //patch
    app.patch('/userUpdates/:email',async(req,res)=>{
        const filter=req.params;
        const profile=req.body;
        const options={upset:true};
        const updateDoc={$set:profile};
        const result=await userCollection.updateOne(filter,updateDoc,options)
        res.send(result);
    })
  } catch(error) {
    // Ensures that the client will close when you finish/error
    console.log(error);
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World! shreya deivedi')
})

app.listen(port, () => {
  console.log(`Twitter app listening on port ${port}`)
})