export interface Note {
  id: string;
  visit_id: string;
  text: string;
  created_at: string;
}

export interface CreateNoteRequest {
  visit_id: string;
  text: string;
}

export interface GetNotesByVisitRequest {
  visit_id: string;
}

export interface GetNoteRequest {
  id: string;
}

export interface UpdateNoteRequest {
  id: string;
  text?: string;
}

export interface DeleteNoteRequest {
  id: string;
}

export interface NoteResponse {
  note: Note;
}

export interface NotesResponse {
  notes: Note[];
}

export interface NoteMessage {
  message: string;
}

export interface NoteServiceGrpc {
  CreateNote(data: CreateNoteRequest): Promise<NoteResponse>;
  GetNotesByVisit(data: GetNotesByVisitRequest): Promise<NotesResponse>;
  GetNote(data: GetNoteRequest): Promise<NoteResponse>;
  UpdateNote(data: UpdateNoteRequest): Promise<NoteMessage>;
  DeleteNote(data: DeleteNoteRequest): Promise<NoteMessage>;
}
