"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import productService from "@/services/product.service";
import { Product } from "@/types/product";

import ProductToolbar from "@/components/products/ProductToolbar";
import ProductTable from "@/components/products/ProductTable";
import ProductDialog from "@/components/products/ProductDialog";
import DeleteProductDialog from "@/components/products/DeleteProductDialog";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productService.getProducts();
      setProducts(response.data);
    } catch {
      toast.error("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };
  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading products...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Products</h1>

        <p className="text-muted-foreground">Manage your inventory products.</p>
      </div>

      <ProductToolbar
        search={search}
        onSearchChange={setSearch}
        onAddProduct={handleAddProduct}
      />

      <ProductTable
        products={filteredProducts}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />

      <ProductDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={fetchProducts}
        product={selectedProduct}
      />
      <DeleteProductDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        product={productToDelete}
        onSuccess={fetchProducts}
      />
    </div>
  );
}
