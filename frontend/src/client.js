import Client, { jwtPlugin } from '@synapsestudios/fetch-client';
import localstorage from 'store2';

const client = new Client({ url: '/api' });

client.addPlugin(jwtPlugin);
client.setJwtTokenGetter(() => localstorage.get('idToken'));

export default client;
