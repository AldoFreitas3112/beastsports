
import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Login = ({ setUser, setCurrentView }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const { toast } = useToast();
  
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

  const validateForm = (isLogin) => {
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formErrors = validateForm(true);
    const hasErrors = Object.values(formErrors).some(error => error !== "");
    
    if (hasErrors) {
      setErrors(formErrors);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setErrors({
          ...errors,
          general: "Email ou senha incorretos"
        });
        toast({
          title: "Erro no login",
          description: "Verifique suas credenciais e tente novamente.",
          variant: "destructive"
        });
      } else {
        // Salvar no localStorage se "lembrar-me" estiver marcado
        if (rememberMe) {
          localStorage.setItem('rememberLogin', 'true');
          localStorage.setItem('userEmail', formData.email);
        } else {
          localStorage.removeItem('rememberLogin');
          localStorage.removeItem('userEmail');
        }

        setUser({
          name: data.user.user_metadata?.full_name || data.user.email.split("@")[0],
          email: data.user.email,
          avatar: data.user.user_metadata?.avatar_url || null
        });
        setCurrentView("home");
        
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo de volta!",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        ...errors,
        general: "Erro interno. Tente novamente mais tarde."
      });
    }
    
    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formErrors = validateForm(false);
    const hasErrors = Object.values(formErrors).some(error => error !== "");
    
    if (hasErrors) {
      setErrors(formErrors);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: formData.name,
          }
        }
      });

      if (error) {
        if (error.message.includes('already registered')) {
          setErrors({
            ...errors,
            general: "Este email já está cadastrado. Faça login ou use a opção 'Esqueci minha senha'."
          });
        } else {
          setErrors({
            ...errors,
            general: error.message
          });
        }
        toast({
          title: "Erro no cadastro",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Cadastro realizado!",
          description: "Verifique seu email para confirmar a conta.",
        });
      }
    } catch (error) {
      console.error('SignUp error:', error);
      setErrors({
        ...errors,
        general: "Erro interno. Tente novamente mais tarde."
      });
    }
    
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setErrors({
        ...errors,
        email: "Digite seu email para recuperar a senha"
      });
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${window.location.origin}/`,
      });

      if (error) {
        toast({
          title: "Erro ao enviar email",
          description: error.message,
          variant: "destructive"
        });
      } else {
        setResetEmailSent(true);
        toast({
          title: "Email enviado!",
          description: "Verifique sua caixa de entrada para redefinir sua senha.",
        });
      }
    } catch (error) {
      console.error('Password reset error:', error);
      toast({
        title: "Erro",
        description: "Erro interno. Tente novamente mais tarde.",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  };

  // Carregar email salvo se "lembrar-me" estava ativo
  useState(() => {
    const remembered = localStorage.getItem('rememberLogin');
    const savedEmail = localStorage.getItem('userEmail');
    
    if (remembered === 'true' && savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

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
                Acesse sua conta
              </h2>
              <p className="text-gray-600 mt-2">
                Entre ou crie uma nova conta na Beast Sports
              </p>
            </div>

            {/* Erro geral */}
            {errors.general && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-600">{errors.general}</span>
              </div>
            )}

            {/* Confirmação de email enviado */}
            {resetEmailSent && (
              <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600">
                  Email de recuperação enviado! Verifique sua caixa de entrada.
                </span>
              </div>
            )}

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="register">Criar Conta</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-6">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`pl-10 ${errors.email ? 'border-red-300' : ''}`}
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
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`pl-10 pr-12 ${errors.password ? 'border-red-300' : ''}`}
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

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={setRememberMe}
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Lembrar-me
                      </label>
                    </div>
                    
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      disabled={loading}
                      className="text-sm text-green-600 hover:text-green-700 font-medium disabled:opacity-50"
                    >
                      Esqueci minha senha
                    </button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 text-white hover:bg-green-700"
                    disabled={loading}
                  >
                    {loading ? "Entrando..." : "Entrar"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="space-y-6">
                <form onSubmit={handleSignUp} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="Seu nome completo"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`pl-10 ${errors.email ? 'border-red-300' : ''}`}
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
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`pl-10 pr-12 ${errors.password ? 'border-red-300' : ''}`}
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmar Senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`pl-10 ${errors.confirmPassword ? 'border-red-300' : ''}`}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 text-white hover:bg-green-700"
                    disabled={loading}
                  >
                    {loading ? "Criando conta..." : "Criar Conta"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
