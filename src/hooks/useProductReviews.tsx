
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Review {
  id: string;
  user_id: string;
  product_id: number;
  rating: number;
  comment: string;
  created_at: string;
  profiles?: {
    full_name: string;
  };
}

export const useProductReviews = (productId: number) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchReviews = async () => {
    try {
      // Fetch reviews first
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('product_reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (reviewsError) throw reviewsError;

      if (reviewsData && reviewsData.length > 0) {
        // Get unique user IDs
        const userIds = [...new Set(reviewsData.map(review => review.user_id))];
        
        // Fetch profiles for these users
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name')
          .in('id', userIds);

        if (profilesError) throw profilesError;

        // Combine reviews with profile data
        const reviewsWithProfiles = reviewsData.map(review => ({
          ...review,
          profiles: profilesData?.find(profile => profile.id === review.user_id) 
            ? { full_name: profilesData.find(profile => profile.id === review.user_id)?.full_name || 'Usuário' }
            : undefined
        }));

        setReviews(reviewsWithProfiles);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async (rating: number, comment: string) => {
    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Erro",
          description: "Você precisa estar logado para avaliar produtos.",
          variant: "destructive",
        });
        return false;
      }

      const { error } = await supabase
        .from('product_reviews')
        .insert({
          user_id: user.id,
          product_id: productId,
          rating,
          comment
        });

      if (error) throw error;

      toast({
        title: "Avaliação enviada!",
        description: "Sua avaliação foi enviada com sucesso.",
      });

      fetchReviews();
      return true;
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar sua avaliação. Tente novamente.",
        variant: "destructive",
      });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  return {
    reviews,
    loading,
    submitting,
    submitReview,
    refetch: fetchReviews
  };
};
