import dash
import plotly.graph_objs as go
import plotly.express as px
import matplotlib.pyplot as plt
from dash import Dash, dcc, html, Input, Output
from IPython.display import display, HTML
import pandas as pd
import pymysql
from sqlalchemy import create_engine, text
import requests
from datetime import datetime
import json
from flask import Flask
from flask import jsonify



pymysql.install_as_MySQLdb()
HOSTNAME = '192.168.0.120'
PORT = 3308
USERNAME = 'hjkim'
PASSWORD = '123456'
DATABASE = 'outlook'
CHARSET1 = 'utf8'
CHARSET2 = 'utf-8'

# 위 커넥션 정보와 동일하게 입력|
con_str_fmt = 'mysql+mysqldb://{0}:{1}@{2}:{3}/{4}?charset={5}'
con_str = con_str_fmt.format(USERNAME, PASSWORD, HOSTNAME, PORT, DATABASE, CHARSET1)

engine = create_engine(con_str)
conn = engine.connect()

s_date = (pd.Timestamp.today(tz = 'Asia/Seoul') - pd.Timedelta(days = 365)).strftime("%Y-%m-%d")
s_need = (pd.Timestamp.today(tz = 'Asia/Seoul') - pd.Timedelta(days = 365 + 6)).strftime("%Y-%m-%d")

s_date = (pd.Timestamp.today(tz = 'Asia/Seoul') - pd.Timedelta(days = 365)).strftime("%Y-%m-%d")
s_need = (pd.Timestamp.today(tz = 'Asia/Seoul') - pd.Timedelta(days = 365 + 6)).strftime("%Y-%m-%d")

s_date1 = '2022-01-01'
s_need1 = '2022-01-07'





q = f"""
select *
    from carenation_overview
    where 1=1
    and date_at >= "{s_need1}"
"""
df = pd.read_sql_query(q, engine)

var_ls = ['posts', 'apps', 'pay', 'cancel', 'service']
t = {}
for v in var_ls:
    t[v] = pd.pivot_table(df, index = ['date_at'], columns = ['job_type'], values = f'num_{v}', aggfunc = 'sum').reset_index() 
    orig_col, new_col = ['care', 'donghaeng', 'housekeeper'], [f'{v}_care', f'{v}_dh', f'{v}_hk']  
    for c in range(len(orig_col)):
        t[v][new_col[c]] = t[v][orig_col[c]].rolling(window = 7).mean()
    
    t[v] = t[v][t[v][f'{v}_care'].notnull()].reset_index(drop = True).copy().rename_axis(None, axis=1).drop(orig_col, axis = 1)

df_f = t['posts'].copy()
for v in var_ls[1:]:
    df_f = df_f.merge(t[v], on = 'date_at', how = 'outer', validate = '1:1')


df_c = df_f.merge(pd.concat([df[df.care_A.notnull()][['date_at']], df[df.care_A.notnull()][['care_A', 'care_B', 'care_C']].rolling(window = 7).mean()], axis = 1),
                  on = 'date_at', how = 'outer', validate = '1:1')\
    .merge(pd.concat([df[df.job_type == 'care'][['date_at']], df[df.job_type == 'care'][['approved_amt', 'canceled_amt', 'net_amt']].rolling(window = 7).mean()], axis = 1),
           on = 'date_at', how = 'outer', validate = '1:1')

df_c = df_c.sort_values(by='date_at')[6:]
data_c = df_c[['date_at','care_A','care_B','care_C','approved_amt','canceled_amt']]
data_c['approved_amt'] = data_c['approved_amt'] * 10**(-8)
data_c['canceled_amt'] = data_c['canceled_amt'] * 10**(-8)

df_h = df_f.merge(pd.concat([df[df.job_type == 'housekeeper'][['date_at']], df[df.job_type == 'housekeeper'][['approved_amt', 'canceled_amt']].rolling(window = 7).mean()], axis = 1),
           on = 'date_at', how = 'outer', validate = '1:1')
df_h = df_h.sort_values(by='date_at')[6:]
data_h = df_h[['date_at','approved_amt', 'canceled_amt']]
data_h['approved_amt'] = data_h['approved_amt'] * 10**(-8)
data_h['canceled_amt'] = data_h['canceled_amt'] * 10**(-8)
data_h.columns = ['date_at','approved_amt_h','canceled_amt_h']

df_d = df_f.merge(pd.concat([df[df.job_type == 'donghaeng'][['date_at']], df[df.job_type == 'donghaeng'][['approved_amt', 'canceled_amt']].rolling(window = 7).mean()], axis = 1),
           on = 'date_at', how = 'outer', validate = '1:1')
df_d = df_d.sort_values(by='date_at')[6:]
data_d = df_d[['date_at','approved_amt', 'canceled_amt']]
data_d['approved_amt'] = data_d['approved_amt'] * 10**(-8)
data_d['canceled_amt'] = data_d['canceled_amt'] * 10**(-8)
data_d.columns = ['date_at','approved_amt_d','canceled_amt_d']

df = pd.merge(df_f,data_c, on='date_at')
df = pd.merge(df,data_d, on='date_at')
df = pd.merge(df,data_h, on='date_at')

df = df.fillna('NaN')




app = Flask(__name__)


#서비스
@app.route("/data")
def get_data():       

    d= json.loads(df.sort_values(by='date_at').to_json(orient='records'))
    
    for i in range(len(data_c)):
        
        d[i]['date_at'] = datetime.fromtimestamp(d[i]['date_at']/1000).strftime("%Y-%m-%d")

    return d



if __name__ == '__main__':

    app.run(debug=True, port=5000)
    