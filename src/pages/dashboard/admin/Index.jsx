import React from "react";
import { getAllUsers } from "../../../lib/admin/users/usersAPI";
import useSWR from "swr";
import { useAuth } from "../../../hooks/auth/useAuth";
import { jwtDecode } from "jwt-decode";
import { token } from "../../../lib/auth/authAPI";
import { getInstitutions } from "../../../lib/institutionsAPI";

const Index = () => {
  const { accessToken, setAccessToken, user, setUser } = useAuth();

  const users = async () => {
    const response = await getAllUsers(accessToken);
    return response.data;
  };

  const institutions = async () => {
    const response = await getInstitutions();
    return response.data;
  };

  const { data: dataUsers, isLoading: isLoadingUsers } = useSWR("users", users);
  const { data: dataInstitutions, isLoading: isLoadingInstitutions } = useSWR(
    "institutions",
    institutions
  );

  const getRoleCounts = (users) => {
    const counts = {};
    users.forEach((user) => {
      const role = user.role?.name;
      if (role && role !== "admin") {
        counts[role] = (counts[role] || 0) + 1;
      }
    });
    return counts;
  };

  const roleCounts = React.useMemo(() => {
    if (!dataUsers?.users) return { labels: [], series: [] };
    const counts = getRoleCounts(dataUsers.users);
    return {
      labels: Object.keys(counts),
      series: Object.values(counts),
    };
  }, [dataUsers]);

  const getInstitutionTypeCounts = (institutions) => {
    const counts = {};
    institutions.forEach((inst) => {
      const type = inst.institution_type?.name;
      if (type) {
        counts[type] = (counts[type] || 0) + 1;
      }
    });
    return counts;
  };

  const institutionTypeCounts = React.useMemo(() => {
    if (!dataInstitutions?.institutions) return { labels: [], series: [] };
    const counts = getInstitutionTypeCounts(dataInstitutions.institutions);
    return {
      labels: Object.keys(counts),
      series: Object.values(counts),
    };
  }, [dataInstitutions]);

  const userRoleLabelMap = {
    parent: "Orang Tua",
    school: "Sekolah",
    teacher: "Guru",
    healthcare: "Puskesmas",
  };

  const institutionTypeLabelMap = {
    School: "Sekolah",
    HealthCare: "Puskesmas",
  };

  React.useEffect(() => {
    if (isLoadingUsers || !roleCounts.series.length) return;

    const chartRoleLabels = roleCounts.labels.map(
      (label) => userRoleLabelMap[label] || label
    );

    buildChart(
      "#hs-doughnut-chart",
      (mode) => ({
        chart: {
          height: 230,
          width: 230,
          type: "donut",
          zoom: { enabled: false },
        },
        plotOptions: { pie: { donut: { size: "76%" } } },
        series: roleCounts.series,
        labels: chartRoleLabels,
        legend: { show: false },
        dataLabels: { enabled: false },
        stroke: { width: 5 },
        grid: { padding: { top: -12, bottom: -11, left: -12, right: -12 } },
        states: { hover: { filter: { type: "none" } } },
        tooltip: {
          enabled: true,
          custom: function (props) {
            return buildTooltipForDonut(
              props,
              mode === "dark"
                ? ["#000", "#000", "#000", "#000"]
                : ["#fff", "#fff", "#fff", "#fff"]
            );
          },
        },
      }),
      {
        colors: ["#3b82f6", "#22d3ee", "#f59e42", "#a855f7"],
        stroke: { colors: ["rgb(255, 255, 255)"] },
      },
      {
        colors: ["#3b82f6", "#22d3ee", "#f59e42", "#a855f7"],
        stroke: { colors: ["rgb(38, 38, 38)"] },
      }
    );
  }, [roleCounts, isLoadingUsers]);

  React.useEffect(() => {
    if (isLoadingInstitutions || !institutionTypeCounts.series.length) return;

    const chartInstitutionLabels = institutionTypeCounts.labels.map(
      (label) => institutionTypeLabelMap[label] || label
    );

    buildChart(
      "#hs-doughnut-chart-institutions",
      (mode) => ({
        chart: {
          height: 230,
          width: 230,
          type: "donut",
          zoom: { enabled: false },
        },
        plotOptions: { pie: { donut: { size: "76%" } } },
        series: institutionTypeCounts.series,
        labels: chartInstitutionLabels,
        legend: { show: false },
        dataLabels: { enabled: false },
        stroke: { width: 5 },
        grid: { padding: { top: -12, bottom: -11, left: -12, right: -12 } },
        states: { hover: { filter: { type: "none" } } },
        tooltip: {
          enabled: true,
          custom: function (props) {
            return buildTooltipForDonut(
              props,
              mode === "dark"
                ? ["#000", "#000", "#000"]
                : ["#fff", "#fff", "#fff"]
            );
          },
        },
      }),
      {
        colors: ["#3b82f6", "#22d3ee", "#e5e7eb", "#f59e42"],
        stroke: { colors: ["rgb(255, 255, 255)"] },
      },
      {
        colors: ["#3b82f6", "#22d3ee", "#404040", "#f59e42"],
        stroke: { colors: ["rgb(38, 38, 38)"] },
      }
    );
  }, [institutionTypeCounts, isLoadingInstitutions]);

  const updateToken = async () => {
    const currentTime = new Date().getTime();

    if (user?.exp * 1000 < currentTime) {
      const response = await token();
      setAccessToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setUser(decoded);
    }
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      if (user?.exp * 1000 < currentTime) {
        updateToken();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [user]);

  return (
    <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
      <div className="p-4 md:p-5 min-h-102.5 flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div>
            <h2 className="text-sm text-gray-500">Total Users</h2>
            <p className="text-xl sm:text-2xl font-medium text-gray-800">
              {isLoadingUsers
                ? "0"
                : dataUsers?.users?.filter(
                    (user) => user.role?.name !== "admin"
                  ).length ?? 0}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div id="hs-doughnut-chart">
            {isLoadingUsers && <div>Loading chart...</div>}
          </div>
          {!isLoadingUsers && (
            <div className="flex justify-center sm:justify-end items-center gap-x-4 mt-3 sm:mt-6">
              {roleCounts.labels.map((label, idx) => (
                <div className="inline-flex items-center" key={label}>
                  <span
                    className={`size-2.5 inline-block rounded-sm me-2`}
                    style={{
                      backgroundColor: [
                        "#3b82f6",
                        "#22d3ee",
                        "#f59e42",
                        "#a855f7",
                      ][idx % 4],
                    }}
                  ></span>
                  <span className="text-[13px] text-gray-600">
                    {userRoleLabelMap[label] || label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 md:p-5 min-h-102.5 flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div>
            <h2 className="text-sm text-gray-500">Total Instansi</h2>
            <p className="text-xl sm:text-2xl font-medium text-gray-800">
              {isLoadingInstitutions ? "0" : dataInstitutions?.totalRows}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div id="hs-doughnut-chart-institutions">
            {isLoadingInstitutions && <div>Loading chart...</div>}
          </div>
          {!isLoadingInstitutions && (
            <div className="flex justify-center sm:justify-end items-center gap-x-4 mt-3 sm:mt-6">
              {institutionTypeCounts.labels.map((label, idx) => (
                <div className="inline-flex items-center" key={label}>
                  <span
                    className={`size-2.5 inline-block rounded-sm me-2`}
                    style={{
                      backgroundColor: [
                        "#3b82f6",
                        "#22d3ee",
                        "#e5e7eb",
                        "#f59e42",
                      ][idx % 4],
                    }}
                  ></span>
                  <span className="text-[13px] text-gray-600">
                    {institutionTypeLabelMap[label] || label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
