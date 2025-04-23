// app/amplify-cognito-config.tsx
'use client';

import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_ZrSSW3APp',
      userPoolClientId: '2vd10nfua1oa308ta0gm86isbr',
      loginWith: {
        email: true,
      },
    },
  },
});

const ConfigureAmplifyClientSide = () => {
  return null;
};



export default ConfigureAmplifyClientSide;

