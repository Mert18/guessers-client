import React from "react";

const BackgroundSVGs = () => {
  const svgFiles = [
    "controller.svg",
    "dice_5.svg",
    "gameoflife.svg",
    "happy.svg",
    "number_1.svg",
    "number_2.svg",
    "number_3.svg",
    "number_4.svg",
    "number_5.svg",
    "number_6.svg",
    "number_7.svg",
    "number_8.svg",
    "number_9.svg",
    "star.svg",
    "eye.svg",
    "50.svg",
    "work.svg",
    "money.svg",
    "number_blocks.svg",
    "lol.svg",
    "sad.svg",
    "happy.svg",
    "water.svg",
  ];

  // Function to shuffle array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Generate random icons repeated x times
  const generateRandomIcons = (times) => {
    let icons = [];
    for (let i = 0; i < times; i++) {
      icons = [...icons, ...shuffleArray(svgFiles)];
    }
    return icons;
  };

  const leftIcons = generateRandomIcons(8);
  const rightIcons = generateRandomIcons(8);

  return (
    <>
      {/* Left side */}
      <div className="hidden lg:flex fixed left-18 top-0 bottom-0 w-[16.67%] flex-wrap content-start gap-4 p-4 pointer-events-none z-0">
        {leftIcons.map((svg, index) => (
          <div key={`left-${index}`} className="w-12 h-12 opacity-10">
            <img
              src={`/icons/background/${svg}`}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* Right side */}
      <div className="hidden lg:flex fixed right-0 top-0 bottom-0 w-[16.67%] flex-wrap content-start gap-4 p-4 pointer-events-none z-0">
        {rightIcons.map((svg, index) => (
          <div key={`right-${index}`} className="w-12 h-12 opacity-10">
            <img
              src={`/icons/background/${svg}`}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default BackgroundSVGs;