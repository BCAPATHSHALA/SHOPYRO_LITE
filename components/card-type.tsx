import { CreditCard } from "lucide-react";
import {
  FaCcDiscover,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
} from "react-icons/fa6";

interface CardTypeIconProps {
  cardType: string;
  className?: string;
}

export function CardTypeIcon({
  cardType,
  className = "w-6 h-6",
}: CardTypeIconProps) {
  const Icon = {
    Visa: FaCcVisa,
    MasterCard: FaCcMastercard,
    Amex: FaCcAmex,
    Discover: FaCcDiscover,
  }[cardType];

  return Icon ? (
    <Icon className={className} />
  ) : (
    <CreditCard className={`${className} opacity-50`} />
  );
}
