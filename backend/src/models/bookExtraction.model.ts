export interface BookExtractionResult {
  title: string | null; // Title of the book, required
  author: string | null; // Author of the book, optional
  gradeLevel: string | null; // Grade level if educational book, optional
  subject: string | null; // Subject if educational book, optional
  series: string | null; // Series if part of a series, optional
  timestamp: number; // Optional timestamp for when the extraction was done
}
