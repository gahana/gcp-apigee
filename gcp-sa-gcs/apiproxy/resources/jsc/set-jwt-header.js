var token_response_str = context.getVariable("token_response.content")
var token_response = JSON.parse(token_response_str);
context.setVariable("request.header.Authorization", "Bearer " + token_response.access_token);
