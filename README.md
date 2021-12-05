# Members Only Project

This is the repo for the Members Only project in the NodeJS course of The Odin Project.  The purpose is to create a message board where members who are logged in are the only ones who can see the author of the messages.  Otherwise, the authors are not revealed.

## What I Learned

### Mongoose Adds An 'S'

I encountered some frustration trying to test the user login when I manually inserted a user into the data.  I created a document in the "user" collection and my login wasn't working.  I outputted everything in the local strategy I was using for PassportJS, and the query from the database kept on returning `null`.  I went the extra length to code the ability to create a user on a clean database, and I found that the collection name was not "user" but "users."  According to the post [Why does mongoose always add an s to the end of my collection name](https://stackoverflow.com/questions/10547118/why-does-mongoose-always-add-an-s-to-the-end-of-my-collection-name), Mongoose adds an 's' to the collection name.  Turns out my login stuff was working in the first place.

### Local Strategy Only Accepts `username`

I was trying to authenticate with Passport using `email` as the login.  I changed all the forms, models, and strategy variables from `username` to `email`.  All of a sudden my login authentication failed.  There was nothing fundamentally wrong with how the logins were being processed before.  All I could narrow down was that the authentication process wasn't being executed.  After a while, I figured out that the form needs to have the `username` argument from the form and not anything else.  I guess as long as the login arguments can be kept straight I'll just have to stick to that.