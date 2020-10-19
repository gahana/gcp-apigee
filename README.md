# GCP APIs from Apigee Edge

Apigee API Proxies to invoke GCP APIs

## Prerequisites
Use [apigeetool](https://www.npmjs.com/package/apigeetool) to deploy proxies in this repository

You'll need [get_token](https://docs.apigee.com/api-platform/system-administration/using-gettoken) utility to get valid tokens for deploying proxies.

[Create a GCP service account](https://cloud.google.com/iam/docs/creating-managing-service-accounts) with the right role/permission to invoke the API. Also [create private/public keys](https://cloud.google.com/iam/docs/creating-managing-service-account-keys#creating_service_account_keys) for the service account. 

## Install
Download or clone this repository

```bash
git clone https://github.com/gahana/gcp-apigee.git
cd gcp-apigee
```

Set your Apigee Edge organization, environment, username and password in environment variables

```bash
export EDGE_USERNAME="Apigee Edge Username"
export EDGE_PASSWORD="Apigee Edge Password"
export ORG="org name"
export ENV="env name"
```

## Get Token
Get a valid token by

```bash
export SSO_LOGIN_URL=https://login.apigee.com
TOKEN=$(get_token -u $EDGE_USERNAME:$EDGE_PASSWORD -m <MFA Token>)

```

## GCP APIs
Use the gcp-sa-gcs proxy to invoke a GCS get bucket list API. The same mechanism can be used to invoke other GCP APIs too by chaning the `target_url` in `set-context.js` resource file.

Update the `set-context.js` resource file in `./gcp-sa-gcs/apiproxy/resources/jsc` folder to update the service account created to invoke the GCP API. This is for a simplified demo only. Always store service account keys in encrypted KVM.

Deploy the proxy with below command:
```bash
apigeetool deployproxy  -t $TOKEN -o $ORG -e $ENV -n gcp-sa-gcs -d ./gcp-sa-gcs
```

Sample test:
```bash
curl "https://$ORG-$ENV.apigee.net/gcp-sa-gcs?project=<GCP Project ID>"
```

## Cloud Run APIs
Use the gcp-sa-cloudrun proxy to invoke a Cloud Run API.

Update the `target_url` variable in `./gcp-sa-gcs/apiproxy/resources/jsc/set-context.js` resource file to reflect the Cloud Run API URL.

Update the `set-context.js` resource file in `./gcp-sa-gcs/apiproxy/resources/jsc/set-context.js` folder to update the service account variable created to invoke the GCP API. This is for a simplified demo only. Always store service account keys in encrypted KVM.

Deploy the proxy with

```bash
apigeetool deployproxy  -t $TOKEN -o $ORG -e $ENV -n gcp-sa-cloudrun -d ./gcp-sa-cloudrun
```

Sample test
```bash
curl "https://$ORG-$ENV.apigee.net/gcp-sa-cloudrun"
```
