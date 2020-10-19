// Cloud Run API to invoke
var target_url = "https://helloworld-dq5unvm5dq-uc.a.run.app/";

// This is for a simplified demo only. Always store service account keys in encrypted KVM.
var service_account = {
  "type": "service_account",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": ""
};
context.setVariable("private.sa-key-value", service_account.private_key);
context.setVariable("private.sa-key-id", service_account.private_key_id);
context.setVariable("client_email", service_account.client_email);
context.setVariable("token_uri", service_account.token_uri);

var additional_claims_cloudrun = { "target_audience": target_url } 
context.setVariable("additional_claims", JSON.stringify(additional_claims_cloudrun));
context.setVariable("target_url", target_url);

