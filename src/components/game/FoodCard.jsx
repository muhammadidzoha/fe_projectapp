export default function FoodCard({ food }) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("food", JSON.stringify(food));
      }}
      className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center cursor-grab active:cursor-grabbing hover:scale-105 transition"
    >
      <div className="text-6xl">
        {food.emoji}
      </div>

      <h2 className="mt-3 font-bold">
        {food.name}
      </h2>
    </div>
  );
}