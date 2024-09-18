export class NoteRepository {
  private id: string;
  private content: string;
  private createdAt: string;
  private importance: number;

  constructor(
    id: string,
    content: string,
    createdAt: string,
    importance: number,
  ) {
    this.setId(id);
    this.setContent(content);
    this.setCreatedAt(createdAt);
    this.setImportance(importance);
  }

  getId() {
    return this.id;
  }

  getContent() {
    return this.content;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getImportance() {
    return this.importance;
  }

  private setId(id: string): void {
    this.id = id;
  }

  private setContent(content: string) {
    this.content = content;
  }

  private setCreatedAt(createdAt: string) {
    this.createdAt = createdAt;
  }

  private setImportance(importance: number) {
    this.importance = importance;
  }
}
