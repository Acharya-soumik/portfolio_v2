import { useState, useCallback, useRef, useEffect } from "react";
import { Send, Sparkle, X } from "lucide-react";
import axios from "axios";
import TypewriterText from "./AnimatedText";

const ChatInput = ({ isLoading, setLoading }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const frameRef = useRef();
  const startTimeRef = useRef();
  const charIndexRef = useRef(0);
  const inputRef = useRef(null);

  const sampleResponse =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt cumque asperiores cum cupiditate, neque magnam quas aspernatur quia rerum! Aliquam laboriosam quam iure provident ab neque itaque dignissimos, architecto nobis!";

  const animate = useCallback((timestamp) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const progress = timestamp - startTimeRef.current;

    if (progress > 30 && charIndexRef.current < sampleResponse.length) {
      setDisplayText((prev) => prev + sampleResponse[charIndexRef.current]);
      charIndexRef.current++;
      startTimeRef.current = timestamp;
    }

    if (charIndexRef.current < sampleResponse.length) {
      frameRef.current = requestAnimationFrame(animate);
    }
  }, []);

  const handleSubmit = async () => {
    console.log(text, "is text");
    if (!text.trim()) return;

    setLoading(true);
    setText("");
    setResponse(null);
    charIndexRef.current = 0;
    frameRef.current = requestAnimationFrame(animate);

    try {
      const result = await axios.post(
        "http://ec2-3-110-114-203.ap-south-1.compute.amazonaws.com:8000/run_langflow",
        {
          message: text,
        }
      );
      setResponse(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [response]);

  const res = response?.outputs[0].outputs[0].outputs.message.message.text;
  const handleClear = () => {
    setResponse(null);
  };

  return (
    <div className="w-full mt-auto md:mt-0 max-w-3xl bg-transparent rounded-2xl shadow  p-6 transition-all duration-500">
      <div className="flex justify-between items-center mb-6">
        <p className="text-white text-xl font-semibold flex items-center gap-3">
          {isLoading ? (
            <Sparkle className="text-yellow-400 animate-spin" size={24} />
          ) : (
            <Sparkle className="text-yellow-400" size={24} />
          )}
          <TypewriterText text="Ask me something" />
        </p>
        {response && (
          <button
            onClick={handleClear}
            className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-all duration-300 z-30"
            aria-label="Clear response"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="space-y-6">
        {!response && !isLoading && (
          <div
            className={`flex w-full md:w-[70%] bg-black items-center gap-3 bg-gray-800/50 rounded-xl p-3 
              ring-1 ring-gray-700 transition-all duration-300 
              ${
                isFocused
                  ? "ring-2 ring-purple-500 ring-opacity-50"
                  : "hover:ring-purple-500/30"
              }`}
          >
            <input
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ask me anything..."
              className="w-full bg-transparent text-white focus:outline-none placeholder:text-gray-200 text-lg z-40"
            />
            <button
              onClick={handleSubmit}
              disabled={!text.trim()}
              className="p-2 rounded-full bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 
                disabled:cursor-not-allowed transition-all duration-300 
                transform hover:scale-105 active:scale-95 focus:outline-none
                hover:shadow-lg hover:shadow-purple-500/20"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        )}

        {isLoading && !response && (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-3">
              <div
                className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 animate-fadeIn">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {!isLoading && res && (
          <div
            onClick={handleClear}
            className="bg-transparent rounded-xl p-6 max-h-[60vh] overflow-y-auto custom-scrollbar 
              ring-1 ring-gray-700 hover:ring-2 hover:ring-purple-500/30 
              transition-all duration-300 cursor-pointer z-5"
          >
            <TypewriterText
              text={res}
              className="text-white text-lg leading-relaxed"
            />
            <span className="inline-block w-0.5 h-5 bg-purple-500 ml-1 animate-pulse align-middle" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInput;
