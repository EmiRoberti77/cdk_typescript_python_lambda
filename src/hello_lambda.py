import json 

def hello_lambda(event, context=None):
  http_method = event['httpMethod']
  query_parameters = event['queryStringParameters']
  response = {
    "statusCode":200,
    "body":json.dumps({
      "message":"hello python lambda",
      "httpMethod":http_method,
      "query_parameters":query_parameters
      })
  }
  
  return response