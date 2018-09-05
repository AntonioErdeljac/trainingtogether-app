const domain = 'trainingtogether.herokuapp.com';
const port = undefined;
const protocol = 'http://';

const serverUrl = `${protocol}${domain}${port ? `:${port}` : ''}`;

export { domain };
export { port };
export { protocol };
export { serverUrl };
