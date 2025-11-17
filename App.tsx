import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [installPromptEvent, setInstallPromptEvent] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      event.preventDefault();
      // Stash the event so it can be triggered later.
      setInstallPromptEvent(event);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // Cleanup listener when component unmounts
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (!installPromptEvent) {
      return;
    }
    // Show the install prompt
    installPromptEvent.prompt();
    // Wait for the user to respond to the prompt
    installPromptEvent.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      // We can only use the prompt once, so clear it.
      setInstallPromptEvent(null);
    });
  };

  return (
    <main className="bg-gray-50 h-screen w-screen flex items-center justify-center">
      <div className="relative w-full max-w-[500px] mx-auto h-screen overflow-hidden border border-gray-300 shadow-lg md:h-[90vh] md:rounded-xl">
        {installPromptEvent && (
          <button
            onClick={handleInstallClick}
            className="absolute top-4 right-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 z-10 animate-pulse"
            aria-label="Install App"
          >
            Cài đặt
          </button>
        )}
        <iframe
          id="menu-iframe"
          src="https://script.google.com/macros/s/AKfycbzC5YfFuHV6z4wCbowUTkf8qC3wJJoFcVX1eBDTrO1gfHLPbOQQaYQnMCDTWVKqtQM/exec"
          className="w-full h-full border-none"
          loading="lazy"
          scrolling="no"
          title="3enu"
          allow="geolocation; microphone; camera; midi; encrypted-media; autoplay; clipboard-write; web-share"
        >
        </iframe>
      </div>
    </main>
  );
};

export default App;
