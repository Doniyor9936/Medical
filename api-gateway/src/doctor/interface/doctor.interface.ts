export interface CreateDoctorDto {
  name: string;
  email: string;
}

export interface UpdateDoctorDto {
  id: string;
  name?: string;
  email?: string;
}

export interface DoctorById {
  id: string;
}

export interface DoctorResponse {
  id: string;
  name: string;
  email: string;
  message: string;
}

export interface DoctorList {
  doctors: DoctorResponse[];
  message: string;
}

export interface DeleteResponse {
  message: string;
}

export interface DoctorServiceGrpc {
  CreateDoctor(data: CreateDoctorDto): Promise<DoctorResponse>;
  FindDoctor(data: DoctorById): Promise<DoctorResponse>;
  GetAllDoctors(data: {}): Promise<DoctorList>;
  UpdateDoctor(data: UpdateDoctorDto): Promise<DoctorResponse>;
  DeleteDoctor(data: DoctorById): Promise<DeleteResponse>;
}
