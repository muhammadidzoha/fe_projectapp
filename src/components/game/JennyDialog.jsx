export default function JennyDialog({ message }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 flex items-center gap-5 mt-8">

      <div className="text-7xl">
        👧
      </div>

      <div>
        <h2 className="font-bold text-xl text-green-700">
          Jenny
        </h2>

        <p className="text-gray-600 mt-1">
          {message}
        </p>
      </div>

    </div>
  );
}