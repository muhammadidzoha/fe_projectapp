import React, { useState } from "react";

const TABLE_HEAD = [
  "Tanggal",
  "TB (cm)",
  "BB (kg)",
  "IMT",
  "Status Gizi",
  "Periode",
];

const getStatusBadge = (displayName) => {
  switch (displayName) {
    case "GIZI BAIK":
      return "bg-emerald-100 text-emerald-700";
    case "GIZI BURUK-KURANG":
      return "bg-red-100 text-red-700";
    case "OVERWEIGHT-OBESITAS":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-gray-100 text-gray-500";
  }
};

const TableNutritionHistory = ({ familyMembersData, onAddMeasurement }) => {
  const [selectedChild, setSelectedChild] = useState(null);

  const children = familyMembersData?.filter((m) => m.relation === "ANAK") ?? [];
  const activeChild = selectedChild
    ? children.find((c) => c.id === selectedChild)
    : children[0] || null;

  const measurements = activeChild?.nutrition
    ? [...activeChild.nutrition].sort(
        (a, b) => new Date(b.measurementDate) - new Date(a.measurementDate),
      )
    : [];

  return (
    <div className="flex flex-col mt-6">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
            {/* Header + Child Selector */}
            <div className="py-3 px-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-sm font-semibold text-gray-700">
                  Riwayat Pengukuran
                </h3>
                <div className="flex gap-1">
                  {children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => setSelectedChild(child.id)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                        activeChild?.id === child.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {child.fullName}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {measurements.length > 0 ? (
                    measurements.map((m) => (
                      <tr key={m.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {m.measurementDate
                            ? new Date(m.measurementDate).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {m.height ?? "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {m.weight ?? "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {m.bmi ? m.bmi.toFixed(1) : "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getStatusBadge(m.nutritionStatus?.displayName)}`}
                          >
                            {m.nutritionStatus?.displayName ?? "Tidak Terdata"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {m.monitoringPeriod?.label ?? "-"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                        <h1 className="text-gray-900 text-sm font-normal">
                          {activeChild
                            ? `Belum ada data pengukuran untuk ${activeChild.fullName}`
                            : "Tidak ada data anak"}
                        </h1>
                        {activeChild && onAddMeasurement && (
                          <button
                            onClick={() => onAddMeasurement(activeChild)}
                            className="mt-2 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700"
                          >
                            Tambah Pengukuran Pertama
                          </button>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            {measurements.length > 0 && (
              <div className="py-2 px-4 flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  Total {measurements.length}x pengukuran
                </span>
                {activeChild && onAddMeasurement && (
                  <button
                    onClick={() => onAddMeasurement(activeChild)}
                    className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700"
                  >
                    + Tambah Pengukuran
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableNutritionHistory;
