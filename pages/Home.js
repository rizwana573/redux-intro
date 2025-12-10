import { useSelector } from "react-redux";
import Product from "../components/Product";
import {getAllProducts, getProductsLoadingState, getProductsError} from "../store/slices/productsSlice.js"

export default function Home() {
  const productsList = useSelector(getAllProducts);
  const isLoading = useSelector(getProductsLoadingState);
  const productsErr = useSelector(getProductsError);

  return isLoading ? (
    <h1 style={{ textAlign: "center" }}>Loading.... </h1>
  ) : (
    <>
      {productsErr ? (
        <h1 style={{ textAlign: "center" }}> {productsErr} </h1>
      ) : (
        <div className="products-container">
          {productsList.map(({ id, title, rating, price, image }) => (
            <Product
              key={id}
              productId={id}
              title={title}
              rating={rating.rate}
              price={price}
              imageUrl={image}
            />
          ))}
        </div>
      )}
    </>
  );
}
