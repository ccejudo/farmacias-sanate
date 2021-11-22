from flask import Flask
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
import json
from bson import json_util

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

client = MongoClient("mongodb+srv://RubenS:farmacia12345@cluster0.ks441.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = client.sanate

@app.route("/")
@cross_origin()
def hello():
  return "Hello World!"

@app.route("/select")
@cross_origin()
def select():
  productos = db.productos

  cursor=productos.find({},{"_id":0})

  json_docs = []
  for doc in cursor:
    json_docs.append(doc)
  #print(json_docs)

  

  return {"items": json_docs}

@app.route("/selectOne")
def selectOne():
  productos = db.productos

  result=productos.find_one({},{"_id":0})
  #result=productos.find_one()
  #result = json.dumps(result, default=json_util.default)
  #result = json.loads(result)

  return result


@app.route("/selectCategory/<category>")
def selectCategory(category):
  productos = db.productos

  cursor=productos.find({"categoria":category},{"_id":0})
  json_docs = []
  for doc in cursor:
    json_docs.append(doc)
  #print(json_docs)
  

  return {"items": json_docs}

@app.route("/selectNumber/<int:number>")
def selectNumber(number):
  productos = db.productos

  cursor=productos.find({"no":number},{"_id":0})
  json_docs = []
  for doc in cursor:
    json_docs.append(doc)
  #print(json_docs)
  

  return {"items": json_docs}

@app.route("/selectQuery/<query>")
def selectQuery(query):
  productos = db.productos

  cursor=productos.find({"name":{"$regex":query+'.*'}},{"_id":0})
  json_docs = []
  for doc in cursor:
    json_docs.append(doc)
  #print(json_docs)
  

  return {"items": json_docs}

@app.route("/priceSort")
def priceSort():
  productos = db.productos

  cursor=productos.find({},{"_id":0}).sort("price", -1)
  json_docs = []
  for doc in cursor:
    json_docs.append(doc)
  #print(json_docs)
  

  return {"items": json_docs}
