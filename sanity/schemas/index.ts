import { defineField, defineType } from 'sanity';

export const schemaTypes = [
  defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
      }),
      defineField({
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
      }),
      defineField({
        name: 'author',
        title: 'Author',
        type: 'reference',
        to: { type: 'author' },
      }),
      defineField({
        name: 'mainImage',
        title: 'Main image',
        type: 'image',
        options: {
          hotspot: true,
        },
      }),
      defineField({
        name: 'categories',
        title: 'Categories',
        type: 'array',
        of: [{ type: 'reference', to: { type: 'category' } }],
      }),
      defineField({
        name: 'publishedAt',
        title: 'Published at',
        type: 'datetime',
      }),
      defineField({
        name: 'body',
        title: 'Body',
        type: 'blockContent',
      }),
    ],
    preview: {
      select: {
        title: 'title',
        author: 'author.name',
        media: 'mainImage',
      },
      prepare(selection) {
        const { author } = selection;
        return { ...selection, subtitle: author && `by ${author}` };
      },
    },
  }),

  defineType({
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
      defineField({
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      }),
      defineField({
        name: 'bio',
        title: 'Bio',
        type: 'array',
        of: [
          {
            title: 'Block',
            type: 'block',
            styles: [{ title: 'Normal', value: 'normal' }],
            lists: [],
          },
        ],
      }),
    ],
    preview: {
      select: {
        title: 'name',
        media: 'image',
      },
    },
  }),

  defineType({
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'description',
        title: 'Description',
        type: 'text',
      }),
    ],
  }),

  defineType({
    name: 'blockContent',
    title: 'Block Content',
    type: 'array',
    of: [
      {
        title: 'Block',
        type: 'block',
        styles: [
          { title: 'Normal', value: 'normal' },
          { title: 'H1', value: 'h1' },
          { title: 'H2', value: 'h2' },
          { title: 'H3', value: 'h3' },
          { title: 'H4', value: 'h4' },
          { title: 'Quote', value: 'blockquote' },
        ],
        lists: [
          { title: 'Bullet', value: 'bullet' },
          { title: 'Number', value: 'number' },
        ],
        marks: {
          decorators: [
            { title: 'Strong', value: 'strong' },
            { title: 'Emphasis', value: 'em' },
          ],
          annotations: [
            {
              title: 'URL',
              name: 'link',
              type: 'object',
              fields: [
                {
                  title: 'URL',
                  name: 'href',
                  type: 'url',
                },
              ],
            },
          ],
        },
      },
      {
        type: 'image',
        options: { hotspot: true },
      },
    ],
  }),
]; 