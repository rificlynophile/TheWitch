import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Help() {
  const faqs = [
    {
      question: "How do I download a script?",
      answer: "Simply browse the scripts catalog, find the script you want, and click the 'Download' button. The script file will be downloaded to your device."
    },
    {
      question: "Are the scripts safe to use?",
      answer: "All scripts uploaded to our platform are reviewed for safety and security. However, we recommend always running scripts in a safe environment and understanding what they do before execution."
    },
    {
      question: "Can I upload my own scripts?",
      answer: "Yes! Click the 'Add Script' button in the navigation or visit the upload page to share your scripts with the community."
    },
    {
      question: "How do I purchase items from the shop?",
      answer: "Browse the shop, select items you want, and add them to your cart. Then proceed to checkout to complete your purchase."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and various other payment methods depending on your region."
    },
    {
      question: "Can I get a refund?",
      answer: "Refunds are available within 30 days of purchase for digital items that haven't been used. Contact our support team for assistance."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-muted-foreground text-lg">
              Find answers to common questions and get help with GameScript
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  New to GameScript? Learn the basics of browsing scripts, making purchases, and uploading your own content.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Browse our script catalog</li>
                  <li>• Download scripts safely</li>
                  <li>• Create an account</li>
                  <li>• Upload your first script</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account & Billing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Manage your account settings, payment methods, and understand our billing policies.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Update payment information</li>
                  <li>• View purchase history</li>
                  <li>• Request refunds</li>
                  <li>• Cancel subscriptions</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Script Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Learn about our community guidelines and best practices for creating and sharing scripts.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Community standards</li>
                  <li>• Script quality guidelines</li>
                  <li>• Copyright policies</li>
                  <li>• Reporting issues</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technical Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Get help with technical issues, troubleshooting, and platform-specific questions.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Troubleshooting downloads</li>
                  <li>• Script compatibility</li>
                  <li>• Platform requirements</li>
                  <li>• Error reporting</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}