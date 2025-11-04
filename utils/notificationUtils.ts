
// This is a placeholder VAPID public key.
// In a real application, this would be generated on your server and sent to the client.
const VAPID_PUBLIC_KEY = 'BPhg-B_gZ0hSWF5yq-7Tj2fB18UXR3j7_1-YgP3PZtK5a-c1_nL-QG1F1u_l-x_ZtZ-kZ-o_j_c-L_k';

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function subscribeUserToPush(): Promise<void> {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    });
    
    console.log('User is subscribed:', subscription);
    
    // In a real app, you would send this subscription object to your backend server
    // to store it and use it to send push notifications.
    // Example: await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify(subscription) });

  } catch (error) {
    console.error('Failed to subscribe the user: ', error);
  }
}
