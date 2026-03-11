import { Heart, Users, BookOpen, Award } from 'lucide-react';

const teamMembers = [
  {
    name: 'Lauren Wilson',
    role: 'Head Chef & Founder',
    bio: 'With over 15 years of culinary experience, Lauren founded RecipeBox to share her passion for home cooking with the world. She believes every meal tells a story.',
    color: 'bg-amber-200',
  },
  {
    name: 'Marcus Chen',
    role: 'Recipe Curator',
    bio: 'Marcus travels the globe in search of authentic flavors and traditional techniques. His specialty is adapting international recipes for the home kitchen.',
    color: 'bg-green-200',
  },
  {
    name: 'Sofia Ramirez',
    role: 'Pastry Specialist',
    bio: 'A classically trained pastry chef, Sofia brings precision and creativity to every dessert recipe. Her croissant tutorial is our most-saved recipe.',
    color: 'bg-pink-200',
  },
  {
    name: 'James Okafor',
    role: 'Nutrition Advisor',
    bio: 'James ensures every recipe comes with balanced nutritional insights. He is passionate about making healthy eating accessible and delicious for everyone.',
    color: 'bg-blue-200',
  },
  {
    name: 'Emily Tanaka',
    role: 'Food Photographer',
    bio: 'Emily captures the beauty of every dish with her camera. Her philosophy: if it looks good enough to eat on screen, the recipe has done its job.',
    color: 'bg-orange-200',
  },
  {
    name: 'David Moreau',
    role: 'Community Manager',
    bio: 'David keeps our community vibrant and welcoming. He organizes virtual cook-alongs and makes sure every home chef feels right at home in RecipeBox.',
    color: 'bg-amber-200',
  },
];

const stats = [
  { icon: BookOpen, label: 'Recipes', value: '2,500+' },
  { icon: Users, label: 'Home Chefs', value: '18,000+' },
  { icon: Heart, label: 'Recipes Saved', value: '120,000+' },
  { icon: Award, label: 'Awards', value: '12' },
];

export function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          About RecipeBox
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          RecipeBox was born from a simple idea: everyone deserves access to
          great recipes that are easy to follow, beautifully presented, and
          tested by real home cooks. We are a team of food lovers building the
          kitchen companion we always wished we had.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center"
          >
            <stat.icon className="w-6 h-6 text-amber-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Mission */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <div className="space-y-4 text-gray-600">
          <p>
            We believe cooking at home should be joyful, not stressful. Our
            mission is to empower every person to cook with confidence by
            providing clear, reliable recipes alongside a supportive community of
            fellow food enthusiasts.
          </p>
          <p>
            Every recipe in RecipeBox is tested multiple times in real home
            kitchens before it goes live. We focus on honest ingredient lists,
            realistic prep times, and step-by-step instructions that leave
            nothing to guesswork.
          </p>
          <p>
            Whether you are a beginner learning to boil pasta or an experienced
            cook exploring fermentation, RecipeBox has something for you. Welcome
            to the kitchen.
          </p>
        </div>
      </div>

      {/* Team */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className={`${member.color} h-32 flex items-center justify-center`}>
                <span className="text-4xl font-bold text-white/80">
                  {member.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-sm text-amber-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-gray-500">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Join Our Community
        </h2>
        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
          Start sharing your favorite recipes and discover new ones from home
          chefs around the world.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
        >
          Browse Recipes
        </a>
      </div>
    </div>
  );
}
