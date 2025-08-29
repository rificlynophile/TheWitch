import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Star, Eye } from "lucide-react";
import { Link } from "wouter";
import type { Script } from "@shared/schema";

interface ScriptCardProps {
  script: Script;
}

export default function ScriptCard({ script }: ScriptCardProps) {
  const handleDownload = () => {
    window.open(script.downloadLink, '_blank');
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow" data-testid={`card-script-${script.id}`}>
      <img 
        src={script.imageUrl} 
        alt={script.name}
        className="w-full h-48 object-cover"
        data-testid={`img-script-${script.id}`}
      />
      <CardContent className="p-6">
        <h3 className="font-bold text-lg mb-2" data-testid={`text-script-name-${script.id}`}>
          {script.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4" data-testid={`text-script-description-${script.id}`}>
          {script.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Download className="mr-1 h-4 w-4" />
            <span data-testid={`text-script-downloads-${script.id}`}>
              {script.downloads?.toLocaleString() || '0'}
            </span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="mr-1 h-4 w-4" />
            <span data-testid={`text-script-rating-${script.id}`}>
              {script.rating}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button 
            className="flex-1 text-sm" 
            onClick={handleDownload}
            data-testid={`button-download-${script.id}`}
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button 
            variant="secondary" 
            size="icon"
            asChild
            data-testid={`button-view-${script.id}`}
          >
            <Link href={`/scripts/${script.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
