export class FacultyNoteDto {
    title: string;
    content: string;
    // add any other properties that a faculty note should have
  
    constructor(title: string, content: string) {
      this.title = title;
      this.content = content;
    }
  }
  