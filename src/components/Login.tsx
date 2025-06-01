import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

const Login = ({ setUser, setCurrentView }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    general: ""
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
        general: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
      general: ""
    };

    // Validar email
    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    // Validar senha
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    // Validar confirmação de senha (apenas no cadastro)
    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirmação de senha é obrigatória";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "As senhas não coincidem";
      }

      if (!formData.name) {
        newErrors.general = "Nome é obrigatório";
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    const hasErrors = Object.values(formErrors).some(error => error !== "");
    
    if (hasErrors) {
      setErrors(formErrors);
      return;
    }
    
    if (isLogin) {
      // Simular validação de login
      // Aqui você pode adicionar uma lista de emails/senhas válidos para teste
      const validCredentials = [
        { email: "admin@test.com", password: "123456" },
        { email: "user@test.com", password: "password" }
      ];
      
      const isValidUser = validCredentials.some(
        cred => cred.email === formData.email && cred.password === formData.password
      );
      
      if (isValidUser) {
        setUser({
          name: formData.email.split("@")[0],
          email: formData.email,
          avatar: null
        });
        setCurrentView("home");
      } else {
        setErrors({
          ...errors,
          general: "Email ou senha incorretos"
        });
      }
    } else {
      // Cadastro - simular sucesso
      setUser({
        name: formData.name,
        email: formData.email,
        avatar: null
      });
      setCurrentView("home");
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

            {/* Erro geral */}
            {errors.general && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-600">{errors.general}</span>
              </div>
            )}

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
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
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
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.password ? 'border-red-300' : 'border-gray-300'
                    }`}
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
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
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
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
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
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({ email: "", password: "", confirmPassword: "", general: "" });
                  setFormData({ name: "", email: "", password: "", confirmPassword: "" });
                }}
                className="ml-2 text-green-600 hover:text-green-700 font-semibold"
              >
                {isLogin ? "Cadastre-se" : "Entrar"}
              </button>
            </div>

            {/* Credenciais de teste para demonstração */}
            {isLogin && (
              <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-600 font-medium mb-1">Credenciais de teste:</p>
                <p className="text-xs text-blue-600">admin@test.com / 123456</p>
                <p className="text-xs text-blue-600">user@test.com / password</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
