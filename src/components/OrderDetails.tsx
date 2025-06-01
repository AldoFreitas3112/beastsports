
import { ArrowLeft, Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Order } from '@/hooks/useOrders';

interface OrderDetailsProps {
  order: Order;
  onBack: () => void;
}

const OrderDetails = ({ order, onBack }: OrderDetailsProps) => {
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'Pendente':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'Processando':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'Em trânsito':
        return <Truck className="h-5 w-5 text-orange-500" />;
      case 'Entregue':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Cancelado':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processando':
        return 'bg-blue-100 text-blue-800';
      case 'Em trânsito':
        return 'bg-orange-100 text-orange-800';
      case 'Entregue':
        return 'bg-green-100 text-green-800';
      case 'Cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-green-600 hover:text-green-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar aos pedidos
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Pedido #{order.id}</h2>
            <p className="text-gray-600">Realizado em {new Date(order.date).toLocaleDateString('pt-BR')}</p>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(order.status)}
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Itens do Pedido</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                    {item.size && (
                      <p className="text-sm text-gray-600">Tamanho: {item.size}</p>
                    )}
                    <p className="text-sm text-gray-600">Quantidade: {item.quantity}</p>
                    <p className="font-semibold text-green-600">R$ {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumo do Pedido</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>R$ {order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete:</span>
                  <span className="text-green-600">Grátis</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total:</span>
                  <span>R$ {order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {order.shippingAddress && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Endereço de Entrega</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p>{order.shippingAddress.street}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                  <p>CEP: {order.shippingAddress.zipCode}</p>
                </div>
              </div>
            )}

            {order.paymentMethod && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Método de Pagamento</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p>{order.paymentMethod}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
