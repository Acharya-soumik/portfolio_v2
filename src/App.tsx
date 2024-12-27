import React, { useState } from "react";
import ChatInput from "./components/ChatInput";
import Lottie from "react-lottie-player";
import lottieJson from "./assets/lottie.json";
import ParallaxBackground from "./components/ParallaxBackground";
import TypewriterText from "./components/AnimatedText";

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParallaxBackground />

      <div className="relative z-10 min-h-screen flex flex-col-reverse md:flex-row items-center justify-center p-6 md:p-20 gap-12">
        <div className="flex-1 w-full flex flex-col items-center space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center">
            <TypewriterText
              text="Hi, Soumik Acharje"
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
              speed={70}
            />
          </h1>
          <ChatInput isLoading={loading} setIsLoading={setLoading} />
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
            <Lottie
              className="bg-white rounded-full shadow-2xl relative transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-purple-500/25 h-[200px] w-[200px] md:h-[400px] md:w-[400px]"
              loop
              animationData={lottieJson}
              play={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
