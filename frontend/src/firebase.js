import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUAnfBB6PvvePBhbbKA-p56Spemvyyflo",
  authDomain: "ai-chatbot-c76ce.firebaseapp.com",
  projectId: "ai-chatbot-c76ce",
  storageBucket: "ai-chatbot-c76ce.firebasestorage.app",
  messagingSenderId: "531776496089",
  appId: "1:531776496089:web:75ce5f63755bf168e139c8",
  measurementId: "G-ZXRFTHQ6ZQ"
};

async function saveMessage(sender, text) {
  try {
    await addDoc(collection(db, "messages"), {
      sender: sender,
      message: text,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.log("Message could not be saved!", error);
  }
}

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db , saveMessage };
