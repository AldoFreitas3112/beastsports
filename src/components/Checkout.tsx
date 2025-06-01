import { useState } from "react";
import { ArrowLeft, CreditCard, MapPin, User } from "lucide-react";
import { useOrders } from "@/hooks/useOrders";

interface CheckoutProps {
  items?: any[];
  productData?: any;
  setCurrentView: (view: string) => void;
}

const Checkout = ({ items, productData, setCurrentView }: CheckoutProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "credit"
  });

  const { addOrder } = useOrders(formData.email || 'guest');

  // Determinar itens para checkout
  const checkoutItems = items || (productData ? [productData] : []);
  
  const total = checkoutItems.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Criar o pedido
    const orderItems = checkoutItems.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      size: item.selectedSize || item.size,
      image: item.image
    }));

    const paymentMethodText = formData.paymentMethod === 'credit' ? 'Cartão de Crédito' : 
                             formData.paymentMethod === 'debit' ? 'Cartão de Débito' : 'PIX';

    const newOrder = addOrder({
      items: orderItems,
      total: total,
      status: 'Pendente',
      shippingAddress: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode
      },
      paymentMethod: paymentMethodText
    });

    // Limpar carrinho se foi checkout do carrinho
    if (items) {
      // Aqui você pode adicionar lógica para limpar o carrinho
    }

    // Mostrar mensagem de sucesso e redirecionar
    alert(`Pedido #${newOrder.id} realizado com sucesso! Você pode acompanhar o status na sua conta.`);
    setCurrentView("account");
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => setCurrentView(items ? "cart" : "products")}
              className="flex items-center gap-2 text-green-600 hover:text-green-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Finalizar Compra</h1>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Formulário de checkout */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Informações pessoais */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Informações Pessoais
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Endereço de entrega */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Endereço de Entrega
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Endereço *
                      </label>
                      <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cidade *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estado *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CEP *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Método de pagamento */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Método de Pagamento
                  </h2>
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit"
                        checked={formData.paymentMethod === "credit"}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <span className="text-gray-700">Cartão de Crédito</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="debit"
                        checked={formData.paymentMethod === "debit"}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <span className="text-gray-700">Cartão de Débito</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="pix"
                        checked={formData.paymentMethod === "pix"}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <span className="text-gray-700">PIX</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Finalizar Pedido
                </button>
              </form>
            </div>

            {/* Resumo do pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Resumo do Pedido</h2>
                
                {/* Itens */}
                <div className="space-y-4 mb-6">
                  {checkoutItems.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800 text-sm">{item.name}</h3>
                        {(item.selectedSize || item.size) && (
                          <p className="text-xs text-gray-600">Tamanho: {item.selectedSize || item.size}</p>
                        )}
                        <p className="text-xs text-gray-600">Qtd: {item.quantity}</p>
                        <p className="font-semibold text-green-600 text-sm">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totais */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frete:</span>
                    <span className="text-green-600">Grátis</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-green-600">R$ {total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors mt-6"
                >
                  Finalizar Pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
