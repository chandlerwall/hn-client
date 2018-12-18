# hn-client (API)

This will create a server that exposes an API for Hacker News.  The end goal is to wrap the existing API into a format that is less network intensive for an iOS app.  The main goal will be to make a single call to this server and have fresh stories and comments.

The project processes the `topstories` from HN and will push the full child tree into a database (using NeDB).  An API will serve this new object with the comments.

It also serves the best stories for the day, week, and month by querying the Algolia HN API.  That API works nicely for obtaining a list of the best stories by ID.  I then hit the Firebase HN API to load the details.

## endpoints

TODO: document these

## deploy

I deploy to Heroku and it works well:

```bash
heroku create
git push heroku master
```

It is possible to hit the 30 second timeout while the loader is grabbing stories.  The process keeps running on Heroku, so you need to refresh in a bit to get the results.
