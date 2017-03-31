# TODO API - Node.js, Express.js, PostgreSQL, Knex.js
This implementation of the [todobackend](http://www.todobackend.com) API uses Node, Express, Knex and the PostgreSQL database. 	

Our live example of this code is on [http://inexperiencedfearfuleagle.heroku.com](http://inexperiencedfearfuleagle.heroku.com)


## INSTALLATION
1. Download / clone this repository into the directory of your choice.

2. Run  `npm install`  to install the dependencies needed to run this api.

3. Create a PostgreSQL database for this API to connect to. 
Suggestions: [elephantsql.com](http://www.elephantsql.com) or run a database locally.

4.  Create the table with this SQL query through the postgreSQL shell.  
`CREATE TABLE todos ( id serial PRIMARY KEY, completed boolean DEFAULT false, "order" integer, title text NOT NULL);`

5. Go to terminal.app (mac) / command prompt (windows) and cd into this repository's directory. Run the following command to create a .env file to store. ``touch .env``

6. Modify the ".env"  file and paste in  `DATABASE_URL=yourdatabaseurlhere`
where - `yourdatabaseurlhere` could be something like `localhost:5432` or a long url like the following for elephantsql.com:
`postgres://abcdefgh:asdfjkwfjnviwndjkvjalewrjfdsak@stampy.db.elephantsql.com:5432/abcdefgh`

## STARTING THE API
Run `npm run dev` to run the API in "dev mode". It will start the server with nodemon which will restart the server every time changes are made to working files in the directory. This is great for playing around with the code.

OR

Run `npm start` to run the API in "production mode". This will be a normal server that won't restart after changes are made to files in the directory.


## INTEGRATION WITH HEROKU
Please note that deploying to Heroku is likely easiest with a database accessible via a URL. In your project folder, run the command `heroku create`. Alternatively, if you wish to push to existing project run the command `heroku git:remote -a <yourappname>`. Then run `git push heroku master` to push up to Heroku, followed by `heroku ps:scale web=1` to start up a dyno.

Find your app at [heroku.com](http://www.heroku.com) and then click Settings, then Reveal Config Vars. 
Add an entry for `DATABASE_URL`, pasting in the database URL from step 6
ex:  
`postgres://<dbuser>:<dbpass>@stampy.db.elephantsql.com:5432/todo-app-api`
 
Then hit ` git push heroku master` to deploy to Heroku.

