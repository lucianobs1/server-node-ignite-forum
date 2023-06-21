import { randomUUID } from 'node:crypto';
import { Slug } from './value-objects/slug';

interface QuestionProps {
  title: string;
  content: string;
  slug: Slug;
  authorId: string;
}

export class Question {
  public id: string;
  public title: string;
  public slug: Slug;
  public content: string;
  public authorId: string;

  constructor(props: QuestionProps, id?: string) {
    this.id = id ?? randomUUID();
    this.content = props.content;
    this.slug = props.slug;
    this.title = props.title;
    this.authorId = props.authorId;
  }
}
