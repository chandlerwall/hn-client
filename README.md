# hn-client (API)

This will create a server that exposes an API for Hacker News.  The end goal is to wrap the existing API into a format that is less network intensive for an iOS app.  The main goal will be to make a single call to this server and have fresh stories and comments.

The project processes the `topstories` from HN and will push the full child tree into a database (using NeDB).  An API will serve this new object with the comments.