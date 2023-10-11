import React, { Fragment } from 'react'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import { useRouter } from 'next/router';
import Head from 'next/head'

function NewMeetupPage() {
  const router = useRouter();
  //set api call and configure (route, method, body/data in json, headers set content type. )
  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    
    const data = await response.json();
    console.log(data)

    //After you enter and submit your new meetup, navagate away
    router.push('/')
  }


  return (
    <Fragment>
      <Head>
        <title>Add a new Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking oppurtunities!"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage
