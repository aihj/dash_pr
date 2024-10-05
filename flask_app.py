

import pandas as pd

from datetime import datetime
import json
from flask import Flask
from flask import jsonify



with open("C:/Users/Heejae Kim/Desktop/work/dash_pr/data copy.json") as json_file:
    data = json.load(json_file)


data = pd.DataFrame(data)
app = Flask(__name__)


#서비스
@app.route("/data")
def get_data():       

    d= json.loads(data.sort_values(by='date_at').to_json(orient='records'))
    
    
    return d



if __name__ == '__main__':

    app.run(debug=True, port=5000)
    