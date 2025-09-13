import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { RoleSection } from "@/components/role-section";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesSection />
      <RoleSection />
    </div>
  );
};

export default Index;
