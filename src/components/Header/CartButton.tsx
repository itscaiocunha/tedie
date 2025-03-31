import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCarrinho } from "../../context/CarrinhoContext";
import { Button } from "../ui/button";

const CartButton = () => {
  const navigate = useNavigate();
  const { cartItems } = useCarrinho();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative hover:text-yellow-500"
      onClick={() => navigate("/checkout")}
      aria-label="Carrinho de compras"
    >
      <ShoppingCart className="h-5 w-5 text-red-500" />
      {cartItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {cartItems}
        </span>
      )}
    </Button>
  );
};

export default CartButton;