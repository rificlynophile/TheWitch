import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SearchBar from "@/components/search-bar";
import ScriptCard from "@/components/script-card";
import type { Script } from "@shared/schema";

const categories = ["All Scripts", "Automation", "Mining", "Combat", "Trading", "Utilities"];

export default function Scripts() {
  const [, setLocation] = useLocation();
  const [activeCategory, setActiveCategory] = useState("All Scripts");
  const [searchQuery, setSearchQuery] = useState("");

  // Get search params from URL
  const urlParams = new URLSearchParams(window.location.search);
  const urlSearch = urlParams.get('search') || '';

  const queryKey = searchQuery || urlSearch 
    ? ["/api/scripts", { search: searchQuery || urlSearch }]
    : activeCategory === "All Scripts"
    ? ["/api/scripts"]
    : ["/api/scripts", { category: activeCategory }];

  const { data: scripts = [], isLoading } = useQuery<Script[]>({
    queryKey,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveCategory("All Scripts");
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Script Catalog</h1>
            <p className="text-muted-foreground text-lg">Discover and download community-created game scripts</p>
          </div>

          {/* Search */}
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search scripts by name, description, or category..."
          />

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-border">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 border-b-2 transition-colors ${
                  activeCategory === category
                    ? "border-primary text-primary font-medium"
                    : "border-transparent hover:border-border"
                }`}
                data-testid={`button-category-${category.toLowerCase().replace(' ', '-')}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Scripts Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
                  <div className="w-full h-48 bg-muted rounded mb-4"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded mb-4"></div>
                  <div className="h-8 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          ) : scripts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg" data-testid="text-no-scripts">
                No scripts found. Try adjusting your search or category filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {scripts.map((script) => (
                <ScriptCard key={script.id} script={script} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
