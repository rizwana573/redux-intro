import { useSelector } from "react-redux";
import Product from "../components/Product";

const Home = () => {
  const productsList = useSelector((state) => state.products);
  return (
    <div className="products-container">
      {productsList.map((product) => (
        <Product
          key={product.id}
          productId={product.id}
          title={product.title}
          rating={product.rating.rate}
          price={product.price}
          imageUrl={product.image}
        />
      ))}
    </div>
  );
};

export default Home;
