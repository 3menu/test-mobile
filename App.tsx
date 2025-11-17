
import React from 'react';

const App: React.FC = () => {
  return (
    <main className="bg-gray-50 h-screen w-screen flex items-center justify-center">
      <div className="relative w-full max-w-[500px] mx-auto h-screen overflow-hidden border border-gray-300 shadow-lg md:h-[90vh] md:rounded-xl">
        <iframe
          id="menu-iframe"
          src="https://script.google.com/macros/s/AKfycbz6KyEzjpTYAFhe-QAtGa316gq24wFnzqBauYsPI5FlHDeF_A7wP2OGGg25wtNzhfha/exec"
          className="w-full h-full border-none"
          loading="lazy"
          title="3enu"
        >
        </iframe>
      </div>
    </main>
  );
};

export default App;
