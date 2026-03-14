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
import { serviceApi } from "../../api/endpoints";
import type { Service } from "../../api/types";

const schema = z.object({
  name: z.string().min(1, "Nome obrigatorio"),
  categoryId: z.string().min(1, "Categoria obrigatoria"),
  duration: z.coerce.number().min(1, "Duracao obrigatoria"),
  description: z.string().optional(),
  price: z.coerce.number().optional(),
  promotionalPrice: z.coerce.number().optional(),
  havePromotionalPrice: z.boolean().optional(),
  comission: z.coerce.number().optional(),
  active: z.boolean().optional(),
});
type FormData = z.infer<typeof schema>;

export function ServiceListPage() {
  const { page, setPage } = usePagination();
  const { listQuery, addMutation, updateMutation, deleteMutation } =
    useCrudOperations<Service>("services", serviceApi, page);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const items = listQuery.data
    ? (Object.values(listQuery.data).find(Array.isArray) as Service[] ?? [])
    : [];
  const total = listQuery.data?.total ?? 0;

  const openCreate = () => {
    setEditing(null);
    reset({ name: "", categoryId: "", duration: 30, description: "", price: 0, active: true });
    setModalOpen(true);
  };

  const openEdit = (item: Service) => {
    setEditing(item);
    reset({
      name: item.name,
      categoryId: item.categoryId,
      duration: item.duration,
      description: item.description ?? "",
      price: item.price ?? 0,
      promotionalPrice: item.promotionalPrice ?? 0,
      havePromotionalPrice: item.havePromotionalPrice ?? false,
      comission: item.comission ?? 0,
      active: item.active,
    });
    setModalOpen(true);
  };

  const onSubmit = async (data: FormData) => {
    if (editing) {
      await updateMutation.mutateAsync({ id: editing._id, data });
    } else {
      await addMutation.mutateAsync(data as Partial<Service>);
    }
    setModalOpen(false);
  };

  const formatCurrency = (v?: number) =>
    v != null ? `R$ ${v.toFixed(2)}` : "-";

  const columns: Column<Service>[] = [
    { key: "name", label: "Nome" },
    { key: "duration", label: "Duracao (min)" },
    { key: "price", label: "Preco", render: (i) => formatCurrency(i.price) },
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
        <h1 className="text-2xl font-bold text-gray-900">Servicos</h1>
        <button onClick={openCreate} className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
          <Plus size={16} /> Novo Servico
        </button>
      </div>

      <DataTable columns={columns} data={items} page={page} total={total} onPageChange={setPage} isLoading={listQuery.isLoading} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Editar Servico" : "Novo Servico"} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Nome</label>
              <input {...register("name")} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">ID da Categoria</label>
              <input {...register("categoryId")} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
              {errors.categoryId && <p className="mt-1 text-xs text-red-500">{errors.categoryId.message}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Duracao (min)</label>
              <input type="number" {...register("duration")} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
              {errors.duration && <p className="mt-1 text-xs text-red-500">{errors.duration.message}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Preco (R$)</label>
              <input type="number" step="0.01" {...register("price")} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Preco Promocional (R$)</label>
              <input type="number" step="0.01" {...register("promotionalPrice")} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Comissao (%)</label>
              <input type="number" step="0.01" {...register("comission")} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Descricao</label>
            <textarea {...register("description")} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" {...register("havePromotionalPrice")} className="rounded" /> Preco promocional ativo
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
        title="Excluir Servico"
        message={`Deseja excluir o servico "${deleteTarget?.name}"?`}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
