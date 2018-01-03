export let CONFIG = {
  Settings: {
    BASEAPI: 'https://localhost:44356/api', // .NetCore2.0 WebAPI
    CLIENT_ID: ‘[ApplicationID], // https://apps.dev.microsoft.com’
    TENANT: ‘[YOUR TENNANT HERE]’,
    TENANT_ID: '[YOUR TENNANT ID HERE]', // found in Azure->Active Directory->Properties Pane, TennantID = Directory ID
    AUTHORITY: 'https://login.microsoftonline.com/[YOUR Application ID HERE]',

    RESPONSE_TYPE: 'id_token',
    RESPONSE_MODE: 'id_token',
    STATE: '',
    MS_GRAPH_URI: 'https://graph.microsoft.com/',
    REDIRECT_URI : 'http://localhost:4200/home',
    POST_LOGOUT_REDIRECT : 'https://localhost:44389',
    MSGRAPH_BETA_API: 'https://graph.microsoft.com/beta/',
    MSGRAPH_v1_API: 'https://graph.microsoft.com/v1.0/',
    SCOPES: ['user.read', 'user.read.all', 'people.read.all' ],
    ADMIN_CONSENT: true
  }
};
