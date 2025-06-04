
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Send, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EmailSender } from "@/components/EmailSender";

const Index = () => {
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Sending email with data:', formData);
      const result = await EmailSender.send(formData);
      
      if (result.success) {
        setEmailSent(true);
        toast({
          title: "Email sent successfully!",
          description: `Your message has been delivered to ${formData.to}`,
        });
        setFormData({ to: "", subject: "", message: "" });
        setTimeout(() => setEmailSent(false), 3000);
      } else {
        throw new Error(result.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Email sending error:', error);
      toast({
        title: "Failed to send email",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full shadow-lg">
              <Mail className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            QuantXemail
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional email delivery powered by Resend API. Send beautiful, reliable emails with ease.
          </p>
        </div>

        {/* Main Card */}
        <Card className="shadow-2xl border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center justify-center gap-2">
              <Send className="h-6 w-6 text-blue-600" />
              Compose Email
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Recipient */}
              <div className="space-y-2">
                <Label htmlFor="to" className="text-sm font-medium text-gray-700">
                  To
                </Label>
                <Input
                  id="to"
                  name="to"
                  type="email"
                  placeholder="recipient@example.com"
                  value={formData.to}
                  onChange={handleInputChange}
                  required
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Enter email subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Type your message here..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={8}
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors resize-none"
                />
              </div>

              {/* Send Button */}
              <Button
                type="submit"
                disabled={isLoading || !formData.to || !formData.subject || !formData.message}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Sending...
                  </div>
                ) : emailSent ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Sent!
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Send Email
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 mb-8">
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg">
            <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
              <Send className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Fast Delivery</h3>
            <p className="text-sm text-gray-600">Powered by Resend API for reliable and fast email delivery</p>
          </div>
          
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg">
            <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">High Deliverability</h3>
            <p className="text-sm text-gray-600">Industry-leading delivery rates ensure your emails reach their destination</p>
          </div>
          
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg">
            <div className="bg-indigo-100 p-3 rounded-full w-fit mx-auto mb-4">
              <Mail className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Simple Interface</h3>
            <p className="text-sm text-gray-600">Clean, intuitive design makes sending emails effortless</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
