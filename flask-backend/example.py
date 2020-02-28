from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
@app.route('/home')
def hello_world():
    return 'Hello World'

@app.route('/about') 
def about():
    return '<h1>About page!</h1>'

@app.route('/forms/abc.json')
def see_form_json():
    return {'goal': 'I want a big goal'}

if __name__ == '__main__':
    # app.run(debug=True)
    app.run(debug=True, host='0.0.0.0', port=3100)
