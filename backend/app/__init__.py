from flask import Flask, request
from pymongo import MongoClient
from bson import Binary, Code, json_util
from bson.objectid import ObjectId
#from bson.json_util import dumps, loads
import json

app = Flask(__name__)

client = MongoClient("mongodb+srv://RubenS:farmacia12345@cluster0.ks441.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = client.sanate

@app.route("/")
def hello():
  return "Hello World!"

@app.route("/select")
def select():
  productos = db.productos
  
  cursor=productos.find()

  json_docs = []
  
  for doc in cursor:
    json_docs.append(json.loads(json_util.dumps(doc)))
   
  return {"items": json_docs}

@app.route("/selectOne")
def selectOne():
  productos = db.productos

  result=productos.find_one()
  result = json.loads(json_util.dumps(result))

  return result


@app.route("/selectCategory/<category>")
def selectCategory(category):
  productos = db.productos

  cursor=productos.find({"categoria":category})
  json_docs = []
  for doc in cursor:
    json_docs.append(json.loads(json_util.dumps(doc)))
  

  return {"items": json_docs}


@app.route("/searchId/<id>")
def searchId(id):
  productos = db.productos

  result=productos.find_one({"_id":ObjectId(id)})
  
  result = json.loads(json_util.dumps(result))

  return result

@app.route("/selectNumber/<int:number>")
def selectNumber(number):
  productos = db.productos

  cursor=productos.find({"no":number})
  json_docs = []
  for doc in cursor:
    json_docs.append(json.loads(json_util.dumps(doc)))
  #print(json_docs)
  

  return {"items": json_docs}

@app.route("/selectQuery/<query>")
def selectQuery(query):
  productos = db.productos

  cursor=productos.find({"name":{"$regex":query+'.*'}})
  json_docs = []
  for doc in cursor:
    json_docs.append(json.loads(json_util.dumps(doc)))
  #print(json_docs)
  

  return {"items": json_docs}

@app.route("/priceSort")
def priceSort():
  productos = db.productos

  cursor=productos.find().sort("price", -1)
  json_docs = []
  for doc in cursor:
    json_docs.append(json.loads(json_util.dumps(doc)))
  #print(json_docs)
  

  return {"items": json_docs}

@app.route("/insertProduct", methods=['POST'])
def insertProduct():
  productos = db.productos

  entry = { 
      "cantidad": request.cantidad, 
      "categoria": request.categoria, 
      "image": request.image, 
      "medida": request.medida, 
      "name": request.name,  
      "price": request.price
    }
  entry_id = productos.insert_one(entry).inserted_id

  #print(entry_id)

  return "success"

@app.route("/deleteProduct", methods=['POST'])
def insertProduct():
  productos = db.productos

  productos.delete_one({"_id":ObjectId(request.id)})

  return "success"

@app.route("/updateProduct", methods=['POST'])
def updateProduct():
  productos = db.productos

  entry = { 
      "cantidad": request.cantidad, 
      "categoria": request.categoria, 
      "image": request.image, 
      "medida": request.medida, 
      "name": request.name,  
      "price": request.price
    }
  productos.update_one({"_id":ObjectId(request.id)},{"$set": entry})

  return "success"