import { useState } from "react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DataTable, type Column } from "../../components/ui/DataTable";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { Modal } from "../../components/ui/Modal";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { usePagination } from "../../hooks/usePagination";
import { useCrudOperations } from "../../hooks/useCrudOperations";
import { ownerApi } from "../../api/endpoints";
import type { Owner } from "../../api/types";

const daysSchema = z.object({
  monday: z.boolean().optional(),
  tuesday: z.boolean().optional(),
  wednesday: z.boolean().optional(),
  thursday: z.boolean().optional(),
  friday: z.boolean().optional(),
  saturday: z.boolean().optional(),
  sunday: z.boolean().optional(),
});

const schema = z.object({
  name: z.string().min(1, "Nome obrigatorio"),
  description: z.string().optional(),
  active: z.boolean().optional(),
  haveDelivery: z.boolean().optional(),
  minimumTimeForReSchedule: z.coerce.number().optional(),
  days1: daysSchema.optional(),
  hourStart1: z.string().optional(),
  hourEnd1: z.string().optional(),
  hourLunchStart1: z.string().optional(),
  hourLunchEnd1: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

const dayLabels: Record<string, string> = {
  monday: "Seg",
  tuesday: "Ter",
  wednesday: "Qua",
  thursday: "Qui",
  friday: "Sex",
  saturday: "Sab",
  sunday: "Dom",
};

export function OwnerListPage() {
  const { page, setPage } = usePagination();
  const { listQuery, addMutation, updateMutation, deleteMutation } =
    useCrudOperations<Owner>("owners", ownerApi, page);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Owner | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Owner | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const items = listQuery.data
    ? (Object.values(listQuery.data).find(Array.isArray) as Owner[] ?? [])
    : [];
  const total = listQuery.data?.total ?? 0;

  const openCreate = () => {
    setEditing(null);
    reset({ name: "", description: "", active: true });
    setModalOpen(true);
  };

  const openEdit = (item: Owner) => {
    setEditing(item);
    reset({
      name: item.name,
      description: item.description ?? "",
      active: item.active,
      haveDelivery: item.haveDelivery ?? false,
      minimumTimeForReSchedule: item.minimumTimeForReSchedule ?? 0,
      days1: item.days1 ?? {},
      hourStart1: item.hourStart1 ?? "",
      hourEnd1: item.hourEnd1 ?? "",
      hourLunchStart1: item.hourLunchStart1 ?? "",
      hourLunchEnd1: item.hourLunchEnd1 ?? "",
    });
    setModalOpen(true);
  };

  const onSubmit = async (data: FormData) => {
    if (editing) {
      await updateMutation.mutateAsync({ id: editing._id, data });
    } else {
      await addMutation.mutateAsync(data as Partial<Owner>);
    }
    setModalOpen(false);
  };

  const columns: Column<Owner>[] = [
    { key: "name", label: "Nome" },
    { key: "description", label: "Descricao", render: (i) => i.description ?? "-" },
    { key: "appointmentsTotal", label: "Agendamentos", render: (i) => i.appointmentsTotal ?? 0 },
    { key: "active", label: "Status", render: (i) => <StatusBadge active={i.active} /> },
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
        <h1 className="text-2xl font-bold text-gray-900">Owners</h1>
        <button onClick={openCreate} className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
          <Plus size={16} /> Novo Owner
        </button>
      </div>

      <DataTable columns={columns} data={items} page={page} total={total} onPageChange={setPage} isLoading={listQuery.isLoading} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Editar Owner" : "Novo Owner"} size="xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Nome</label>
              <input {...register("name")} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Tempo minimo reagendar (min)</label>
              <input type="number" {...register("minimumTimeForReSchedule")} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Descricao</label>
            <textarea {...register("description")} rows={2} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
          </div>

          <fieldset className="rounded-lg border border-gray-200 p-4">
            <legend className="px-2 text-sm font-medium text-gray-700">Horario de Funcionamento (Slot 1)</legend>
            <div className="mb-3 flex flex-wrap gap-3">
              {(["monday","tuesday","wednesday","thursday","friday","saturday","sunday"] as const).map((day) => (
                <label key={day} className="flex items-center gap-1.5 text-sm text-gray-600">
                  <input type="checkbox" {...register(`days1.${day}`)} className="rounded" />
                  {dayLabels[day]}
                </label>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs text-gray-500">Inicio</label>
                <input type="time" {...register("hourStart1")} className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-primary-500 focus:outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">Fim</label>
                <input type="time" {...register("hourEnd1")} className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-primary-500 focus:outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">Almoco inicio</label>
                <input type="time" {...register("hourLunchStart1")} className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-primary-500 focus:outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">Almoco fim</label>
                <input type="time" {...register("hourLunchEnd1")} className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-primary-500 focus:outline-none" />
              </div>
            </div>
          </fieldset>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" {...register("haveDelivery")} className="rounded" /> Delivery
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" {...register("active")} className="rounded" /> Ativo
            </label>
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
        title="Excluir Owner"
        message={`Deseja excluir o owner "${deleteTarget?.name}"?`}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
