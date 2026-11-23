import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => (
  <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14">
    {products.map(product => <ProductCard key={product.id} product={product} />)}
  </div>
);

export default ProductGrid;
