// Import Firebase Database functions
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";

// Use the existing Firebase app instance
const db = getDatabase();

// Reference for the voice chat folder
const vcRef = ref(db, "voicechat");

// DOM elements
const pushToTalkButton = document.getElementById("pushToTalk");
const userCountDisplay = document.getElementById("userCount");

// Track user's session
let userKey = null;

// Listen for changes in the user count
onValue(vcRef, (snapshot) => {
  const data = snapshot.val();
  const userCount = data ? Object.keys(data).length : 0; // Count users
  userCountDisplay.textContent = userCount; // Update user count on the page
});

// Function to join VC
function joinVC() {
  if (!userKey) {
    userKey = push(vcRef, { active: true }).key; // Add user to the database
    console.log("Joined VC");
  }
}

// Function to leave VC
function leaveVC() {
  if (userKey) {
    remove(ref(db, `voicechat/${userKey}`)); // Remove user from the database
    userKey = null;
    console.log("Left VC");
  }
}

// Push-to-Talk button functionality
pushToTalkButton.addEventListener("mousedown", () => {
  joinVC(); // User joins VC when the button is pressed
});

pushToTalkButton.addEventListener("mouseup", () => {
  leaveVC(); // User leaves VC when the button is released
});

pushToTalkButton.addEventListener("mouseleave", () => {
  leaveVC(); // User leaves VC if the cursor leaves the button
});

// Leave VC when the page is closed or refreshed
window.addEventListener("beforeunload", leaveVC);
