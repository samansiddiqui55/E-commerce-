
import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuantityControlProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  min?: number;
  max?: number;
}

const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onDecrease,
  onIncrease,
  min = 1,
  max = 99
}) => {
  return (
    <div className="flex items-center border rounded-md">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-none"
        onClick={onDecrease}
        disabled={quantity <= min}
      >
        <Minus size={16} />
      </Button>
      <div className="w-8 text-center">{quantity}</div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-none"
        onClick={onIncrease}
        disabled={quantity >= max}
      >
        <Plus size={16} />
      </Button>
    </div>
  );
};

export default QuantityControl;
