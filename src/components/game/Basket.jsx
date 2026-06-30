export default function Basket({
  title,
  color,
  onDropFood,
}) {
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const food = JSON.parse(
          e.dataTransfer.getData("food")
        );

        onDropFood(food);
      }}
      className={`rounded-2xl border-4 border-dashed ${color}
      h-56 flex items-center justify-center transition hover:bg-white`}
    >
      <h2 className="text-2xl font-bold">
        {title}
      </h2>
    </div>
  );
}