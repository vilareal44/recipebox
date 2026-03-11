import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    detail: 'contato@recipebox.com',
    description: 'Respondemos em até 24 horas',
  },
  {
    icon: Phone,
    title: 'Telefone',
    detail: '(11) 99999-8888',
    description: 'Seg a Sex, 9h às 18h',
  },
  {
    icon: MapPin,
    title: 'Endereço',
    detail: 'Rua das Receitas, 123',
    description: 'São Paulo, SP - 01234-567',
  },
  {
    icon: Clock,
    title: 'Horário',
    detail: 'Seg a Sex, 9h - 18h',
    description: 'Sáb, 10h - 14h',
  },
];

const inputClass =
  'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent';

export function ContactPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Entre em Contato
        </h1>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactInfo.map((info) => (
          <div
            key={info.title}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-4">
              <info.icon className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {info.title}
            </h3>
            <p className="text-sm font-medium text-amber-600 mb-1">
              {info.detail}
            </p>
            <p className="text-sm text-gray-500">{info.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Envie uma Mensagem
          </h2>
          <form
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  placeholder="Lorem Ipsum"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="lorem@ipsum.com"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assunto
              </label>
              <input
                type="text"
                placeholder="Lorem ipsum dolor sit amet"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mensagem
              </label>
              <textarea
                rows={5}
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              <Send className="w-4 h-4" />
              Enviar Mensagem
            </button>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Perguntas Frequentes
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Como posso adicionar uma receita?
              </h3>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                quis risus eget urna mollis ornare vel eu leo.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Posso editar receitas de outros usuários?
              </h3>
              <p className="text-sm text-gray-600">
                Praesent commodo cursus magna, vel scelerisque nisl consectetur
                et. Vivamus sagittis lacus vel augue laoreet rutrum.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Como funciona o sistema de categorias?
              </h3>
              <p className="text-sm text-gray-600">
                Cras mattis consectetur purus sit amet fermentum. Donec
                ullamcorper nulla non metus auctor fringilla.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                O RecipeBox é gratuito?
              </h3>
              <p className="text-sm text-gray-600">
                Maecenas sed diam eget risus varius blandit sit amet non magna.
                Integer posuere erat a ante venenatis dapibus.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Como reportar um problema?
              </h3>
              <p className="text-sm text-gray-600">
                Aenean lacinia bibendum nulla sed consectetur. Duis mollis, est
                non commodo luctus, nisi erat porttitor ligula.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
