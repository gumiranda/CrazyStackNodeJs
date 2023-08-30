import { LoadAppointmentRepository } from "@/slices/appointment/repositories";
import { AppointmentData } from "@/slices/appointment/entities";
import { Query } from "@/application/types";

export type LoadAppointment = (query: Query) => Promise<AppointmentData | null>;
export type LoadAppointmentSignature = (
  loadAppointment: LoadAppointmentRepository
) => LoadAppointment;
export const loadAppointment: LoadAppointmentSignature =
  (loadAppointmentRepository: LoadAppointmentRepository) => async (query: Query) => {
    return loadAppointmentRepository.loadAppointment(query);
  };
