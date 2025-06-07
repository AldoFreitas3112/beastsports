
import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => Promise<boolean>;
  submitting: boolean;
}

const ReviewForm = ({ onSubmit, submitting }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert('Por favor, selecione uma classificação');
      return;
    }

    const success = await onSubmit(rating, comment);
    if (success) {
      setRating(0);
      setComment('');
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 mt-6">
      <h3 className="text-lg font-semibold mb-4">Escreva sua avaliação</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Classificação
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= (hoveredRating || rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comentário (opcional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={4}
            placeholder="Conte-nos sobre sua experiência com este produto..."
          />
        </div>

        <Button
          type="submit"
          disabled={submitting || rating === 0}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {submitting ? 'Enviando...' : 'Enviar Avaliação'}
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;
