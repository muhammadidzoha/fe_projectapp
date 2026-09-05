import { useNavigate } from "react-router-dom";

export default function GameSection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-700">
            🌳 Petualangan Jenny
          </h2>

          <p className="text-gray-600 mt-3">
            Belajar gizi dengan cara yang menyenangkan melalui permainan interaktif.
          </p>
        </div>

        <div
          onClick={() => navigate("/game")}
          className="cursor-pointer bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 p-10 max-w-xl mx-auto"
        >
          <div className="text-7xl text-center">
            🎮
          </div>

          <h3 className="text-3xl font-bold text-center mt-5">
            Mulai Bermain
          </h3>

          <p className="text-center mt-3 text-gray-500">
            Ikuti petualangan Jenny dan selesaikan setiap chapter.
          </p>

          <button className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl">
            Main Sekarang
          </button>
        </div>

      </div>
    </section>
  );
}