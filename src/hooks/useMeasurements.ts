import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Measurement {
  id: string;
  measurement_type: string;
  value: number;
  unit: string;
  created_at: string;
  updated_at: string;
}

export const useMeasurements = () => {
  const [measurements, setMeasurements] = useState<Record<string, Measurement>>({});
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchMeasurements = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('measurements')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      const measurementsMap = data.reduce((acc, measurement) => {
        acc[measurement.measurement_type] = measurement;
        return acc;
      }, {} as Record<string, Measurement>);

      setMeasurements(measurementsMap);
    } catch (error: any) {
      console.error('Error fetching measurements:', error);
      toast({
        title: "Error",
        description: "Failed to load measurements",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveMeasurement = async (type: string, value: number, unit: string): Promise<void> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to save measurements",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase
        .from('measurements')
        .upsert({
          user_id: user.id,
          measurement_type: type,
          value: value,
          unit: unit
        }, {
          onConflict: 'user_id,measurement_type'
        })
        .select()
        .single();

      if (error) throw error;

      setMeasurements(prev => ({
        ...prev,
        [type]: data
      }));

      toast({
        title: "Success",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} saved successfully`,
      });
    } catch (error: any) {
      console.error('Error saving measurement:', error);
      toast({
        title: "Error",
        description: "Failed to save measurement",
        variant: "destructive"
      });
    }
  };

  const getMeasurement = (type: string): Measurement | null => {
    return measurements[type] || null;
  };

  useEffect(() => {
    fetchMeasurements();
  }, []);

  return {
    measurements,
    isLoading,
    saveMeasurement,
    getMeasurement,
    fetchMeasurements
  };
};