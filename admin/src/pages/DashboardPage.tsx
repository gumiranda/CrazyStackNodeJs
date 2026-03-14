import { useQuery } from "@tanstack/react-query";
import {
  Users,
  Store,
  CalendarDays,
  Scissors,
  FolderTree,
  FileText,
  Image,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { StatsCard } from "../components/ui/StatsCard";
import {
  userApi,
  ownerApi,
  appointmentApi,
  serviceApi,
  categoryApi,
  requestApi,
  photoApi,
} from "../api/endpoints";
import type { Appointment } from "../api/types";

export function DashboardPage() {
  const users = useQuery({ queryKey: ["users", "count"], queryFn: () => userApi.loadByPage({ page: 1 }) });
  const owners = useQuery({ queryKey: ["owners", "count"], queryFn: () => ownerApi.loadByPage({ page: 1 }) });
  const appointments = useQuery({ queryKey: ["appointments", "count"], queryFn: () => appointmentApi.loadByPage({ page: 1 }) });
  const services = useQuery({ queryKey: ["services", "count"], queryFn: () => serviceApi.loadByPage({ page: 1 }) });
  const categories = useQuery({ queryKey: ["categories", "count"], queryFn: () => categoryApi.loadByPage({ page: 1 }) });
  const requests = useQuery({ queryKey: ["requests", "count"], queryFn: () => requestApi.loadByPage({ page: 1 }) });
  const photos = useQuery({ queryKey: ["photos", "count"], queryFn: () => photoApi.loadByPage({ page: 1 }) });

  const recentAppointments = (
    appointments.data
      ? Object.values(appointments.data).find(Array.isArray) as Appointment[] | undefined
      : undefined
  )?.slice(0, 5);

  const chartData = [
    { name: "Usuarios", total: users.data?.total ?? 0 },
    { name: "Owners", total: owners.data?.total ?? 0 },
    { name: "Agendamentos", total: appointments.data?.total ?? 0 },
    { name: "Servicos", total: services.data?.total ?? 0 },
    { name: "Categorias", total: categories.data?.total ?? 0 },
    { name: "Solicitacoes", total: requests.data?.total ?? 0 },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Dashboard</h1>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Usuarios" value={users.data?.total ?? "..."} icon={Users} color="blue" />
        <StatsCard title="Owners" value={owners.data?.total ?? "..."} icon={Store} color="green" />
        <StatsCard title="Agendamentos" value={appointments.data?.total ?? "..."} icon={CalendarDays} color="purple" />
        <StatsCard title="Servicos" value={services.data?.total ?? "..."} icon={Scissors} color="orange" />
        <StatsCard title="Categorias" value={categories.data?.total ?? "..."} icon={FolderTree} color="teal" />
        <StatsCard title="Solicitacoes" value={requests.data?.total ?? "..."} icon={FileText} color="red" />
        <StatsCard title="Fotos" value={photos.data?.total ?? "..."} icon={Image} color="pink" />
      </div>

      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Visao Geral
        </h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="total" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Agendamentos Recentes
        </h2>
        {!recentAppointments ? (
          <p className="text-sm text-gray-400">Carregando...</p>
        ) : recentAppointments.length === 0 ? (
          <p className="text-sm text-gray-400">Nenhum agendamento</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-100">
                <tr>
                  <th className="px-3 py-2 font-medium text-gray-500">Nome</th>
                  <th className="px-3 py-2 font-medium text-gray-500">Servico</th>
                  <th className="px-3 py-2 font-medium text-gray-500">Cliente</th>
                  <th className="px-3 py-2 font-medium text-gray-500">Data</th>
                  <th className="px-3 py-2 font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map((a) => (
                  <tr key={a._id} className="border-b border-gray-50 last:border-0">
                    <td className="px-3 py-2">{a.name}</td>
                    <td className="px-3 py-2">{a.serviceName ?? "-"}</td>
                    <td className="px-3 py-2">{a.clientName ?? "-"}</td>
                    <td className="px-3 py-2">
                      {a.initDate ? new Date(a.initDate).toLocaleDateString("pt-BR") : "-"}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          a.cancelled
                            ? "bg-red-50 text-red-700"
                            : "bg-green-50 text-green-700"
                        }`}
                      >
                        {a.cancelled ? "Cancelado" : "Ativo"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
