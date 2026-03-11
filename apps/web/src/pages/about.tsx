import { Heart, Users, ChefHat, Utensils } from 'lucide-react';

const teamMembers = [
  {
    name: 'Maria Silva',
    role: 'Head Chef & Fundadora',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    name: 'João Santos',
    role: 'Desenvolvedor & Foodie',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    name: 'Ana Costa',
    role: 'Designer & Confeiteira',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
];

const values = [
  {
    icon: Heart,
    title: 'Feito com amor',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur.',
  },
  {
    icon: Users,
    title: 'Comunidade',
    description:
      'Nullam quis risus eget urna mollis ornare vel eu leo. Cras mattis consectetur purus sit amet fermentum.',
  },
  {
    icon: ChefHat,
    title: 'Qualidade',
    description:
      'Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Maecenas faucibus mollis interdum.',
  },
  {
    icon: Utensils,
    title: 'Simplicidade',
    description:
      'Vestibulum id ligula porta felis euismod semper. Aenean lacinia bibendum nulla sed consectetur.',
  },
];

export function AboutPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Sobre o RecipeBox
        </h1>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
          ex ea commodo consequat.
        </p>
      </div>

      {/* Values Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 text-center mb-6">
          Nossos Valores
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-4">
                <value.icon className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 text-center mb-6">
          Nosso Time
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="w-20 h-20 bg-amber-200 rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="text-sm text-amber-600 font-medium mb-3">
                {member.role}
              </p>
              <p className="text-sm text-gray-600">{member.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Junte-se a nós
        </h2>
        <p className="text-sm text-gray-600 mb-6 max-w-xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          posuere erat a ante venenatis dapibus posuere velit aliquet.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Explorar Receitas
        </a>
      </div>
    </div>
  );
}
