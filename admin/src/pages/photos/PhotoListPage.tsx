import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "../../components/ui/Modal";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { usePagination } from "../../hooks/usePagination";
import { useCrudOperations } from "../../hooks/useCrudOperations";
import { photoApi } from "../../api/endpoints";
import type { Photo } from "../../api/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

const schema = z.object({
  key: z.string().min(1, "Key obrigatoria"),
  provider: z.string().min(1, "Provider obrigatorio"),
  url: z.string().optional(),
  active: z.boolean().optional(),
});
type FormData = z.infer<typeof schema>;

export function PhotoListPage() {
  const { page, setPage } = usePagination();
  const { listQuery, addMutation, deleteMutation } =
    useCrudOperations<Photo>("photos", photoApi, page);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Photo | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const items = listQuery.data
    ? (Object.values(listQuery.data).find(Array.isArray) as Photo[] ?? [])
    : [];
  const total = listQuery.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / 10));

  const openCreate = () => {
    reset({ key: "", provider: "s3", url: "", active: true });
    setModalOpen(true);
  };

  const onSubmit = async (data: FormData) => {
    await addMutation.mutateAsync(data as Partial<Photo>);
    setModalOpen(false);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Fotos</h1>
        <button onClick={openCreate} className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
          <Plus size={16} /> Nova Foto
        </button>
      </div>

      {listQuery.isLoading ? (
        <p className="text-gray-400">Carregando...</p>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center text-gray-400">
          Nenhuma foto encontrada
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.map((photo) => (
              <div key={photo._id} className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white">
                {photo.url ? (
                  <img
                    src={photo.url}
                    alt={photo.key}
                    className="h-48 w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-48 items-center justify-center bg-gray-100 text-sm text-gray-400">
                    Sem preview
                  </div>
                )}
                <div className="p-3">
                  <p className="truncate text-sm font-medium text-gray-700">{photo.key}</p>
                  <p className="text-xs text-gray-400">{photo.provider}</p>
                </div>
                <button
                  onClick={() => setDeleteTarget(photo)}
                  className="absolute top-2 right-2 rounded-lg bg-white/80 p-1.5 text-red-500 opacity-0 shadow transition-opacity group-hover:opacity-100 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3">
            <span className="text-sm text-gray-500">{total} foto{total !== 1 ? "s" : ""}</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(page - 1)} disabled={page <= 1} className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-30">
                <ChevronLeft size={18} />
              </button>
              <span className="text-sm text-gray-600">{page} / {totalPages}</span>
              <button onClick={() => setPage(page + 1)} disabled={page >= totalPages} className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-30">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nova Foto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Key (caminho)</label>
            <input {...register("key")} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            {errors.key && <p className="mt-1 text-xs text-red-500">{errors.key.message}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Provider</label>
            <input {...register("provider")} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            {errors.provider && <p className="mt-1 text-xs text-red-500">{errors.provider.message}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">URL</label>
            <input {...register("url")} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" {...register("active")} id="photo-active" className="rounded" />
            <label htmlFor="photo-active" className="text-sm text-gray-700">Ativo</label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancelar</button>
            <button type="submit" disabled={addMutation.isPending} className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50">
              {addMutation.isPending ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={async () => { if (deleteTarget) { await deleteMutation.mutateAsync(deleteTarget._id); setDeleteTarget(null); } }}
        title="Excluir Foto"
        message={`Deseja excluir a foto "${deleteTarget?.key}"?`}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
