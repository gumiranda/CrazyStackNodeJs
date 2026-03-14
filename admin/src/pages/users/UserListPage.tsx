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
import { userApi } from "../../api/endpoints";
import type { User } from "../../api/types";

const schema = z.object({
  name: z.string().min(1, "Nome obrigatorio"),
  email: z.string().email("Email invalido"),
  role: z.enum(["client", "owner", "visitor", "professional", "admin"]),
  phone: z.string().optional(),
  cpf: z.string().optional(),
  active: z.boolean().optional(),
});
type FormData = z.infer<typeof schema>;

export function UserListPage() {
  const { page, setPage } = usePagination();
  const { listQuery, addMutation, updateMutation, deleteMutation } =
    useCrudOperations<User>("users", userApi, page);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const items = listQuery.data
    ? (Object.values(listQuery.data).find(Array.isArray) as User[] ?? [])
    : [];
  const total = listQuery.data?.total ?? 0;

  const openCreate = () => {
    setEditing(null);
    reset({ name: "", email: "", role: "client", phone: "", cpf: "", active: true });
    setModalOpen(true);
  };

  const openEdit = (item: User) => {
    setEditing(item);
    reset({
      name: item.name,
      email: item.email,
      role: item.role,
      phone: item.phone ?? "",
      cpf: item.cpf ?? "",
      active: item.active,
    });
    setModalOpen(true);
  };

  const onSubmit = async (data: FormData) => {
    if (editing) {
      await updateMutation.mutateAsync({ id: editing._id, data });
    } else {
      await addMutation.mutateAsync(data as Partial<User>);
    }
    setModalOpen(false);
  };

  const roleLabels: Record<string, string> = {
    admin: "Admin",
    owner: "Owner",
    professional: "Profissional",
    client: "Cliente",
    visitor: "Visitante",
  };

  const columns: Column<User>[] = [
    { key: "name", label: "Nome" },
    { key: "email", label: "Email" },
    { key: "role", label: "Perfil", render: (i) => roleLabels[i.role] ?? i.role },
    { key: "phone", label: "Telefone", render: (i) => i.phone ?? "-" },
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
        <h1 className="text-2xl font-bold text-gray-900">Usuarios</h1>
        <button onClick={openCreate} className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
          <Plus size={16} /> Novo Usuario
        </button>
      </div>

      <DataTable columns={columns} data={items} page={page} total={total} onPageChange={setPage} isLoading={listQuery.isLoading} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Editar Usuario" : "Novo Usuario"} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Nome</label>
              <input {...register("name")} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
              <input type="email" {...register("email")} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Perfil</label>
              <select {...register("role")} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none">
                <option value="client">Cliente</option>
                <option value="owner">Owner</option>
                <option value="professional">Profissional</option>
                <option value="visitor">Visitante</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Telefone</label>
              <input {...register("phone")} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">CPF</label>
              <input {...register("cpf")} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" {...register("active")} id="user-active" className="rounded" />
            <label htmlFor="user-active" className="text-sm text-gray-700">Ativo</label>
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
        title="Excluir Usuario"
        message={`Deseja excluir o usuario "${deleteTarget?.name}"?`}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
