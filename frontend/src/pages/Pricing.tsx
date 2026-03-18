import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { createOrder, verifyPayment } from "@/api/payment.api";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Pricing() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

    const handlePayment = async (planId: string) => {
        if (!user) {
            toast.info("Please login to purchase an upgrade.");
            navigate("/sign-in");
            return;
        }

        setLoadingPlan(planId);
        try {
            const { order } = await createOrder(planId);
            
            const rzpKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
            if (!rzpKey) {
                toast.error("VITE_RAZORPAY_KEY_ID is missing in frontend .env file. Please add it and restart your frontend server.");
                return;
            }

            const options = {
                key: rzpKey,
                amount: order.amount,
                currency: order.currency,
                name: "Roadmap Generator",
                description: "Purchase Tokens",
                order_id: order.id,
                handler: async function (response: any) {
                    try {
                        const verifiedData = await verifyPayment({
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            signature: response.razorpay_signature,
                        });
                        
                        toast.success("Payment successful!");
                        
                        if (user) {
                            setUser({ 
                                ...user, 
                                tokens: verifiedData.user.tokens, 
                                unlimitedExpiresAt: verifiedData.user.unlimitedExpiresAt 
                            });
                        }
                    } catch (err) {
                        toast.error("Payment verification failed. Please contact support.");
                    }
                },
                prefill: {
                    name: user?.username || "Test User",
                    email: user?.email || "test@example.com",
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp = new (window as any).Razorpay(options);
            
            rzp.on('payment.failed', function (response: any) {
                toast.error("Payment failed: " + response.error.description);
            });
            
            rzp.open();
        } catch (error: any) {
            const msg = error.response?.data?.message || "Failed to initialize payment. Please try again.";
            toast.error(msg);
        } finally {
            setLoadingPlan(null);
        }
    };

    const hasUnlimited = user?.unlimitedExpiresAt ? new Date(user.unlimitedExpiresAt) > new Date() : false;

    return (
        <div className="py-24 px-8 pt-32 w-full max-w-6xl mx-auto flex flex-col items-center justify-center gap-12 min-h-[80vh]">
            <div className="text-center space-y-4 max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Upgrade Your Path</h1>
                <p className="text-muted-foreground font-medium">
                    Generate highly detailed career roadmaps, pinpoint your skill gaps, and get curated resources with premium access.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                <PricingCard 
                    title="Starter Kit" 
                    price="₹149" 
                    desc="3 Roadmaps" 
                    features={["Deep Skill Gap Analysis", "10+ Curated Resources", "Real-time AI Output"]} 
                    onClick={() => handlePayment('3_tokens')}
                    isLoading={loadingPlan === '3_tokens'}
                />
                
                <PricingCard 
                    title="Pro Path" 
                    price="₹499" 
                    desc="10 Roadmaps" 
                    features={["Everything in Starter", "Multiple Job Profile mappings", "Priority Generation"]} 
                    onClick={() => handlePayment('10_tokens')}
                    isLoading={loadingPlan === '10_tokens'}
                    isPopular
                />
                
                <PricingCard 
                    title="Unlimited" 
                    price="₹999" 
                    desc="1 Month Access" 
                    features={["Endless Roadmap Generations", "All Premium Features", "Continuous Access"]} 
                    onClick={() => handlePayment('unlimited')}
                    isLoading={loadingPlan === 'unlimited'}
                    currentPlan={hasUnlimited}
                />
            </div>
        </div>
    );
}

function PricingCard({ title, price, desc, features, onClick, isLoading, isPopular, currentPlan }: any) {
    return (
            <div className={`flex flex-col p-8 border ${isPopular ? 'border-primary shadow-xl bg-primary/5' : 'border-border bg-card'} relative h-full rounded-none`}>
            {isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 whitespace-nowrap z-10">
                    Most Popular
                </div>
            )}
            <div className="space-y-2 mb-8 mt-2">
                <h3 className="font-bold text-lg uppercase tracking-widest">{title}</h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black tracking-tighter text-foreground">{price}</span>
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{desc}</span>
                </div>
            </div>
            
            <div className="space-y-4 mb-8 flex-1">
                {features.map((f: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-medium text-foreground/90">
                        <Check className="w-4 h-4 text-primary shrink-0" />
                        <span>{f}</span>
                    </div>
                ))}
            </div>

            <Button
                onClick={onClick}
                variant={isPopular ? "default" : "outline"}
                disabled={isLoading || currentPlan}
                className="w-full py-7 text-xs font-bold uppercase tracking-widest rounded-none"
            >
                {isLoading ? "Loading..." : currentPlan ? "Active Plan" : "Choose Plan"}
            </Button>
        </div>
    )
}
