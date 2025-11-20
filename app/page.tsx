"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Leaf,
  Shield,
  Heart,
  CheckCircle,
  Users,
  Award,
  Phone,
  Instagram,
  MessageCircle,
  Sparkles,
  Flower2,
  Nut,
  FlaskConical,
  Ban,
  ArrowRight,
} from "lucide-react";
import { WhatsAppButton } from "@/components/whatsapp-button";
import DynamicPricing from "@/components/dynamic-pricing";
import { useLanguage } from "@/components/language-provider";
import Link from "next/link";
import Image from "next/image";
import { ProductCarousel } from "@/components/product-carousel";

export default function HomePage() {
  const { t } = useLanguage();

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hi! I'm interested in KP Naturals. Can you tell me more about your sulfur-free hair oil?"
    );
    window.open(`https://wa.me/916381248615?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/coconut-palm-grove.webp"
            alt="Coconut Palm Grove"
            fill
            priority
            className="object-cover opacity-90"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10" />
        </div>

        <div className="container relative z-20 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8 text-center lg:text-left animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium tracking-wide">
                <Sparkles className="w-4 h-4 mr-2 text-secondary" />
                {t("hero.badge")}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold leading-[1.1] text-white tracking-tight text-balance">
                {t("hero.title")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-emerald-200">
                  {t("hero.brand")}
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light text-balance">
                {t("hero.description")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Button
                  size="lg"
                  onClick={handleWhatsAppClick}
                  className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-14 text-lg shadow-lg shadow-primary/20 transition-all hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {t("button.order")}
                </Button>
                <Link href="/products">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white rounded-full px-8 h-14 text-lg backdrop-blur-sm transition-all"
                  >
                    {t("button.learn")}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-4 justify-center lg:justify-start pt-4">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-black/20 bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-white/80 text-sm font-medium">4.9/5 from 500+ reviews</span>
                </div>
              </div>
            </div>

            <div className="relative lg:h-[600px] flex items-center justify-center animate-in fade-in zoom-in duration-1000 delay-300">
              {/* Glass Card for Pricing */}
              <div className="absolute -right-4 top-10 z-30 glass p-6 rounded-2xl max-w-xs hidden lg:block animate-float">
                <DynamicPricing />
                <p className="text-xs text-muted-foreground mt-2 text-center font-medium">
                  {t("hero.usage")}
                </p>
              </div>
              <ProductCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Section - Minimalist Cards */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">
              {t("ingredients.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
              {t("ingredients.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: t("ingredient.hibiscus"),
                image: "/red-hibiscus-ingredient.webp",
                benefit: t("ingredient.hibiscus.benefit"),
                icon: Flower2,
                color: "bg-red-50 text-red-600",
              },
              {
                name: t("ingredient.coconut"),
                image: "/coconut-oil-natural-organic.webp",
                benefit: t("ingredient.coconut.benefit"),
                icon: Nut,
                color: "bg-amber-50 text-amber-600",
              },
              {
                name: t("ingredient.rosemary"),
                image: "/fresh-rosemary.png",
                benefit: t("ingredient.rosemary.benefit"),
                icon: Leaf,
                color: "bg-emerald-50 text-emerald-600",
              },
              {
                name: t("ingredient.secret"),
                image: "/natural-herbs-blend.webp",
                benefit: t("ingredient.secret.benefit"),
                icon: FlaskConical,
                color: "bg-purple-50 text-purple-600",
              },
              {
                name: t("ingredient.nosulfur"),
                image: "/natural-hair-oil.webp",
                benefit: t("ingredient.nosulfur.benefit"),
                icon: Ban,
                color: "bg-blue-50 text-blue-600",
              },
            ].map((item, idx) => (
              <div key={idx} className="group relative bg-card hover:bg-white rounded-3xl p-6 transition-all duration-300 hover:shadow-xl border border-border/50">
                <div className="relative h-48 mb-6 overflow-hidden rounded-2xl bg-muted/50">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-serif font-bold">{item.name}</h3>
                  <div className={`p-2 rounded-full ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Farm Section - Asymmetrical Grid */}
      <section className="py-24 overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <Badge variant="outline" className="rounded-full px-4 py-1 border-primary/20 text-primary bg-primary/5">
                From Our Farm
              </Badge>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground leading-tight">
                {t("farm.title")}
              </h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                {t("farm.description")}
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-primary font-medium">
                  <CheckCircle className="w-5 h-5" />
                  {t("farm.badge")}
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/coconut-farm-plantation.webp"
                alt="Farm"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "/fresh-rosemary.png",
              "/coconut-farm-harvest.webp",
              "/coconut-shells-farm.webp",
              "/coconut-farm-plantation.webp"
            ].map((src, i) => (
              <div key={i} className="relative h-40 md:h-64 rounded-2xl overflow-hidden group">
                <Image src={src} alt="Farm process" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Clean Grid */}
      <section className="py-24 bg-primary/5">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">{t("benefits.title")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("benefits.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: t("benefit.gentle.title"), desc: t("benefit.gentle.desc") },
              { icon: Heart, title: t("benefit.nourish.title"), desc: t("benefit.nourish.desc") },
              { icon: Leaf, title: t("benefit.natural.title"), desc: t("benefit.natural.desc") },
              { icon: CheckCircle, title: t("benefit.results.title"), desc: t("benefit.results.desc") },
              { icon: Users, title: t("benefit.types.title"), desc: t("benefit.types.desc") },
              { icon: Award, title: t("benefit.quality.title"), desc: t("benefit.quality.desc") },
            ].map((item, i) => (
              <div key={i} className="bg-background p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-border/50">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="container max-w-4xl">
          <div className="glass rounded-[2.5rem] p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-accent" />

            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">{t("contact.title")}</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-lg">{t("contact.phone")}</p>
                  <p className="text-muted-foreground">6381248615</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-pink-50 flex items-center justify-center text-pink-600">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-lg">{t("contact.instagram")}</p>
                  <a href="https://instagram.com/kpnaturals.official" className="text-muted-foreground hover:text-primary transition-colors">@kpnaturals.official</a>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-lg">{t("contact.whatsapp")}</p>
                  <Button variant="link" onClick={handleWhatsAppClick} className="p-0 h-auto text-muted-foreground hover:text-primary">Chat with us</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-16 border-t border-border">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image src="/kp-header-logo.webp" alt="Logo" fill className="object-cover" />
                </div>
                <span className="font-serif font-bold text-xl">KP Naturals</span>
              </div>
              <p className="text-muted-foreground max-w-xs">{t("footer.tagline")}</p>
            </div>

            <div>
              <h4 className="font-bold mb-6">{t("footer.products")}</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li>Natural Hair Oil</li>
                <li>Sulfur-Free Formula</li>
                <li>Hibiscus Blend</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">{t("footer.support")}</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li>Contact Us</li>
                <li>Shipping Policy</li>
                <li>Returns</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            &copy; 2024 KP Naturals. {t("footer.rights")}
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}

