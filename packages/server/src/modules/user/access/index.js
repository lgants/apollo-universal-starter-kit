// import jwt from './jwt';
// import session from './session';
// import custom from './custom';

import Feature from './connector';

// Try to grant access via sessions first, and if that fails, then try using JWT
// This way if both JWT and sessions enabled UI won't have to refresh access tokens
// export default new Feature(session, jwt);
export default new Feature({});
