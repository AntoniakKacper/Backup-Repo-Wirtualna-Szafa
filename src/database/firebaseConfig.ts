// const firebaseConfig = {
//   apiKey: "AIzaSyBC6TVAc27pKVF1z4rezsnsJ9j0pOyP6xI",
//   authDomain: "virtualna-shafa-v2-78a2b.firebaseapp.com",
//   projectId: "virtualna-shafa-v2-78a2b",
//   storageBucket: "virtualna-shafa-v2-78a2b.appspot.com",
//   messagingSenderId: "504502159706",
//   appId: "1:504502159706:web:e59e7ce99b6ebdbfba0b63",
//   measurementId: "G-H9YDQCLWGN"
// };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

export default firebaseConfig;