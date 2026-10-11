import React, { useState } from 'react';
import { PRODUCTS } from '../data/mockData';
import { Product } from '../types';

interface ProductsCatalogScreenProps {
  initialCategory?: string;
  onSelectProduct: (product: Product) => void;
  onAddOnce: (product: Product) => void;
  onSubscribe: (product: Product) => void;
  onShowToast: (msg: string) => void;
}

export const ProductsCatalogScreen: React.FC<ProductsCatalogScreenProps> = ({
  initialCategory = 'all',
  onSelectProduct,
  onAddOnce,
  onSubscribe,
  onShowToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'cow-milk', label: 'Cow Milk' },
    { id: 'buffalo-milk', label: 'Buffalo Milk' },
    { id: 'eggs', label: 'Farm Eggs' },
    { id: 'ghee', label: 'Desi Ghee' },
    { id: 'coconut', label: 'Coconut' },
    { id: 'breads', label: 'Breads' },
    { id: 'oils', label: 'Pure Oils' },
    { id: 'curd', label: 'Curd & Dairy' },
  ];

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full pb-8">
      <div className="px-margin pt-space-md flex flex-col gap-space-md">
        {/* Search Bar */}
        <div className="relative w-full">
          <span className="material-symbols-outlined text-outline-variant absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search farm fresh milk, eggs, ghee, oils..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-9 rounded-xl bg-surface-container-lowest border border-surface-container-high text-on-surface font-body-md focus:outline-none focus:border-primary shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Category Filters Carousel */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-margin px-margin py-0.5">
          {categories.map((c) => {
            const isSel = selectedCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-full font-label-md text-label-md whitespace-nowrap transition-all shadow-xs ${
                  isSel
                    ? 'bg-primary text-on-primary font-bold'
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-low border border-surface-container-high'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Catalog Banner */}
        <div className="p-3 rounded-xl bg-secondary-container/30 border border-secondary-container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
            <span className="font-label-md text-label-md text-on-secondary-container">
              Milked today, chilled at 4°C, delivered before 7:00 AM.
            </span>
          </div>
          <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary text-white font-bold">
            {filteredProducts.length} Items
          </span>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 gap-space-sm">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-surface-container-lowest rounded-xl p-space-sm shadow-[0_2px_8px_rgba(0,76,40,0.04)] flex flex-col justify-between border border-surface-container-high/60 transition-all hover:shadow-md"
            >
              <div
                className="relative cursor-pointer"
                onClick={() => onSelectProduct(prod)}
              >
                <img
                  className="w-full h-32 rounded-lg object-cover"
                  alt={prod.name}
                  src={prod.image}
                />
                <span className="absolute top-1.5 left-1.5 bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm px-2 py-0.5 rounded-full shadow-sm font-semibold">
                  {prod.badge}
                </span>
                <span className="absolute bottom-1.5 right-1.5 bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-label-sm text-label-sm px-1.5 py-0.5 rounded font-bold">
                  {prod.size}
                </span>
              </div>

              <div className="pt-space-xs flex flex-col flex-1">
                <span
                  onClick={() => onSelectProduct(prod)}
                  className="font-title-md text-title-md text-on-surface line-clamp-1 cursor-pointer hover:text-primary font-semibold"
                >
                  {prod.name}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-0.5">
                  {prod.subtitle}
                </span>

                <div className="mt-space-sm flex items-baseline gap-1">
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">
                    ₹{prod.trialPrice ? prod.trialPrice : prod.price}
                  </span>
                  {prod.originalPrice && (
                    <span className="font-body-sm text-body-sm text-outline line-through">
                      ₹{prod.originalPrice}
                    </span>
                  )}
                  {prod.trialPrice && (
                    <span className="font-label-sm text-label-sm text-secondary font-semibold">
                      Trial
                    </span>
                  )}
                </div>

                <div className="mt-space-xs flex gap-1">
                  <button
                    onClick={() => {
                      onAddOnce(prod);
                      onShowToast(`Added 1x ${prod.name} to tomorrow's bag`);
                    }}
                    className="flex-1 py-1.5 rounded-lg bg-surface-container-high text-primary font-label-md text-label-md active:scale-98 transition-transform flex items-center justify-center gap-0.5"
                  >
                    <span className="material-symbols-outlined text-[14px]">add</span> Add
                  </button>
                  <button
                    onClick={() => onSelectProduct(prod)}
                    className="flex-[1.4] py-1.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md active:scale-98 transition-transform shadow-xs flex items-center justify-center gap-0.5 font-semibold"
                  >
                    <span>Subscribe</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
