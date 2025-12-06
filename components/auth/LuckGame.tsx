import { useState, useEffect } from "react";
import CustomButton from "../common/CustomButton";

interface LuckGameProps {
  username: string;
  onSuccess: () => void;
  onFailure: () => void;
}

const LuckGame = ({ username, onSuccess, onFailure }: LuckGameProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [correctBox, setCorrectBox] = useState<number | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const totalSteps = 2;

  const startGame = () => {
    setGameStarted(true);
    setCurrentStep(1);
  };

  const handleBoxClick = (boxNumber: number) => {
    if (isRevealing || selectedBox !== null) return;

    setSelectedBox(boxNumber);

    // Randomly determine the correct box (0 or 1)
    const correct = Math.random() < 0.5 ? 0 : 1;
    setCorrectBox(correct);
    setIsRevealing(true);

    // Reveal after a short delay
    setTimeout(() => {
      if (boxNumber === correct) {
        // User guessed correctly
        if (currentStep === totalSteps) {
          // All steps completed - SUCCESS!
          setTimeout(() => onSuccess(), 1000);
        } else {
          // Move to next step
          setTimeout(() => {
            setCurrentStep(currentStep + 1);
            setSelectedBox(null);
            setCorrectBox(null);
            setIsRevealing(false);
          }, 1500);
        }
      } else {
        // User guessed wrong - FAILURE
        setTimeout(() => onFailure(), 1500);
      }
    }, 500);
  };

  const getBoxClassName = (boxNumber: number) => {
    let baseClass = "w-32 h-32 border-4 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center text-4xl font-bold";

    if (!isRevealing) {
      return `${baseClass} border-primary hover:border-secondary hover:scale-105 bg-background`;
    }

    if (correctBox === boxNumber) {
      return `${baseClass} border-success bg-success bg-opacity-20 scale-105`;
    }

    if (selectedBox === boxNumber && correctBox !== boxNumber) {
      return `${baseClass} border-failure bg-failure bg-opacity-20`;
    }

    return `${baseClass} border-gray-500 bg-gray-800 bg-opacity-50`;
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-background rounded-lg border-2 border-primary">
        <h2 className="text-2xl font-bold text-primary mb-4">Registration Challenge</h2>
        <p className="text-primary text-center mb-2">
          You must prove your luck to register as <span className="font-bold text-secondary">{username}</span>
        </p>
        <p className="text-primary text-center mb-6">
          Choose the correct box in 2 consecutive rounds (50% chance each)
        </p>
        <p className="text-sm text-gray-400 mb-6">
          If you fail, this username will be banned and you'll need to choose a different one.
        </p>
        <CustomButton
          type="button"
          text="Start Challenge"
          onClick={startGame}
          bg={true}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-background rounded-lg border-2 border-primary">
      <h2 className="text-2xl font-bold text-primary mb-2">Step {currentStep} of {totalSteps}</h2>
      <p className="text-primary mb-6">Choose your box wisely...</p>

      {/* Progress bar */}
      <div className="w-full bg-gray-700 h-2 rounded-full mb-8">
        <div
          className="bg-secondary h-2 rounded-full transition-all duration-500"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* Boxes */}
      <div className="flex gap-8 mb-6">
        <div
          className={getBoxClassName(0)}
          onClick={() => handleBoxClick(0)}
        >
          {isRevealing && correctBox === 0 && "✓"}
          {isRevealing && selectedBox === 0 && correctBox !== 0 && "✗"}
        </div>
        <div
          className={getBoxClassName(1)}
          onClick={() => handleBoxClick(1)}
        >
          {isRevealing && correctBox === 1 && "✓"}
          {isRevealing && selectedBox === 1 && correctBox !== 1 && "✗"}
        </div>
      </div>

      {isRevealing && (
        <p className={`text-lg font-bold ${selectedBox === correctBox ? 'text-success' : 'text-failure'}`}>
          {selectedBox === correctBox ? '🎉 Correct! Moving to next step...' : '💀 Wrong choice!'}
        </p>
      )}
    </div>
  );
};

export default LuckGame;
