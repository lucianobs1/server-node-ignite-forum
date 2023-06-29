import { Slug } from './value-objects/slug';
import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import dayjs from 'dayjs';

export interface QuestionProps {
  authorId: UniqueEntityId;
  bestAnswerId?: UniqueEntityId;
  title: string;
  content: string;
  slug: Slug;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
  get authorId() {
    return this.props.authorId;
  }
  get title() {
    return this.props.title;
  }
  get slug() {
    return this.props.slug;
  }
  get bestAnswerId() {
    return this.props.bestAnswerId;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3;
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...');
  }

  set content(content: string) {
    this.content = content;
    this.touch();
  }

  set title(title: string) {
    this.title = title;
    this.props.slug = Slug.createFromText(title);
    this.touch();
  }

  set bestAnswerId(bestAnswerId: UniqueEntityId | undefined) {
    this.bestAnswerId = bestAnswerId;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityId
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: new Date(),
      },
      id
    );

    return question;
  }
}