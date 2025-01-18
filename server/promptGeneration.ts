// Function to call the generate_ad API
async function generateAd(text: string, imageBase64?: string): Promise<any> {
  const response = await fetch('http://localhost:5000/generate_ad', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          text: text,
          image: imageBase64,  // Optional base64-encoded image
      }),
  });

  const data = await response.json();
  return data;
}

// Function to call the generate_video_script API
async function generateVideoScript(text: string, imageBase64?: string): Promise<any> {
  const response = await fetch('http://localhost:5000/generate_video_script', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          text: text,
          image: imageBase64,  // Optional base64-encoded image
      }),
  });

  const data = await response.json();
  return data;
}

// Function to handle the advertisement form submission
async function handleAdFormSubmit(event: Event) {
  event.preventDefault();

  const adText = (document.getElementById('adText') as HTMLTextAreaElement).value;
  const adImage = (document.getElementById('adImage') as HTMLTextAreaElement).value;

  try {
      const adResult = await generateAd(adText, adImage);
      const adResultDiv = document.getElementById('adResult')!;
      adResultDiv.innerHTML = `<strong>Generated Advertisement:</strong><p>${adResult.advertisement}</p>`;
  } catch (error) {
      console.error("Error generating ad:", error);
  }
}

// Function to handle the video script form submission
async function handleVideoScriptFormSubmit(event: Event) {
  event.preventDefault();

  const videoText = (document.getElementById('videoText') as HTMLTextAreaElement).value;
  const videoImage = (document.getElementById('videoImage') as HTMLTextAreaElement).value;

  try {
      const videoScriptResult = await generateVideoScript(videoText, videoImage);
      const videoScriptResultDiv = document.getElementById('videoScriptResult')!;
      videoScriptResultDiv.innerHTML = `<strong>Generated Video Script:</strong><p>${videoScriptResult.video_script}</p>`;
  } catch (error) {
      console.error("Error generating video script:", error);
  }
}

// Attach event listeners to the forms
document.getElementById('adForm')?.addEventListener('submit', handleAdFormSubmit);
document.getElementById('videoScriptForm')?.addEventListener('submit', handleVideoScriptFormSubmit);
