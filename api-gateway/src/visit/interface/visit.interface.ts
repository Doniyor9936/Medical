import { CreateVisitDto } from "../dto/create-visit.dto";
import { UpdateVisitDto } from "../dto/update-visit.dto";

export interface Visit {
  id: string;          
  patient_id: string;
  visit_date: string; 
}

export interface VisitResponse {
  message: string; 
  visit: Visit;      
}

export interface VisitsResponse {
  message: string;  
  visits: Visit[];    
}

export interface UpdateVisitResponse {
  message: string;    
}

export interface DeleteVisitResponse {
  message: string;    
}
export interface VisitServiceGrpc {
  CreateVisit(data: CreateVisitDto): Promise<VisitResponse>; 
  GetVisit(data: { id: string }): Promise<VisitResponse>;   
  GetAllVisits(data: {}): Promise<VisitsResponse>;           
  UpdateVisit(data: { id: string } & UpdateVisitDto): Promise<UpdateVisitResponse>; 
  DeleteVisit(data: { id: string }): Promise<DeleteVisitResponse>;
}
