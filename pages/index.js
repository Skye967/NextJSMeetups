import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from 'next/head'
import { Fragment } from "react";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some address 5, 12345 Some City",
//     description: "This is a first meetup!",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Neues_Rathaus_Muenchen_1900.jpg/1920px-Neues_Rathaus_Muenchen_1900.jpg",
//     address: "Some address 6, 123456 Some City2",
//     description: "This is a second meetup!",
//   },
// ];

function HomePage(props) {
    return (
      <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta
                    name="description"
                    content="Browse a huge list of highly active React meetups!"
                />
        </Head>
        <MeetupList meetups={props.meetups} />
      </Fragment>
    );
}

// export async function getServerSideProps(context) {
//     //fetch data from an API
//     //No need to set revalidate because it will revalidate after each request anyway
//     //only good when your data is constantly being updated
//     const req = context.req;
//     const res = context.res;
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         },
//     }
// }

export async function getStaticProps() {
  //fetch data from database
  const client = await MongoClient.connect(
    "mongodb+srv://user:575Password!@cluster0.0x70j2l.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find().toArray();

  client.close();

  //revalidate will rerun getStaticProps(), for renewing information on page
  //pregenerates the data and page and caches it only once, making it better for light work
    return {
      // map through meetups data to restructure the data
    props: {
          meetups: meetups.map(meetup => ({
              title: meetup.data.title,
              address: meetup.data.address,
              image: meetup.data.image,
              description: meetup.data.description,
              id: meetup._id.toString(),
      }))
    },
    revalidate: 3600,
  };
}

export default HomePage;
