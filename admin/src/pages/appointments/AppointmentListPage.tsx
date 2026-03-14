import { useState } from "react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DataTable, type Column } from "../../components/ui/DataTable";
import { Modal } from "../../components/ui/Modal";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { usePagination } from "../../hooks/usePagination";
import { useCrudOperations } from "../../hooks/useCrudOperations";
import { appointmentApi } from "../../api/endpoints";
import type { Appointment } from "../../api/types";

const schema = z.object({
  name: z.string().min(1, "Nome obrigatorio"),
  serviceId: z.string().optional(),
  ownerId: z.string().optional(),
  clientId: z.string().optional(),
  professionalId: z.string().optional(),
  createdForId: z.string().optional(),
  requestId: z.string().optional(),
  initDate: z.string().optional(),
  endDate: z.string().optional(),
  message: z.string().optional(),
  status: z.coerce.number().optional(),
  active: z.boolean().optional(),
});
type FormData = z.infer<typeof schema>;

export function AppointmentListPage() {
  const { page, setPage } = usePagination();
  const { listQuery, addMutation, updateMutation, deleteMutation } =
    useCrudOperations<Appointment>("appointments", appointmentApi, page);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Appointment | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Appointment | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const items = listQuery.data
    ? (Object.values(listQuery.data).find(Array.isArray) as Appointment[] ?? [])
    : [];
  const total = listQuery.data?.total ?? 0;

  const openCreate = () => {
    setEditing(null);
    reset({ name: "", active: true, status: 0 });
    setModalOpen(true);
  };

  const openEdit = (item: Appointment) => {
    setEditing(item);
    reset({
      name: item.name,
      serviceId: item.serviceId ?? "",
      ownerId: item.ownerId ?? "",
      clientId: item.clientId ?? "",
      professionalId: item.professionalId ?? "",
      createdForId: item.createdForId ?? "",
      requestId: item.requestId ?? "",
      initDate: item.initDate ? item.initDate.slice(0, 16) : "",
      endDate: item.endDate ? item.endDate.slice(0, 16) : "",
      message: item.message ?? "",
      status: item.status ?? 0,
      active: item.active,
    });
    setModalOpen(true);
  };

  const onSubmit = async (data: FormData) => {
    if (editing) {
      await updateMutation.mutateAsync({ id: editing._id, data });
    } else {
      await addMutation.mutateAsync(data as Partial<Appointment>);
    }
    setModalOpen(false);
  };

  const columns: Column<Appointment>[] = [
    { key: "name", label: "Nome" },
    { key: "serviceName", label: "Servico", render: (i) => i.serviceName ?? "-" },
    { key: "clientName", label: "Cliente", render: (i) => i.clientName ?? "-" },
    { key: "professionalName", label: "Profissional", render: (i) => i.professionalName ?? "-" },
    {
      key: "initDate",
      label: "Data",
      render: (i) => i.initDate ? new Date(i.initDate).toLocaleDateString("pt-BR") : "-",
    },
    {
      key: "cancelled",
      label: "Status",
      render: (i) => (
        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${i.cancelled ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
          {i.cancelled ? "Cancelado" : "Ativo"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "",
      render: (i) => (
        <div className="flex gap-2">
          <button onClick={(e) => { e.stopPropagation(); openEdit(i); }} className="text-sm text-primary-600 hover:underline">Editar</button>
          <button onClick={(e) => { e.stopPropagation(); setDeleteTarget(i); }} className="text-sm text-red-600 hover:underline">Excluir</button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Agendamentos</h1>
        <button onClick={openCreate} className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
          <Plus size={16} /> Novo Agendamento
        </button>
      </div>

      <DataTable columns={columns} data={items} page={page} total={total} onPageChange={setPage} isLoading={listQuery.isLoading} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Editar Agendamento" : "Novo Agendamento"} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Nome</label>
              <input {...register("name")} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
              <select {...register("status")} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none">
                <option value={0}>Pendente</option>
                <option value={1}>Confirmado</option>
                <option value={2}>Cancelado</option>
                <option value={3}>Concluido</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">ID Servico</label>
              <input {...register("serviceId")} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">ID Owner</label>
              <input {...register("ownerId")} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">ID Cliente</label>
              <input {...register("clientId")} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">ID Profissional</label>
              <input {...register("professionalId")} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Criado Para (ID)</label>
              <input {...register("createdForId")} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">ID Request</label>
              <input {...register("requestId")} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Data Inicio</label>
              <input type="datetime-local" {...register("initDate")} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Data Fim</label>
              <input type="datetime-local" {...register("endDate")} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Mensagem</label>
            <textarea {...register("message")} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" {...register("active")} id="appt-active" className="rounded" />
            <label htmlFor="appt-active" className="text-sm text-gray-700">Ativo</label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancelar</button>
            <button type="submit" disabled={addMutation.isPending || updateMutation.isPending} className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50">
              {addMutation.isPending || updateMutation.isPending ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={async () => { if (deleteTarget) { await deleteMutation.mutateAsync(deleteTarget._id); setDeleteTarget(null); } }}
        title="Excluir Agendamento"
        message={`Deseja excluir o agendamento "${deleteTarget?.name}"?`}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
