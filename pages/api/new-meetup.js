// /api/new-meetup
// 
import {MongoClient} from 'mongodb'
import React from 'react'

// its conventional to name the funcition hanler

async function handler(req, res) {
  // specify this is only for POST requests
    if (req.method === 'POST') {
        const data = req.body;

        // object destructuring for meetup up data if you need to destructure
        //const { title, image, address, description } = data
        
      // Store data inside of database
      const client = await MongoClient.connect(
        "mongodb+srv://user:575Password!@cluster0.0x70j2l.mongodb.net/meetups?retryWrites=true&w=majority"
      );

      const db = client.db();

      const meetupsCollection = db.collection('meetups');

      const result = await meetupsCollection.insertOne({ data });
      
      console.log(result);

      //Make sure you close the database
      client.close();

      // send back a response
      res.status(201).json({message: 'Meetup inserted!'})
  }
}

export default handler
