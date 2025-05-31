
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-4">
                BEAST SPORTS
              </h3>
              <p className="text-gray-300 leading-relaxed max-w-md">
                Sua loja de equipamentos esportivos de confiança. Oferecemos produtos de alta qualidade 
                para atletas que buscam performance e estilo em cada movimento.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-green-600 transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-green-600 transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-green-600 transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-green-400">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Produtos</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Contato</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Termos de Uso</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-green-400">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">Rua do Futebol, 123<br />São Paulo, SP</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">contato@beastsports.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <hr className="border-gray-700 my-8" />
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Beast Sports. Todos os direitos reservados.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Pagamento seguro</span>
            <span className="text-gray-400 text-sm">Frete grátis acima de R$ 100</span>
            <span className="text-gray-400 text-sm">Troca em 30 dias</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
