import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface MeasurementDialogProps {
  icon: LucideIcon;
  title: string;
  type: 'height' | 'weight';
  currentValue?: number;
  currentUnit?: string;
  onSave: (value: number, unit: string) => Promise<void>;
  xpValue?: number;
  cardColor: string;
  children: React.ReactNode;
}

const HEIGHT_UNITS = [
  { value: 'cm', label: 'Centimeters (cm)' },
  { value: 'ft', label: 'Feet & Inches' },
  { value: 'm', label: 'Meters (m)' }
];

const WEIGHT_UNITS = [
  { value: 'kg', label: 'Kilograms (kg)' },
  { value: 'lbs', label: 'Pounds (lbs)' },
  { value: 'st', label: 'Stones (st)' }
];

export const MeasurementDialog = ({
  icon: Icon,
  title,
  type,
  currentValue,
  currentUnit,
  onSave,
  xpValue = 10,
  cardColor,
  children
}: MeasurementDialogProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>('');
  const [unit, setUnit] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const units = type === 'height' ? HEIGHT_UNITS : WEIGHT_UNITS;
  const defaultUnit = type === 'height' ? 'cm' : 'kg';

  useEffect(() => {
    if (currentValue && currentUnit) {
      setValue(currentValue.toString());
      setUnit(currentUnit);
    } else {
      setValue('');
      setUnit(defaultUnit);
    }
  }, [currentValue, currentUnit, defaultUnit, open]);

  const handleSave = async () => {
    if (!value || !unit) return;
    
    const numericValue = parseFloat(value);
    if (isNaN(numericValue) || numericValue <= 0) return;

    setIsLoading(true);
    try {
      await onSave(numericValue, unit);
      setOpen(false);
    } catch (error) {
      // Error handling is done in the parent component
    } finally {
      setIsLoading(false);
    }
  };

  const formatDisplayValue = () => {
    if (!currentValue || !currentUnit) return 'Not set';
    
    if (type === 'height') {
      if (currentUnit === 'ft') {
        const feet = Math.floor(currentValue / 12);
        const inches = Math.round(currentValue % 12);
        return `${feet}'${inches}"`;
      }
      return `${currentValue} ${currentUnit}`;
    }
    
    return `${currentValue} ${currentUnit}`;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            Enter Your {title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {currentValue && currentUnit && (
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Current {title}</p>
                  <p className="text-2xl font-bold">{formatDisplayValue()}</p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="measurement-value">{title} Value</Label>
              <Input
                id="measurement-value"
                type="number"
                step="0.1"
                min="0"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={`Enter your ${title.toLowerCase()}`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="measurement-unit">Unit</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unitOption) => (
                    <SelectItem key={unitOption.value} value={unitOption.value}>
                      {unitOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="bg-sports-emerald/10 rounded-lg p-3 text-center">
              <p className="text-sm font-medium text-sports-emerald">
                +{xpValue} XP for updating your {title.toLowerCase()}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!value || !unit || isLoading}
              className={`flex-1 ${cardColor} text-white hover:opacity-90`}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};