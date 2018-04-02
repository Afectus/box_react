import coreapi from 'coreapi';
import schema from '../coreapi/schema';

export const newApiClient = (token) => {
    const auth = new coreapi.auth.TokenAuthentication({
        scheme: 'Token',
        token: token
    });
    let client = new coreapi.Client({auth: auth})
    return client;
}

var client = new coreapi.Client();
client.schema = schema;

export default client;