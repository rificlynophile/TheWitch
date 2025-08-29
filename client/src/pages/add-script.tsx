import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { insertScriptSchema, type InsertScript } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

const categories = ["Automation", "Mining", "Combat", "Trading", "Utilities"];

export default function AddScript() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<InsertScript>({
    resolver: zodResolver(insertScriptSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      downloadLink: "",
      category: "",
    },
  });

  const createScriptMutation = useMutation({
    mutationFn: async (data: InsertScript) => {
      const response = await apiRequest("POST", "/api/scripts", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Script has been added successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/scripts"] });
      setLocation("/scripts");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add script. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertScript) => {
    createScriptMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Add New Script</CardTitle>
              <p className="text-muted-foreground">
                Share your game script with the community
              </p>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Script Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter script name" 
                            {...field} 
                            data-testid="input-script-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe what your script does"
                            className="min-h-[100px]"
                            {...field}
                            data-testid="textarea-script-description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-script-category">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://example.com/image.jpg" 
                            {...field} 
                            data-testid="input-script-image"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="downloadLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Download Link</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://example.com/script.lua" 
                            {...field} 
                            data-testid="input-script-download"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={createScriptMutation.isPending}
                    data-testid="button-submit-script"
                  >
                    {createScriptMutation.isPending ? "Adding..." : "Add Script"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
