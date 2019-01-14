"""
Ver:201901122239
"""

"""
Routes and views for the flask application.
"""
import json
from datetime import datetime
from flask import Flask,render_template,request,make_response
from FInd_Real_Fake_Price_Website import app
import csv
#User Define
from FInd_Real_Fake_Price_Website.SQL_Module.sql_cmd import connect_database,search_database,road_search,section_search,search_database_real,test,init_roadlist


@app.route('/')
@app.route('/home')
def home():
    #Accese Database
    connect_database()

    #Init RoadList
    init_roadlist();

    #Init Region
    region_list =['台北市','台中市','基隆市','台南市','高雄市',
              '新北市','宜蘭縣','桃園市','嘉義市','新竹縣',
              '苗栗縣','南投縣','彰化縣','新竹市','雲林縣',
              '嘉義縣','屏東縣','花蓮縣','台東縣','金門縣',
              '澎湖縣','連江縣']

    #Init Houselist
    #result_list = search_database("台北市","松山區","三民路","電梯大樓","2018")
    #result_list =[]

    """Renders the home page."""
    return render_template(
        'index.html',
        title='Home Page',
        year=datetime.now().year,
        regionlist=region_list
    )

"""
@app.route('/search', methods=['POST'])
def search():
    if request.method == 'POST': 
        data = request.form
        result_list = search_database("keelung",str(data['address']))
        return render_template('index.html', houselist = result_list)
        #return str(data['address'])
"""

@app.route('/contact')
def contact():
    """Renders the contact page."""
    return render_template(
        'contact.html',
        title='Contact',
        year=datetime.now().year,
        message='Your contact page.'
    )

@app.route('/about')
def about():
    """Renders the about page."""
    return render_template(
        'about.html',
        title='About',
        year=datetime.now().year,
        message='Your application description page.'
    )



@app.route('/js_section_selectchange', methods=['GET', 'POST'])
def js_section_selectchange():  
    result_list = road_search(request.values['region'],request.values['section'])
    response = make_response(json.dumps(result_list))
    response.content_type = 'application/json'
    return response


@app.route('/js_region_selectchange', methods=['GET', 'POST'])
def js_region_selectchange():  
    result_list = section_search(request.values['region'])
    response = make_response(json.dumps(result_list))
    response.content_type = 'application/json'
    return response


@app.route('/js_search', methods=['GET', 'POST'])
def js_search():
   #result_list = search_database(request.values['region'],request.values['section'],request.values['road'],request.values['type'],request.values['year'],request.values['room'],request.values['floor'],request.values['area'],request.values['age'],request.values['real_id'])
   result_list = search_database(request.json['region'],request.json['section'],request.json['road'],request.json['type'],request.json['year'],request.json['room'],request.json['floor'],request.json['area'],request.json['age'],request.json['real_id'])
   response = make_response(json.dumps(result_list))
   response.content_type = 'application/json'
   return response


@app.route('/js_search_real', methods=['GET', 'POST'])
def js_search_real():  
   #result_list_real = search_database_real(request.values['region'],request.values['section'],request.values['road'],request.values['type'],request.values['year'])
   result_list_real = search_database_real(request.json['region'],request.json['section'],request.json['road'],request.json['type'],request.json['year'])
   response_real = make_response(json.dumps(result_list_real))
   response_real.content_type = 'application/json'
   return response_real



