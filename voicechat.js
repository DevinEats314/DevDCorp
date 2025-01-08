const pushToTalkButton = document.getElementById("pushToTalk");

// Variables to store audio stream and microphone track
let audioStream = null;
let audioTrack = null;

// Function to start the microphone
async function startAudio() {
  try {
    // Request access to the microphone
    audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioTrack = audioStream.getAudioTracks()[0];
    console.log("Microphone activated");
  } catch (error) {
    console.error("Error accessing microphone:", error);
    alert("Microphone access is required for this feature to work.");
  }
}

// Function to stop the microphone
function stopAudio() {
  if (audioTrack) {
    audioTrack.stop();
    console.log("Microphone deactivated");
  }
}

// Add event listeners for push-to-talk functionality
pushToTalkButton.addEventListener("mousedown", () => {
  startAudio();
});

pushToTalkButton.addEventListener("mouseup", () => {
  stopAudio();
});

pushToTalkButton.addEventListener("mouseleave", () => {
  stopAudio();
});
