#TODO API - Node.js, Express.js, PostgreSQL, Knex.js
This implementation of the todobackend API uses node, express knex and postgreSQL database. 	

Our live example of this code is on [http://inexperiencedfearfuleagle.heroku.com](http://inexperiencedfearfuleagle.heroku.com)


##INSTALLATION
1. Download / Clone this repository into directory of your choice.

2. Run  `npm install`  to install dependencies needed to run this api.

3. Create a postgreSQL database for this api to connect to. 
Suggestions:  [elephantsql.com](http://www.elephantsql.com)  or locally.

4.  Create the table with this SQL query through the postgreSQL shell.  
`CREATE TABLE todos ( id serial PRIMARY KEY, completed boolean DEFAULT false, "order" integer, title text NOT NULL);`

5. Goto terminal.app (mac) / command line (windows) and cd into this repository's directory and run the following command to create a .env  file to store.  ``touch .env``

6. Modify the ".env"  file and paste in  `DATABASE_URL=yourdatabaseurlhere`
where - `yourdatabaseurl`   could be 

ex:  localhost:5432  

or a long url like the following from elephantsql.com
`postgres://abcdefgh:asdfjkwfjnviwndjkvjalewrjfdsak@stampy.db.elephantsql.com:5432/abcdefgh`

##STARTING THE API
Run `npm run dev` to run the API in "dev mode". It will start the server with nodemon which will restart the server every time changes are made to working files in the directory. This is great for playing around with the code.

OR

Run `npm start` to run the API in "production". This will be normal server that won't restart after changes are made to files in the directory.


##INTEGRATION WITH HEROKU
`cd` into your restaurants app project folder and run the command `heroku create`. If you wish to push to existing project run this command instead. `heroku git:remote -a <yourappname>`When that completes run `git push heroku master` to push up to Heroku, followed by `heroku ps:scale web=1` to start up a dyno on your server.
Visit your dashboard at [heroku.com](http://www.heroku.com). Find the app you just created (the name was logged after you ran heroku create), then click Settings => Reveal Config Vars. 
Add an entry for `DATABASE_URL`, pasting in the database URL from step 6 
ex:  
`postgres://<dbuser>:<dbpass>@stampy.db.elephantsql.com:5432/todo-app-api`
 
DEPLOYING TO HEROKU 
` git push heroku master`
to push your build to your heroku setup.

