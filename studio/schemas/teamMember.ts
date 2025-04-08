// Content copied from commit de59217 - sanity/schemaTypes/teamMember.ts
export default {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'teamCategory',
      title: 'Team Category',
      type: 'string',
      options: {
        list: [
          { title: 'Governing Body', value: 'governing' },
          { title: 'Executive', value: 'executive' },
        ],
        layout: 'radio'
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'url',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        },
        {
          name: 'github',
          title: 'GitHub',
          type: 'url',
        },
      ],
    },
    {
        name: 'order',
        title: 'Order',
        type: 'number',
        description: 'Set a number to control the display order within a category (lower numbers appear first).',
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
      category: 'teamCategory'
    },
    prepare(selection: Record<string, any>) {
      const {title, subtitle, media, category} = selection
      const categoryDisplay = category ? String(category).charAt(0).toUpperCase() + String(category).slice(1) : 'No Category'
      return {
        title: title || 'No Name',
        subtitle: `${subtitle || 'No Role'} (${categoryDisplay})`,
        media: media,
      }
    }
  },
  orderings: [
    {
      title: 'Category, then Order',
      name: 'categoryOrder',
      by: [
        {field: 'teamCategory', direction: 'asc'},
        {field: 'order', direction: 'asc'},
        {field: 'name', direction: 'asc'}
      ]
    },
    {
        title: 'Order',
        name: 'manualOrder',
        by: [
          {field: 'order', direction: 'asc'},
          {field: 'name', direction: 'asc'}
        ]
      }
  ]
}; 