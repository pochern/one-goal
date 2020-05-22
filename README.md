# one-goal-app
An app designed to help users keep a record of one goal for the day.
Useful for standups.

## To set up locally:
### Using NGINX for reverse proxy
To set it up, copy the nginx.conf file contents to your local nginx.conf path.

### Install flask in flask-backend folder
```
cd flask-backend
pip install flask
```

### Install npm in react-frontend folder
```
cd react-frontend
npm install
```

### Run the nginx on your local machine
```
sudo nginx
```

### Run the client on your machine
```
cd react-frontend
npm start
```

### Run the server on your machine
```
cd flask-backend
python app.py
```

### Create the Goal database
```
cd flask-backend
python
from app import Goal
from app import db
db.create_all()
```
