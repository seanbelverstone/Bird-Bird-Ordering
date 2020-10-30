const prodConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const devConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_DEV_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_DEV_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DEV_URL,
	projectId: process.env.REACT_APP_FIREBASE_DEV_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_DEV_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_DEV_MESSAGING_ID,
	appId: process.env.REACT_APP_FIREBASE_DEV_APP_ID
};

// Saving 2 different configs so I dont alter the one in production when testing
const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;


export default config;