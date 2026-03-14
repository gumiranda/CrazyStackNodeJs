import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { PageQuery } from "../api/types";

interface CrudApi<T> {
  loadByPage: (query: PageQuery) => Promise<{ [key: string]: T[] | number; total: number }>;
  load: (id: string) => Promise<T>;
  add: (data: Partial<T>) => Promise<T>;
  update: (id: string, data: Partial<T>) => Promise<T>;
  delete: (id: string) => Promise<unknown>;
}

export function useCrudOperations<T extends { _id: string }>(
  key: string,
  api: CrudApi<T>,
  page: number,
) {
  const qc = useQueryClient();

  const listQuery = useQuery({
    queryKey: [key, "list", page],
    queryFn: () => api.loadByPage({ page }),
  });

  const addMutation = useMutation({
    mutationFn: (data: Partial<T>) => api.add(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [key] });
      toast.success("Registro criado");
    },
    onError: () => toast.error("Erro ao criar registro"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<T> }) =>
      api.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [key] });
      toast.success("Registro atualizado");
    },
    onError: () => toast.error("Erro ao atualizar registro"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [key] });
      toast.success("Registro excluido");
    },
    onError: () => toast.error("Erro ao excluir registro"),
  });

  return { listQuery, addMutation, updateMutation, deleteMutation };
}
