// src/dtos/PostDTO.ts
export class PostDTO {
    title: string;
    content: string | null;
    published: boolean;
    authorId: number | null;

    constructor(title: string, content: string | null = null, published: boolean = false, authorId: number | null = null) {
        this.title = title;
        this.content = content;
        this.published = published;
        this.authorId = authorId;
    }

    static fromDTO(data: { title: string; content?: string | null; published?: boolean; authorId?: number | null }) {
        return new PostDTO(
            data.title,
            data.content ?? null,
            data.published ?? false,
            data.authorId ?? null
        );
    }
};
