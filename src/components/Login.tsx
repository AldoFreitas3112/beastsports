
import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login = ({ setUser, setCurrentView }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Simular login
      if (formData.email && formData.password) {
        setUser({
          name: formData.name || formData.email.split("@")[0],
          email: formData.email,
          avatar: null
        });
        setCurrentView("home");
      }
    } else {
      // Simular cadastro
      if (formData.email && formData.password && formData.password === formData.confirmPassword) {
        setUser({
          name: formData.name,
          email: formData.email,
          avatar: null
        });
        setCurrentView("home");
      }
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 to-green-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {isLogin ? "Entrar na sua conta" : "Criar nova conta"}
              </h2>
              <p className="text-gray-600 mt-2">
                {isLogin 
                  ? "Bem-vindo de volta! Entre com suas credenciais" 
                  : "Junte-se à Beast Sports e tenha acesso a ofertas exclusivas"
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmar Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300"
              >
                {isLogin ? "Entrar" : "Criar Conta"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-gray-600">
                {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
              </span>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-green-600 hover:text-green-700 font-semibold"
              >
                {isLogin ? "Cadastre-se" : "Entrar"}
              </button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setCurrentView("home")}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Continuar sem login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
