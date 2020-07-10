from flask import Flask, redirect, request, url_for, session
from authlib.integrations.flask_client import OAuth
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from os import environ

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./test.db'
db = SQLAlchemy(app)

app.secret_key = environ['APP_SECRET_KEY']
# oauth config
oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id=environ['GOOGLE_CLIENT_ID'],
    client_secret=environ['GOOGLE_CLIENT_SECRET'],
    access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    api_base_url='https://www.googleapis.com/oauth2/v1/',
    # This is only needed if using openId to fetch user info
    userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',
    client_kwargs={'scope': 'openid email profile'},
)


class User(db.Model):
    email = db.Column(db.String(320), unique=True, primary_key=True)
    first_name = db.Column(db.String(80))
    goals = db.relationship('Goal', backref='user', lazy=True)


class Goal(db.Model):
    user_email = db.Column(db.String(320), db.ForeignKey('user.email'),
                           nullable=False)
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(80), unique=False, nullable=False)
    completed = db.Column(db.Boolean, default=False, nullable=False)
    date = db.Column(db.DateTime, default=datetime.now)

    def __repr__(self):
        return '<Goal %r>' % self.text

# If user logs in first time
# If user email does not exist in table, add to table
# If user email exists in table, load goals table for user


@app.route('/data.json', methods=['GET'])
def get_data():
    session_email = dict(session).get('email', None)
    print('session_email', session_email)
    session_first_name = dict(session).get('first_name', None)
    print('session_first_name', session_first_name)
    # gives None if email does not exist
    missing = User.query.filter_by(email=session_email).first()
    if missing is None:
        aUser = User(email=session_email, first_name=session_first_name)
        db.session.add(aUser)
        db.session.commit()

    goals = Goal.query.filter_by(user_email=session_email)

    return {
        'goals': [{
            'id': goal.id,
            'text': goal.text,
            'completed': goal.completed,
            'date': goal.date.strftime("%m/%d/%y"),
        } for goal in goals],
    }


@app.route('/data.json', methods=['POST'])
def add_data():
    json_data = request.get_json()
    request_text = json_data['text']
    session_email = dict(session).get('email', None)
    aGoal = Goal(user_email=session_email, text=request_text)
    db.session.add(aGoal)
    db.session.commit()

    return request.form


@app.route('/data.json', methods=['PUT'])
def update_data():
    json_data = request.get_json()
    request_text = json_data['text']
    request_id = json_data['id']
    request_completed = json_data['completed']
    aGoal = Goal.query.get(request_id)
    aGoal.text = request_text
    aGoal.completed = request_completed
    db.session.commit()

    return request.form


@app.route('/data.json', methods=['DELETE'])
def delete_data():
    json_data = request.get_json()
    request_id = json_data['id']
    Goal.query.filter(Goal.id == request_id).delete()
    db.session.commit()

    return request.form


@app.route('/login', methods=['GET'])
def login():
    redirect_uri = url_for('authorize', _external=True)
    print('redirecting to: ', oauth.google.authorize_redirect(redirect_uri))
    return oauth.google.authorize_redirect(redirect_uri)


@app.route('/authorize')
def authorize():
    print('entered authorize')
    google = oauth.create_client('google')
    print('authorized google', google)
    token = oauth.google.authorize_access_token()
    print('token: ', token)
    resp = oauth.google.get('userinfo')
    user_info = resp.json()
    print('got user info')
    # do something with the token and profile
    session['email'] = user_info['email']
    session['first_name'] = user_info['given_name']
    print('authorizing')
    return redirect('http://127.0.0.1')


@app.route('/logout')
def logout():
    for key in list(session.keys()):
        session.pop(key)
    return redirect('/')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
