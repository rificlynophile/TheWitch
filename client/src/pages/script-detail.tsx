import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Star, ArrowLeft, User } from "lucide-react";
import type { Script } from "@shared/schema";

export default function ScriptDetail() {
  const { id } = useParams<{ id: string }>();
  
  const { data: script, isLoading, error } = useQuery<Script>({
    queryKey: ["/api/scripts", id],
  });

  const handleDownload = () => {
    if (script?.downloadLink) {
      window.open(script.downloadLink, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded mb-4 w-32"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="w-full h-96 bg-muted rounded"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-12 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !script) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground" data-testid="text-script-not-found">
                  Script not found
                </p>
                <div className="text-center mt-4">
                  <Button asChild data-testid="button-back-to-scripts">
                    <Link href="/scripts">Back to Scripts</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6" data-testid="button-back">
            <Link href="/scripts">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Scripts
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Script Image */}
            <div>
              <img 
                src={script.imageUrl} 
                alt={script.name}
                className="w-full rounded-lg object-cover"
                data-testid="img-script-detail"
              />
            </div>

            {/* Script Info */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl" data-testid="text-script-detail-name">
                    {script.name}
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Download className="mr-1 h-4 w-4" />
                      <span data-testid="text-script-detail-downloads">
                        {script.downloads?.toLocaleString() || '0'} downloads
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Star className="mr-1 h-4 w-4" />
                      <span data-testid="text-script-detail-rating">
                        {script.rating} rating
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground" data-testid="text-script-detail-description">
                      {script.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Category</h3>
                    <span className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm" data-testid="text-script-detail-category">
                      {script.category}
                    </span>
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full"
                    onClick={handleDownload}
                    data-testid="button-download-script"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Script
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
