import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';

interface Resource {
  id: string;
  title: string;
  type: string;
  category: string;
  year: string;
  fileName: string;
  fileSize?: string;
  fileType: 'pdf' | 'doc' | 'docx';
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Lebanon: a Path to Peace',
    type: 'Resolution',
    category: 'International Relations',
    year: '2024',
    fileName: 'lebanon-path-to-peace.pdf',
    fileSize: '2.1 MB',
    fileType: 'pdf',
  },
  {
    id: '2',
    title: 'Single integrated market in North Africa',
    type: 'Resolution',
    category: 'Economics',
    year: '2025',
    fileName: 'north-africa-market.pdf',
    fileSize: '1.8 MB',
    fileType: 'pdf',
  },
  {
    id: '3',
    title: 'Addressing Regional Energy Inequalities in Europe',
    type: 'Resolution',
    category: 'Energy',
    year: '2025',
    fileName: 'addressing-energy-inequalities.pdf',
    fileType: 'pdf',
  },
  {
    id: '4',
    title: 'Protecting European Interests in the Arctic Region',
    type: 'Resolution',
    category: 'Environment',
    year: '2025',
    fileName: 'protecting-european-interests.pdf',
    fileType: 'pdf',
  },
  {
    id: '5',
    title: 'A New EU Strategy for the Sahel Region',
    type: 'Resolution',
    category: 'International Relations',
    year: '2025',
    fileName: 'new-eu-strategy-sahel.pdf',
    fileType: 'pdf',
  },
  {
    id: '6',
    title: 'Making Europe more energy sovereign through the expansion of renewable energy production',
    type: 'Resolution',
    category: 'Energy',
    year: '2025',
    fileName: 'renewable-energy-expansion.pdf',
    fileType: 'pdf',
  },
];

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear = !selectedYear || resource.year === selectedYear;
    const matchesCategory = !selectedCategory || resource.category === selectedCategory;
    const matchesType = !selectedType || resource.type === selectedType;
    return matchesSearch && matchesYear && matchesCategory && matchesType;
  });

  const years = Array.from(new Set(resources.map((r) => r.year)));
  const categories = Array.from(new Set(resources.map((r) => r.category)));
  const types = Array.from(new Set(resources.map((r) => r.type)));

  const handleDownload = async (resource: Resource) => {
    try {
      setDownloadingId(resource.id);
      const response = await fetch(`/resources/${resource.fileName}`);
      
      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = resource.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download the file. Please try again later.');
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-primary py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white mb-4"
            >
              Resources
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/90"
            >
              Explore our political documents
            </motion.p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap gap-4 mb-8">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-primary focus:outline-none focus:ring-2 focus:ring-secondary/50"
            >
              <option value="">Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-primary focus:outline-none focus:ring-2 focus:ring-secondary/50"
            >
              <option value="">Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-primary focus:outline-none focus:ring-2 focus:ring-secondary/50"
            >
              <option value="">Type</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <div className="flex-grow">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-primary focus:outline-none focus:ring-2 focus:ring-secondary/50"
              />
            </div>
          </div>

          {/* Resources List */}
          <div className="space-y-4">
            {filteredResources.map((resource) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-secondary/10 hover:bg-secondary/20 transition-colors rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex-grow">
                  <h3 className="text-lg font-medium text-primary">{resource.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {resource.fileType.toUpperCase()} • {resource.fileSize}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-accent text-white text-sm rounded-full">
                    {resource.type}
                  </span>
                  <span className="text-primary">{resource.year}</span>
                  <button
                    onClick={() => handleDownload(resource)}
                    disabled={downloadingId === resource.id}
                    className="text-secondary hover:text-secondary-700 transition-colors disabled:opacity-50"
                  >
                    {downloadingId === resource.id ? (
                      <svg
                        className="animate-spin h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
} 