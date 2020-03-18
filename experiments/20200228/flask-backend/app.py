from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)

class Goal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(80), unique=True, nullable=False)
    status = db.Column(db.String(10), unique=False, nullable=False)

    def __repr__(self):
        return '<Goal %r>' % self.text

@app.route('/data.json', methods=['GET'])
def get_data():
    goals = Goal.query.all()
    return {
        'goals': [{
            'id': goal.id,
            'text': goal.text,
            'status': goal.status,
        } for goal in goals],
    }

@app.route('/data.json', methods=['POST'])
def set_data():
    json_data = request.get_json()
    request_text = json_data['text']
    request_status = json_data['status']
    aGoal = Goal(text=request_text, status=request_status)
    db.session.add(aGoal)
    db.session.commit()
    
    return request.form

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3100)
