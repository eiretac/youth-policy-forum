import { defineField, defineType } from 'sanity';

export const commentType = defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'post' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true, // Make createdAt read-only
    }),
  ],
  preview: {
    select: {
      name: 'name',
      comment: 'comment',
      post: 'post.title',
      approved: 'approved',
    },
    prepare({ name, comment, post, approved }) {
      return {
        title: `${name} on ${post || 'Unknown Post'}`,
        subtitle: comment,
        // Optionally add an icon based on approval status
        // media: approved ? approvedIcon : pendingIcon
      };
    },
  },
}); 