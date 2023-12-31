import { Note } from "@prisma/client";

export type CreateNote = Omit<Note, 'id' | 'createdAt' | 'updateAt'>;

export type UpdateNote = Partial<CreateNote>;


