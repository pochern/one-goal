from flask import Flask, render_template, request
import json
app = Flask(__name__)


DATA_PATH = 'data.json' 


@app.route('/data.json', methods=['GET'])
def get_data():
    if DATA_PATH:
        with open(DATA_PATH, 'r') as f:
            datastore = json.load(f)
    return json.dumps(datastore)

def write_json(data):
    with open(DATA_PATH, 'w') as f:
        json.dump(data, f, indent=4)


@app.route('/data.json', methods=['POST'])
def set_data():
    # import pudb; pudb.set_trace()
    file_data = json.loads(get_data())

    # python object to be appended
    new_data = request.get_json()

    # append data to file
    file_data.append(new_data)

    write_json(file_data)
    return request.get_json()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3100)
