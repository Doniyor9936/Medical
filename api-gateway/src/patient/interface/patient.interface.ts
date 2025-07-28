export interface Patient {
  id: string;
  name: string;
  dob: string;
  doctor_id: string;
}

export interface CreatePatientDto {
  name: string;
  dob: string;
  doctor_id: string;
}

export interface UpdatePatientDto {
  name?: string;
  dob?: string;
  doctor_id?: string;
}

export interface PatientServiceGrpc {
  CreatePatient(data: CreatePatientDto): Promise<{ patient: Patient }>;
  FindPatient(data: { id: string }): Promise<{ patient: Patient }>;
  FindAllPatientsByDoctor(data: { doctor_id: string }): Promise<{ patients: Patient[] }>;
  UpdatePatient(data: { id: string } & UpdatePatientDto): Promise<{ message: string }>;
  RemovePatient(data: { id: string }): Promise<{ message: string }>;
}
