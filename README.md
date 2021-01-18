
**_This is an experimental project and should not be used for actual production purposes._**
A Dockerised implementation of the MERN stack with google oauth 2.0 and session storage using cookies(User stays logged on for 24 hours). 

### **Configure environemnt file**
1. rename env file
    `cp ./server/.env.example ./server/.env`
1. Configure your env file by generating the neccessary keys for the google oauth 2.0 by following this [guide](https://developers.google.com/identity/protocols/oauth2) and set the redirect url to `/api/auth/google/redirect`

### **development environemt**
_Hot loading is enabled for both the front end and the back end. Any changes to your react files or nodejs fills will instantly be applied without manually restarting the server. Easy developer experience!!!_
* Nodejs backend accessible at https://localhost:8080
* React frontend accessible https://localhost:3000
1. Create development docker-compose config file from the template
    `cp docker-compose.dev.yml docker-compose.yml`
1. Build and run the docker containers in detatched state
    `docker-compose up -d --build --remove-orphans`
1. Stop the docker containers
    `docker-compose down`


### **Production environment**
_No hot loading is avaliable, any changes to the project files require a server restart. The react files are built and statically served using nodejs_
* project accessible at https://localhost:8080
1. Create production docker-compose config file from the template
    `cp docker-compose.dev.yml docker-compose.yml`
1. Build and run the docker containers in detached state
    `docker-compose up -d --build --remove-orphans`
1. Stop the docker containers
    `docker-compose down`


### **Routes**
**front end localhost:3000**
   * `/login` - A login page with a login button to redirect to google oauth (/api/auth/google)
   * `/home` - The home display which you are redirected to after google oauth
**backend localhost:8080**
   * `/api/auth/google` - api call to google oauth
   * `/api/auth/google/redirect` - api call for google oauth redirect
   * `/api/auth/status` - api call to determine which user is logged in

**TO-DO**
1. Add logout feature
2. Ensure persistent data is working
