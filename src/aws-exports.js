const awsconfig = {
  aws_project_region: 'us-east-1', // The AWS region where your services are deployed
  aws_cognito_identity_pool_id: process.env.REACT_APP_IDENTITY_POOL_ID, // Your Amazon Cognito Identity Pool ID
  aws_cognito_region: 'us-east-1', // The region where your Cognito user pool is created
  aws_user_pools_id: process.env.REACT_APP_USER_POOL_ID, // Your Amazon Cognito User Pool ID
  aws_user_pools_web_client_id: process.env.REACT_APP_APP_CLIENT_ID, // Your Amazon Cognito App Client ID

};

export default awsconfig;
