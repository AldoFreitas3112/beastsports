import { useState } from "react";
import { User, Camera, Heart, Package, Settings, LogOut } from "lucide-react";

const Account = ({ user, setUser, favorites, setCurrentView }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    zipCode: ""
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      name: profileData.name,
      email: profileData.email
    });
    alert("Perfil atualizado com sucesso!");
  };

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUser({
          ...user,
          profileImage: event.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const orders = [
    {
      id: "BS001",
      date: "2024-01-15",
      total: 159.80,
      status: "Entregue",
      items: 2
    },
    {
      id: "BS002", 
      date: "2024-01-10",
      total: 89.90,
      status: "Em trânsito",
      items: 1
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Minha Conta</h1>
          
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-3 overflow-hidden">
                      {user?.profileImage ? (
                        <img 
                          src={user.profileImage} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="h-10 w-10 text-white" />
                      )}
                    </div>
                    <input
                      type="file"
                      id="profile-photo"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    <button 
                      onClick={() => document.getElementById('profile-photo').click()}
                      className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md border-2 border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <Camera className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  <h3 className="font-semibold text-gray-800">{user?.name}</h3>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
                
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "profile" 
                        ? "bg-green-100 text-green-700" 
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <User className="h-5 w-5" />
                    <span>Perfil</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "orders" 
                        ? "bg-green-100 text-green-700" 
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Package className="h-5 w-5" />
                    <span>Pedidos</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("favorites")}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "favorites" 
                        ? "bg-green-100 text-green-700" 
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Heart className="h-5 w-5" />
                    <span>Favoritos</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "settings" 
                        ? "bg-green-100 text-green-700" 
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Settings className="h-5 w-5" />
                    <span>Configurações</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setUser(null);
                      setCurrentView("home");
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sair</span>
                  </button>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-6">
                {activeTab === "profile" && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Informações do Perfil</h2>
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nome Completo
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={profileData.name}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Telefone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CEP
                          </label>
                          <input
                            type="text"
                            name="zipCode"
                            value={profileData.zipCode}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Endereço
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={profileData.address}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cidade
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={profileData.city}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                      >
                        Salvar Alterações
                      </button>
                    </form>
                  </div>
                )}
                
                {activeTab === "orders" && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Meus Pedidos</h2>
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-gray-800">Pedido #{order.id}</h3>
                              <p className="text-sm text-gray-600">Data: {order.date}</p>
                              <p className="text-sm text-gray-600">{order.items} item(s)</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-green-600">R$ {order.total.toFixed(2)}</p>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                order.status === "Entregue" 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-blue-100 text-blue-800"
                              }`}>
                                {order.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === "favorites" && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Produtos Favoritos</h2>
                    {favorites.length === 0 ? (
                      <div className="text-center py-12">
                        <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600">Você ainda não tem produtos favoritos.</p>
                        <button
                          onClick={() => setCurrentView("products")}
                          className="mt-4 text-green-600 hover:text-green-700 font-medium"
                        >
                          Explorar Produtos
                        </button>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favorites.map((product) => (
                          <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-32 object-cover rounded-lg mb-3"
                            />
                            <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                            <p className="text-green-600 font-bold">R$ {product.price.toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === "settings" && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Configurações</h2>
                    <div className="space-y-6">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-2">Notificações</h3>
                        <div className="space-y-3">
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-3" defaultChecked />
                            <span className="text-gray-700">Receber ofertas por email</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-3" defaultChecked />
                            <span className="text-gray-700">Notificações de pedidos</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-3" />
                            <span className="text-gray-700">Newsletter semanal</span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-2">Privacidade</h3>
                        <div className="space-y-3">
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-3" defaultChecked />
                            <span className="text-gray-700">Manter histórico de compras</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-3" />
                            <span className="text-gray-700">Permitir recomendações personalizadas</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
