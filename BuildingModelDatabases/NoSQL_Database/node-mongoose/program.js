const connect = require("./db");


const runDatabaseQueries = async () => {
  
  const db = await connect();
  //const users = db.collection('users');
  const movies = db.collection('movies');

  // Run this query, should get top 5 best rated movies on IMDB
  // const topMovies = await movies.find({ "imdb.rating": { $gt: 8.0 } })
  //   .project({ title: 1, year: 1, "imdb.rating": 1 })
  //   .sort({ "imdb.rating": -1 })
  //   .limit(5)
  //   .toArray();

  // console.log('Top Rated Movies:', topMovies);

  //More queries can be added here
  //-------------------------------------------------
  // Example: Find all movies directed by "George Lucas"
  // const lucasMovies = await movies.find({ "directors": "George Lucas" })
  //   // Specify the fields to include in the result
  //   .project({ title: 1, year: 1, directors: 1 })
  //   // Sort by year in ascending order
  //   .sort({ year: 1 })
  //   // Convert the cursor to an array
  //   .toArray();
  // Print the results to the console
  //console.log('Movies Directed by George Lucas:', lucasMovies);
  //-----------------------CREATE--------------------------
  const newUser = {
    name: "Tony Stark",
    email: "tony.stark@example.com",
  };
  const createResult = await users.insertOne(newUser);
  console.log('Created New User:', createResult.insertedId);
  //-----------------------READ------------------------------
//   const readMovie = await movies.find({ directors: "Christopher Nolan", genres: "Action", "imdb.rating": { $gt: 8.0 } })
//     // Specify the fields to include in the result
//      .project({ title: 1, year: 1, directors: 1 , "imdb.rating": 1 })
//   //  // Sort by year in ascending order
//       .sort({ year: 1 })
//   //   // Convert the cursor to an array
//      .toArray();
//   // Print the results to the console
//   console.log('Movies Directed by Christopher Nolan:', readMovie);
//   console.log("----------------------------------------------");
//    const TomeMovies = await movies.find({ $and: [{ cast: "Tom Hanks" }, { cast: "Tim Allen" }] })
//    .project({ title: 1, year: 1, directors: 1, cast: 1})
//    //   // Convert the cursor to an array
//       console.log('Movies with Tom Hanks and Tim Allen:', await TomeMovies.toArray());
//    //Find movies that starred both and only "Tom Hanks" and "Tim Allen".
//   console.log("----------------------------------------------");
//  const OnlyTomAndTimMovies = await movies.find({$and: [
// { cast: { $all: ["Tom Hanks","Tim Allen"] } },
// { cast: { $size: 2 } }
// ]
// }).project({ title:1, cast:1,directors:1, year:1})
// console.log('Movies with only Tom Hanks and Tim Allen:', await OnlyTomAndTimMovies.toArray());
// console.log("----------------------------------------------");
// const SpielburgMovies = await movies.find({ directors: "Steven Spielberg", genres: "Comedy" })
// .project({ title:1, directors:1, genres:1, year:1})
// console.log('Comedy Movies Directed by Steven Spielberg:', await SpielburgMovies.toArray());
  //-------------------------------------------------------
  
  // //-----------------------UPDATE--------------------------
  // Add a new field "available_on" with the value "Sflix" to "The Matrix".
  // try {
  //   const updateResult = await movies.updateOne(
  //     { title: "The Matrix" },
  //     { $set: { available_on: "Sflix" } }
  //   );
  //   if (updateResult.matchedCount === 0) {
  //     console.log('No document found with title "The Matrix". No update performed.');
  //   } else {
  //     console.log('Updated "The Matrix" — matched:', updateResult.matchedCount, 'modified:', updateResult.modifiedCount);
  //   }
  // } catch (err) {
  //   console.error('Update failed:', err);
  // }

  // Increment the metacritic of "The Matrix" by 1.
//console.log("----------------------------------------------");
  // const updated = await movies.findOneAndUpdate(
  //   { title: "The Matrix" },
  //   { $inc: { metacritic: 1 } },
  //   { returnDocument: 'after', projection: { title: 1, metacritic: 1 } }
  // );
//Add a new genre "Gen Z" to all movies released in the year 1997.
  // const addGenreResult = await movies.updateMany(
  //   { year: 1997 },
  //   { $addToSet: { genres: "Gen Z" } }
  // );
  // console.log('Updated document:', addGenreResult.value);
  // console.log('Added "Gen Z" genre to movies from 1997 — matched:', addGenreResult.matchedCount, 'modified:', addGenreResult.modifiedCount);
  // console.log("----------------------------------------------");
  // Increase IMDb rating by 1 for all movies with a rating less than 5.
  // const increaseRatingResult = await movies.updateMany(
  //   { "imdb.rating": { $lt: 5 } },
  //   { $inc: { "imdb.rating": 1 } }
  // );
  // console.log('Increased IMDb rating by 1 for movies with rating < 5 — matched:', increaseRatingResult.matchedCount, 'modified:', increaseRatingResult.modifiedCount);
  //-----------------------DELETE--------------------------
  //Delete a comment with a specific ID.
  // const comments = db.collection('comments');
  // const deleteComment = await comments.deleteOne({ _id: ObjectId("5a9427648b0beebeb69579e7") });
  // console.log('Deleted comment — deleted count:', deleteComment.deletedCount); 
  //Delete all comments made for "The Matrix
  //Delete all movies that do not have any genres
  // //-----------------------AGGREGATE-----------------------
  // const aggregateResult = await users.aggregate([
  //   { $group: { _id: "$age", averageAge: { $avg: "$age" } } },
  //   { $sort: { averageAge: -1 } }
  // ]).toArray();
  // console.log('Aggregate Result:', aggregateResult);

  //Aggregate movies to count how many were released each year and display from the earliest year to the latest.
  //Calculate the average IMDb rating for movies grouped by director and display from highest to lowest.
  //-------------------------------------------------------
  // Close the database connection when done
  await db.client.close();

  process.exit(0);
};


runDatabaseQueries();


// Instructions to run the program:
//yarn install

// Add your MongoDB connection string to a .env file in the root directory
// MONGO_URI=mongodb+srv://montrell_db_user:<db_password>@test-cluster.fsihkke.mongodb.net/?appName=test-cluster
// Make sure to replace <db_password> with the actual password for the montrell_db_user user.
// Then run the program using: node program.js
// You should see the top 5 best rated movies printed to the console.
// If you encounter any issues, ensure that your IP address is whitelisted in your MongoDB Atlas cluster settings.
// Also, ensure that you have the necessary permissions to read from the 'movies' collection.
// If everything is set up correctly, you should see output similar to:
// Top Rated Movies: [
//   { title: 'The Shawshank Redemption', year: 1994, imdb: { rating: 9.3 } },
//   { title: 'The Godfather', year: 1972, imdb: { rating: 9.2 } },
//   { title: 'The Dark Knight', year: 2008, imdb: { rating: 9.0 } },
//   { title: '12 Angry Men', year: 1957, imdb: { rating: 8.9 } },
//   { title: "Schindler's List", year: 1993, imdb: { rating: 8.9 } }
// ]
// If you see an empty array or an error, double-check your database connection and query logic.
