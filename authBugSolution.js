function waitForAuth(callback, timeoutMs = 5000, intervalMs = 500) {
  let attempts = 0;
  const maxAttempts = timeoutMs / intervalMs;
  const intervalId = setInterval(() => {
    firebase.auth().onAuthStateChanged((user) => {
      callback(user);
      clearInterval(intervalId);
    });
    attempts++;
    if (attempts >= maxAttempts) {
      clearInterval(intervalId);
      console.warn('Timed out waiting for authentication state change.');
      callback(null); // Or handle timeout appropriately
    }
  }, intervalMs);
}

waitForAuth((user) => {
  if (user) {
    // User is signed in.
    console.log('User signed in:', user);
  } else {
    // User is signed out.
    console.log('User signed out.');
  }
});