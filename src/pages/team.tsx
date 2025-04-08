import { GetStaticProps } from 'next';
import Head from 'next/head';
import { sanityClient, urlFor } from '@/lib/sanity'; // Assuming this path is correct now
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';

// Define the structure for a team member based on the schema
interface TeamMember {
  _id: string;
  name: string;
  role: string;
  teamCategory: 'governing' | 'executive'; 
  bio?: string;
  image?: any; 
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  order?: number;
}

interface TeamPageProps {
  members: TeamMember[];
}

const TeamPage = ({ members }: TeamPageProps) => {
  const groupedMembers = members.reduce((acc, member) => {
    const category = member.teamCategory;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(member);
    return acc;
  }, {} as Record<string, TeamMember[]>);

  const categoryDisplayNames: Record<string, string> = {
    governing: 'Governing Body',
    executive: 'Executive',
  };

  const categoryOrder: (keyof typeof categoryDisplayNames)[] = ['governing', 'executive'];

  return (
    <Layout>
      <Head>
        <title>Our Team - Youth Policy Forum</title>
        <meta name="description" content="Meet the dedicated members of the Youth Policy Forum leadership." />
      </Head>

      <section className="relative bg-gradient-to-br from-primary to-secondary py-24 text-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Meet Our Team
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              The passionate individuals driving the Youth Policy Forum forward.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categoryOrder.map((categoryKey) => {
            const membersInCategory = groupedMembers[categoryKey];
            if (!membersInCategory || membersInCategory.length === 0) return null;

            return (
              <div key={categoryKey} className="mb-16">
                <h2 className="text-3xl font-bold text-primary mb-8 text-center">
                  {categoryDisplayNames[categoryKey]}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {membersInCategory.map((member, index) => (
                    <motion.div
                      key={member._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-lg shadow-md p-6 text-center transform hover:scale-105 transition-transform duration-300"
                    >
                      {member.image ? (
                        <img
                          src={urlFor(member.image).width(160).height(160).fit('crop').auto('format').url()}
                          alt={member.name}
                          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-100"
                        />
                      ) : (
                        <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center border-4 border-gray-100">
                          <span className="text-gray-500 text-4xl font-semibold">{member.name.charAt(0)}</span>
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-secondary font-medium mb-3">{member.role}</p>
                      {member.bio && (
                        <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                      )}
                      {member.socialLinks && (
                        <div className="flex justify-center space-x-4 text-gray-400">
                          {member.socialLinks.linkedin && (
                            <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-secondary">
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                              </svg>
                              <span className="sr-only">LinkedIn</span>
                            </a>
                          )}
                          {member.socialLinks.twitter && (
                            <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-secondary">
                               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                              </svg>
                              <span className="sr-only">Twitter</span>
                            </a>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const query = `*[_type == "teamMember"] | order(teamCategory asc, order asc, name asc) {
    _id,
    name,
    role,
    teamCategory,
    bio,
    image,
    socialLinks,
    order
  }`;

  const members = await sanityClient.fetch(query);

  return {
    props: {
      members,
    },
    revalidate: 60,
  };
};

export default TeamPage; 