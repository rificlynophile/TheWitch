import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Scripts from "@/pages/scripts";
import Shop from "@/pages/shop";
import ScriptDetail from "@/pages/script-detail";
import ShopItemDetail from "@/pages/shop-item-detail";
import Admin from "@/pages/admin";
import Help from "@/pages/help";
import Contact from "@/pages/contact";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/scripts" component={Scripts} />
      <Route path="/shop" component={Shop} />
      <Route path="/scripts/:id" component={ScriptDetail} />
      <Route path="/shop/:id" component={ShopItemDetail} />
      <Route path="/admin" component={Admin} />
      <Route path="/help" component={Help} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
