
import { Star } from 'lucide-react';

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  profiles?: {
    full_name: string;
  };
}

interface StaticReview {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewsListProps {
  reviews: Review[];
  staticReviews: StaticReview[];
  loading: boolean;
}

const ReviewsList = ({ reviews, staticReviews, loading }: ReviewsListProps) => {
  if (loading) {
    return <div className="text-center py-4">Carregando avaliações...</div>;
  }

  const allReviews = [
    ...reviews.map(review => ({
      id: `user-${review.id}`,
      userName: review.profiles?.full_name || 'Usuário',
      rating: review.rating,
      comment: review.comment,
      date: new Date(review.created_at).toLocaleDateString('pt-BR'),
      isUserReview: true
    })),
    ...staticReviews.map(review => ({
      id: `static-${review.id}`,
      userName: review.userName,
      rating: review.rating,
      comment: review.comment,
      date: review.date,
      isUserReview: false
    }))
  ];

  if (allReviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Ainda não há avaliações para este produto.</p>
        <p className="text-sm text-gray-500 mt-2">Seja o primeiro a avaliar!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {allReviews.map((review) => (
        <div key={review.id} className="border rounded-lg p-4 bg-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-800">{review.userName}</span>
              {review.isUserReview && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Avaliação verificada
                </span>
              )}
            </div>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>
          
          <div className="flex items-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < review.rating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          
          <p className="text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
