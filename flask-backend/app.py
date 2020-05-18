from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./test.db'
db = SQLAlchemy(app)

class Goal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(80), unique=False, nullable=False)
    completed = db.Column(db.Boolean, default=False, nullable=False)

    def __repr__(self):
        return '<Goal %r>' % self.text

@app.route('/data.json', methods=['GET'])
def get_data():
    goals = Goal.query.all()
    return {
        'goals': [{
            'id': goal.id,
            'text': goal.text,
            'completed': goal.completed,
        } for goal in goals],
    }

@app.route('/data.json', methods=['POST'])
def add_data():
    json_data = request.get_json()
    request_text = json_data['text']
    aGoal = Goal(text=request_text)
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


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
