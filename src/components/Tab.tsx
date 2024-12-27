import React, { useState, useRef, useEffect } from "react";

const items = [{ name: "Home" }, { name: "Experience" }, { name: "Relevance" }];

const Tab = () => {
  const [selectedTab, setSelectedTab] = useState(items[0].name);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef([]);

  useEffect(() => {
    const currentTab = tabsRef.current.find(
      (tab) => tab?.textContent === selectedTab
    );

    if (currentTab) {
      setIndicatorStyle({
        width: `${currentTab.offsetWidth}px`,
        left: `${currentTab.offsetLeft}px`,
      });
    }
  }, [selectedTab]);

  return (
    <div className="flex justify-center sticky top-5 z-10">
      <div className="relative p-1 rounded-full shadow-lg shadow-gray-900/50">
        <div className="relative flex gap-1 px-1 py-1 rounded-full bg-gradient-to-b from-gray-900/50 to-gray-900/30">
          {/* Animated indicator */}
          <div
            className="absolute h-full top-0 rounded-full transition-all duration-300 ease-out"
            style={{
              ...indicatorStyle,
              background: "linear-gradient(90deg, #26ff0027 0%, #55ff006a 10%)",
              opacity: 0.15,
            }}
          />

          {/* Border indicator */}
          <div
            className="absolute h-full top-0 rounded-full border-2 border-fuchsia-500 transition-all duration-300 ease-out"
            style={indicatorStyle}
          />

          {/* Tab items */}
          {items.map((item, idx) => (
            <div
              key={item.name}
              ref={(el) => (tabsRef.current[idx] = el)}
              onClick={() => setSelectedTab(item.name)}
              className={`relative px-6 py-2 rounded-full cursor-pointer font-medium transition-colors duration-200
                ${
                  selectedTab === item.name
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-300"
                }
              `}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tab;
