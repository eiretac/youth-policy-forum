import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventDate',
      title: 'Event Date and Time',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'E.g., "Virtual", "Conference Room A", "123 Main St, Anytown"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      description: 'Brief description of the event.',
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
      description: '(Optional) Link to event registration page or more info.',
    }),
    defineField({
        name: 'isFeatured',
        title: 'Featured Event',
        type: 'boolean',
        description: 'Should this event be featured prominently (e.g., on the homepage)?',
        initialValue: false,
      }),
  ],
  preview: {
    select: {
      title: 'title',
      eventDate: 'eventDate',
    },
    prepare(selection) {
      const { title, eventDate } = selection
      const date = eventDate ? new Date(eventDate).toLocaleDateString() : 'No date'
      return {
        title: title,
        subtitle: date,
      }
    },
  },
}) 