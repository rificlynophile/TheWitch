import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Eye, Plus } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { insertScriptSchema, insertShopItemSchema, type InsertScript, type InsertShopItem, type Script, type ShopItem } from "@shared/schema";

const scriptCategories = ["Automation", "Mining", "Combat", "Trading", "Utilities"];
const shopCategories = ["Weapons", "Tools", "Resources", "Premium"];

export default function Admin() {
  const [activeTab, setActiveTab] = useState("scripts");
  const [isAddScriptOpen, setIsAddScriptOpen] = useState(false);
  const [isAddShopItemOpen, setIsAddShopItemOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  // Simple admin password check
  const adminPassword = "admin123"; // In real app, this would be in environment variables

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      setIsAuthenticated(true);
      toast({
        title: "Access Granted",
        description: "Welcome to admin panel!",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const scriptForm = useForm<InsertScript>({
    resolver: zodResolver(insertScriptSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      downloadLink: "",
      category: "",
    },
  });

  const shopItemForm = useForm<InsertShopItem>({
    resolver: zodResolver(insertShopItemSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      price: "",
      category: "",
    },
  });

  const { data: scripts = [], isLoading: isLoadingScripts } = useQuery<Script[]>({
    queryKey: ["/api/scripts"],
  });

  const { data: shopItems = [], isLoading: isLoadingShop } = useQuery<ShopItem[]>({
    queryKey: ["/api/shop-items"],
  });

  const deleteScriptMutation = useMutation({
    mutationFn: async (scriptId: string) => {
      await apiRequest("DELETE", `/api/scripts/${scriptId}`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Script has been deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/scripts"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete script. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteShopItemMutation = useMutation({
    mutationFn: async (itemId: string) => {
      await apiRequest("DELETE", `/api/shop-items/${itemId}`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Shop item has been deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/shop-items"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete shop item. Please try again.",
        variant: "destructive",
      });
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
      scriptForm.reset();
      setIsAddScriptOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add script. Please try again.",
        variant: "destructive",
      });
    },
  });

  const createShopItemMutation = useMutation({
    mutationFn: async (data: InsertShopItem) => {
      const response = await apiRequest("POST", "/api/shop-items", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Shop item has been added successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/shop-items"] });
      shopItemForm.reset();
      setIsAddShopItemOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add shop item. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDeleteScript = (scriptId: string) => {
    deleteScriptMutation.mutate(scriptId);
  };

  const handleDeleteShopItem = (itemId: string) => {
    deleteShopItemMutation.mutate(itemId);
  };

  const onSubmitScript = (data: InsertScript) => {
    createScriptMutation.mutate(data);
  };

  const onSubmitShopItem = (data: InsertShopItem) => {
    createShopItemMutation.mutate(data);
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
            <Card className="mt-20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
                <p className="text-muted-foreground">Enter password to access admin panel</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Input
                      type="password"
                      placeholder="Enter admin password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      data-testid="input-admin-password"
                    />
                  </div>
                  <Button type="submit" className="w-full" data-testid="button-admin-login">
                    Access Admin Panel
                  </Button>
                </form>
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
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Admin Panel</h1>
              <p className="text-muted-foreground text-lg">Manage scripts and shop items</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setIsAuthenticated(false)}
              data-testid="button-admin-logout"
            >
              Logout
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="scripts" data-testid="tab-scripts">Scripts Management</TabsTrigger>
              <TabsTrigger value="shop-items" data-testid="tab-shop-items">Shop Items Management</TabsTrigger>
            </TabsList>

            <TabsContent value="scripts" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Scripts ({scripts.length})</CardTitle>
                  <Dialog open={isAddScriptOpen} onOpenChange={setIsAddScriptOpen}>
                    <DialogTrigger asChild>
                      <Button data-testid="button-add-script">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Script
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Script</DialogTitle>
                        <DialogDescription>
                          Add a new script to the catalog
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...scriptForm}>
                        <form onSubmit={scriptForm.handleSubmit(onSubmitScript)} className="space-y-4">
                          <FormField
                            control={scriptForm.control}
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
                            control={scriptForm.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Describe what your script does"
                                    className="min-h-[80px]"
                                    {...field}
                                    data-testid="textarea-script-description"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={scriptForm.control}
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
                                    {scriptCategories.map((category) => (
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
                            control={scriptForm.control}
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
                            control={scriptForm.control}
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

                          <div className="flex space-x-2 pt-4">
                            <Button 
                              type="submit" 
                              className="flex-1" 
                              disabled={createScriptMutation.isPending}
                              data-testid="button-submit-script"
                            >
                              {createScriptMutation.isPending ? "Adding..." : "Add Script"}
                            </Button>
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => setIsAddScriptOpen(false)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  {isLoadingScripts ? (
                    <div className="text-center py-8">Loading scripts...</div>
                  ) : scripts.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No scripts found</div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Downloads</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {scripts.map((script) => (
                          <TableRow key={script.id}>
                            <TableCell className="font-medium">{script.name}</TableCell>
                            <TableCell>{script.category}</TableCell>
                            <TableCell>{script.downloads?.toLocaleString() || '0'}</TableCell>
                            <TableCell>{script.rating}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  asChild
                                  data-testid={`button-view-script-${script.id}`}
                                >
                                  <Link href={`/scripts/${script.id}`}>
                                    <Eye className="h-4 w-4" />
                                  </Link>
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      data-testid={`button-delete-script-${script.id}`}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Script</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete "{script.name}"? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDeleteScript(script.id)}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shop-items" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Shop Items ({shopItems.length})</CardTitle>
                  <Dialog open={isAddShopItemOpen} onOpenChange={setIsAddShopItemOpen}>
                    <DialogTrigger asChild>
                      <Button data-testid="button-add-shop-item">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Shop Item
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Shop Item</DialogTitle>
                        <DialogDescription>
                          Add a new item to the shop
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...shopItemForm}>
                        <form onSubmit={shopItemForm.handleSubmit(onSubmitShopItem)} className="space-y-4">
                          <FormField
                            control={shopItemForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Item Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter item name" 
                                    {...field} 
                                    data-testid="input-item-name"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={shopItemForm.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Describe the item"
                                    className="min-h-[80px]"
                                    {...field}
                                    data-testid="textarea-item-description"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={shopItemForm.control}
                              name="price"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Price ($)</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="9.99" 
                                      type="number"
                                      step="0.01"
                                      {...field} 
                                      data-testid="input-item-price"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={shopItemForm.control}
                              name="category"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Category</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger data-testid="select-item-category">
                                        <SelectValue placeholder="Select a category" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {shopCategories.map((category) => (
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
                          </div>

                          <FormField
                            control={shopItemForm.control}
                            name="imageUrl"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Image URL</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="https://example.com/image.jpg" 
                                    {...field} 
                                    data-testid="input-item-image"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex space-x-2 pt-4">
                            <Button 
                              type="submit" 
                              className="flex-1" 
                              disabled={createShopItemMutation.isPending}
                              data-testid="button-submit-item"
                            >
                              {createShopItemMutation.isPending ? "Adding..." : "Add Item"}
                            </Button>
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => setIsAddShopItemOpen(false)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  {isLoadingShop ? (
                    <div className="text-center py-8">Loading shop items...</div>
                  ) : shopItems.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No shop items found</div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {shopItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>${item.price}</TableCell>
                            <TableCell>{item.rating}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  asChild
                                  data-testid={`button-view-item-${item.id}`}
                                >
                                  <Link href={`/shop/${item.id}`}>
                                    <Eye className="h-4 w-4" />
                                  </Link>
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      data-testid={`button-delete-item-${item.id}`}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Shop Item</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete "{item.name}"? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDeleteShopItem(item.id)}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}