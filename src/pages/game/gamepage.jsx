import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { foods } from "../../data/foods";
import FoodCard from "../../components/game/FoodCard";
import Basket from "../../components/game/Basket";
import JennyDialog from "../../components/game/JennyDialog";

export default function GamePage() {
  const navigate = useNavigate();

  // ======================
  // STATE
  // ======================
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);

  const [foodList, setFoodList] = useState(foods.slice(0, 5));

  const [gameFinished, setGameFinished] = useState(false);

  const [message, setMessage] = useState("");

  const [dialog, setDialog] = useState(
    "Halo! Aku Jenny 😊 Bantulah aku memilih makanan yang sehat ya!"
  );

  // ======================
  // LEVEL CONFIG
  // ======================
  const levelConfig = {
    1: { foodCount: 5, time: 60, target: 100 },
    2: { foodCount: 10, time: 50, target: 200 },
    3: { foodCount: 15, time: 40, target: 300 },
  };

  // ======================
  // TIMER
  // ======================
  useEffect(() => {
    if (gameFinished) return;

    if (timeLeft <= 0) {
      setGameFinished(true);
      setDialog("⏰ Waktu habis!");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameFinished]);

  // ======================
  // AUTO LOAD FOOD PER LEVEL
  // ======================
  useEffect(() => {
    setFoodList(foods.slice(0, levelConfig[level].foodCount));
    setTimeLeft(levelConfig[level].time);
    setLives(3);
  }, [level]);

  // ======================
  // LIVES CHECK
  // ======================
  useEffect(() => {
    if (lives <= 0) {
      setGameFinished(true);
      setDialog("💔 Nyawa habis...");
    }
  }, [lives]);

  // ======================
  // LEVEL UP SYSTEM
  // ======================
  useEffect(() => {
    const config = levelConfig[level];

    if (score >= config.target) {
      if (level < 3) {
        const nextLevel = level + 1;

        setLevel(nextLevel);
        setDialog(`🔥 LEVEL ${nextLevel} dimulai! Lebih sulit sekarang!`);
      } else {
        setGameFinished(true);
        setDialog("🏆 Kamu menyelesaikan semua level!");
      }
    }
  }, [score]);

  // ======================
  // DROP LOGIC
  // ======================
  const handleDrop = (food, basketType) => {
    if (food.type === basketType) {
      setScore((prev) => prev + 20);
      setMessage("✅ Benar!");

      setDialog(`Hebat! ${food.name} pilihan tepat! 🎉`);

      const updated = foodList.filter((item) => item.id !== food.id);
      setFoodList(updated);

    } else {
      setMessage("❌ Salah!");

      // LEVEL 3 lebih sulit
      if (level === 3) {
        setLives((prev) => prev - 2);
      } else {
        setLives((prev) => prev - 1);
      }

      setDialog(`${food.name} tidak baik jika terlalu sering.`);
    }
  };

  // ======================
  // STAR RATING
  // ======================
  const getStars = () => {
    if (score >= 250) return "⭐⭐⭐";
    if (score >= 150) return "⭐⭐";
    if (score >= 80) return "⭐";
    return "😢";
  };

  // ======================
  // UI
  // ======================
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-green-50 p-8">

      {/* HEADER */}
      <h1 className="text-5xl font-bold text-center text-green-700">
        🌳 Petualangan Jenny
      </h1>

      <p className="text-center mt-3 text-xl font-bold">
        Level {level} / 3
      </p>

      {/* JENNY */}
      <div className="max-w-4xl mx-auto">
        <JennyDialog message={dialog} />
      </div>

      {/* STATUS */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mt-6">

        <div className="text-3xl">
          {"❤️".repeat(lives)}
          {"🩶".repeat(3 - lives)}
        </div>

        <div className="font-bold text-xl">
          ⭐ Skor : {score}
        </div>
      </div>

      {/* PROGRESS */}
      <div className="max-w-4xl mx-auto mt-5">

        <div className="flex justify-between mb-2">
          <span>Progress Level</span>
          <span>{timeLeft} detik</span>
        </div>

        <div className="bg-gray-300 rounded-full h-5">

          <div
            className="bg-green-500 h-5 rounded-full transition-all duration-500"
            style={{
              width: `${
                (foodList.length / levelConfig[level].foodCount) * 100
              }%`,
            }}
          />
        </div>
      </div>

      {/* FOOD */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-10">

        {foodList.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}

      </div>

      {/* BASKET */}
      <div className="grid md:grid-cols-2 gap-10 mt-12">

        <Basket
          title="🟢 Energi Baik"
          color="border-green-500"
          onDropFood={(food) => handleDrop(food, "healthy")}
        />

        <Basket
          title="🔴 Jarang Dimakan"
          color="border-red-500"
          onDropFood={(food) => handleDrop(food, "unhealthy")}
        />
      </div>

      {/* MESSAGE */}
      <div className="text-center mt-8">
        <h2 className="text-3xl font-bold">{message}</h2>
        <p className="text-lg mt-3">
          Sisa makanan : {foodList.length}
        </p>
      </div>

      {/* GAME OVER */}
      {gameFinished && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white rounded-3xl p-10 w-[500px] shadow-2xl text-center">

            <h1 className="text-6xl">🎉</h1>

            <h2 className="text-3xl font-bold mt-4">
              Game Selesai
            </h2>

            <p className="mt-4 text-gray-600">
              Terima kasih sudah membantu Jenny!
            </p>

            <div className="mt-6 text-5xl">
              {getStars()}
            </div>

            <div className="mt-6 text-2xl font-bold">
              Score: {score}
            </div>

            <button
              onClick={() => window.location.reload()}
              className="mt-8 w-full bg-green-600 text-white py-3 rounded-xl"
            >
              🔄 Main Lagi
            </button>

            <button
              onClick={() => navigate("/landing-page")}
              className="mt-3 w-full border border-green-600 text-green-600 py-3 rounded-xl"
            >
              🏠 Beranda
            </button>

          </div>
        </div>
      )}

    </div>
  );
}