"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { WhatsAppButton } from "@/components/whatsapp-button";
import DynamicPricing from "@/components/dynamic-pricing";
import { useLanguage } from "@/components/language-provider";
import Link from "next/link";
import { ProductCarousel } from "@/components/product-carousel";

export default function HomePage() {
  const { t, language } = useLanguage();

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hi! I'm interested in KP Naturals. Can you tell me more about your sulfur-free hair oil?"
    );
    window.open(`https://wa.me/916381248615?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/coconut-palm-grove.jpg)",
          }}
        />
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <div className="space-y-4 sm:space-y-6 md:space-y-8 text-center md:text-left">
              <div
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white shadow-lg rounded-full transition-colors duration-300"
                style={{
                  backgroundColor: "#10b981",
                  color: "#ffffff",
                  border: "none",
                  backgroundImage: "none",
                  backdropFilter: "none",
                  opacity: "1",
                }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {t("hero.badge")}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-black leading-tight">
                <span
                  className="text-white drop-shadow-lg"
                  style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                >
                  {t("hero.title")}
                </span>
                <br />
                <span
                  className="text-green-100 drop-shadow-lg"
                  style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                >
                  {t("hero.brand")}
                </span>
              </h1>

              <p
                className="text-sm sm:text-base md:text-lg text-white leading-relaxed font-medium max-w-lg mx-auto md:mx-0 drop-shadow-lg"
                style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.7)" }}
              >
                {t("hero.description")}
              </p>

              <div className="glass p-4 sm:p-6 md:p-8 rounded-2xl border border-primary/20 relative overflow-hidden bg-white/10 backdrop-blur-md">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5"></div>
                <div className="relative">
                  <DynamicPricing />
                  <p className="text-white font-medium drop-shadow-sm bg-black/30 rounded-lg px-3 py-2 inline-block text-sm">
                    {t("hero.usage")}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                <Button
                  size="lg"
                  onClick={handleWhatsAppClick}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-xl hover:shadow-2xl transition-colors duration-300 px-6 py-3 text-base font-semibold w-full sm:w-auto"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {t("button.order")}
                </Button>
                <Link href="/products">
                  <Button
                    size="lg"
                    variant="outline"
                    className="group border-2 border-white text-white bg-transparent shadow-lg transition-colors duration-300 px-6 py-3 text-base font-semibold w-full sm:w-auto hover:border-accent hover:text-accent hover:bg-white/10"
                  >
                    <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
                    {t("button.learn")}
                  </Button>
                </Link>
              </div>

              <div className="flex flex-row items-center gap-3 pt-4 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 sm:h-5 sm:w-5 fill-accent text-accent"
                      />
                    ))}
                  </div>
                  <span className="text-white font-medium drop-shadow-sm text-sm">
                    4.9/5 from 500+ reviews
                  </span>
                </div>
              </div>
            </div>

            <div className="relative mt-8 md:mt-0">
              <div className="flex justify-center">
                <ProductCarousel />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black mb-4 sm:mb-6 text-foreground">
              {t("ingredients.title")}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed px-4">
              {t("ingredients.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: t("ingredient.hibiscus"),
                image: "/red-hibiscus-ingredient.png",
                benefit: t("ingredient.hibiscus.benefit"),
                icon: Flower2,
                gradient: "from-red-500/20 to-pink-500/20",
              },
              {
                name: t("ingredient.coconut"),
                image: "/coconut-oil-natural-organic.png",
                benefit: t("ingredient.coconut.benefit"),
                icon: Nut,
                gradient: "from-amber-500/20 to-orange-500/20",
              },
              {
                name: t("ingredient.rosemary"),
                image: "/fresh-rosemary.png",
                benefit: t("ingredient.rosemary.benefit"),
                icon: Leaf,
                gradient: "from-emerald-500/20 to-teal-500/20",
              },
              {
                name: t("ingredient.secret"),
                image: "/natural-herbs-blend.png",
                benefit: t("ingredient.secret.benefit"),
                icon: FlaskConical,
                gradient: "from-purple-500/20 to-indigo-500/20",
              },
              {
                name: t("ingredient.nosulfur"),
                image: "/natural-hair-oil.png",
                benefit: t("ingredient.nosulfur.benefit"),
                icon: Ban,
                gradient: "from-blue-500/20 to-cyan-500/20",
              },
            ].map((ingredient, index) => (
              <Card
                key={index}
                className="glass border-border/50 hover:shadow-xl transition-shadow duration-300 text-center group relative overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${ingredient.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>
                <CardHeader className="pb-2 sm:pb-4 relative">
                  <div className="relative mb-2 sm:mb-4 md:mb-6">
                    <div className="relative">
                      <img
                        src={ingredient.image || "/placeholder.svg"}
                        alt={ingredient.name}
                        className="w-12 h-12 sm:w-20 sm:h-20 md:w-28 md:h-28 mx-auto rounded-lg sm:rounded-2xl object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                      />
                      <div className="absolute inset-0 rounded-lg sm:rounded-2xl bg-gradient-to-br from-transparent to-primary/10 group-hover:to-primary/20 transition-all duration-300"></div>
                    </div>
                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 md:-top-3 md:-right-3 text-sm sm:text-2xl md:text-3xl bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm rounded-lg sm:rounded-2xl p-1 sm:p-2 md:p-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      {/** vector icon for minimalist look */}
                      <ingredient.icon className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 text-foreground" />
                    </div>
                  </div>
                  <CardTitle className="font-serif font-black text-xs sm:text-lg md:text-xl mb-0 sm:mb-1 md:mb-1 text-card-foreground">
                    {ingredient.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-1 sm:pt-0 relative px-2 sm:px-6 -mt-2 sm:-mt-1">
                  <p className="text-muted-foreground leading-relaxed font-medium text-[10px] sm:text-sm md:text-base">
                    {ingredient.benefit}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-4 sm:pt-8 pb-16 sm:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/30"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black mb-4 sm:mb-6 text-foreground">
                {t("farm.title")}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
              <Card className="glass border-border/50 overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 p-0">
                <div className="relative h-48 sm:h-64">
                  <img
                    src="/coconut-farm-plantation.png"
                    alt="KP Coconut Farm Plantation"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-serif font-bold text-base sm:text-lg">
                      Our Coconut Farm
                    </h3>
                    <p className="text-xs sm:text-sm opacity-90">
                      Fresh from our plantation
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="glass border-border/50 overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 p-0">
                <div className="relative h-48 sm:h-64">
                  <img
                    src="/fresh-rosemary.png"
                    alt="Rosemary Cultivation at KP Farm"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-serif font-bold text-base sm:text-lg">
                      Rosemary Cultivation
                    </h3>
                    <p className="text-xs sm:text-sm opacity-90">
                      Fresh rosemary from our farm
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="glass border-border/50 overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 p-0">
                <div className="relative h-48 sm:h-64">
                  <img
                    src="/coconut-farm-harvest.png"
                    alt="Coconut Harvesting Process"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-serif font-bold text-base sm:text-lg">
                      Harvesting Process
                    </h3>
                    <p className="text-xs sm:text-sm opacity-90">
                      Hand-picked coconuts
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="glass border-border/50 overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 p-0">
                <div className="relative h-48 sm:h-64">
                  <img
                    src="/coconut-shells-farm.png"
                    alt="Coconut Processing Stage"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-serif font-bold text-base sm:text-lg">
                      Processing Stage
                    </h3>
                    <p className="text-xs sm:text-sm opacity-90">
                      Fresh coconut extraction
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="glass border-border/50 overflow-hidden shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 sm:h-80 lg:h-auto">
                  <img
                    src="/coconut-farm-plantation.png"
                    alt="Fresh Coconut Harvesting at KP Farm"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>
                </div>
                <div className="p-6 sm:p-8 lg:p-12 flex items-center">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-r from-primary to-accent p-2 sm:p-3 shadow-lg">
                        <Leaf className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-serif font-black text-card-foreground">
                        {t("farm.subtitle")}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed font-medium text-base sm:text-lg">
                      {t("farm.description")}
                    </p>
                    <div className="flex items-center gap-4 pt-4">
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 sm:px-4 py-2 font-medium text-sm">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        {t("farm.badge")}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section
        id="benefits"
        className="py-16 sm:py-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/30"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black mb-4 sm:mb-6 text-foreground">
              {t("benefits.title")}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed px-4">
              {t("benefits.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Shield,
                title: t("benefit.gentle.title"),
                description: t("benefit.gentle.desc"),
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: Heart,
                title: t("benefit.nourish.title"),
                description: t("benefit.nourish.desc"),
                gradient: "from-red-500 to-pink-500",
              },
              {
                icon: Leaf,
                title: t("benefit.natural.title"),
                description: t("benefit.natural.desc"),
                gradient: "from-green-500 to-emerald-500",
              },
              {
                icon: CheckCircle,
                title: t("benefit.results.title"),
                description: t("benefit.results.desc"),
                gradient: "from-primary to-accent",
              },
              {
                icon: Users,
                title: t("benefit.types.title"),
                description: t("benefit.types.desc"),
                gradient: "from-purple-500 to-indigo-500",
              },
              {
                icon: Award,
                title: t("benefit.quality.title"),
                description: t("benefit.quality.desc"),
                gradient: "from-amber-500 to-orange-500",
              },
            ].map((benefit, index) => (
              <Card
                key={index}
                className="glass border-border/50 hover:shadow-xl transition-shadow duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r ${benefit.gradient} p-3 sm:p-4 mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <benefit.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <CardTitle className="font-serif font-black text-lg sm:text-xl text-card-foreground">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-muted-foreground leading-relaxed font-medium text-sm sm:text-base">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black mb-4 sm:mb-6 text-foreground">
              {t("contact.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <Card className="glass border-border/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 text-center group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 p-3 sm:p-4 mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <CardTitle className="font-serif font-black text-lg sm:text-xl text-card-foreground">
                  {t("contact.phone")}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-muted-foreground font-medium text-base sm:text-lg">
                  6381248615
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 text-center group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 p-3 sm:p-4 mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Instagram className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <CardTitle className="font-serif font-black text-lg sm:text-xl text-card-foreground">
                  {t("contact.instagram")}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <a
                  href="https://instagram.com/kpnaturals.official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent transition-colors font-medium text-base sm:text-lg"
                >
                  @kpnaturals.official
                </a>
              </CardContent>
            </Card>

            <Card className="glass border-border/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 text-center group relative overflow-hidden sm:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 p-3 sm:p-4 mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <CardTitle className="font-serif font-black text-lg sm:text-xl text-card-foreground">
                  {t("contact.whatsapp")}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <Button
                  onClick={handleWhatsAppClick}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                >
                  <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  {t("contact.whatsapp")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="relative py-12 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted to-muted/80"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4 sm:mb-6 justify-center sm:justify-start">
                <img
                  src="/kp-header-logo.png"
                  alt="KP Naturals Logo"
                  className="h-8 sm:h-10 w-8 sm:w-10 object-cover rounded-full dark:brightness-110 dark:contrast-110"
                />
                <h3 className="text-lg sm:text-xl font-serif font-black text-foreground">
                  KP Naturals
                </h3>
              </div>
              <p className="text-muted-foreground mb-4 font-medium leading-relaxed text-center sm:text-left text-sm sm:text-base">
                {t("footer.tagline")}
              </p>
            </div>
            <div className="text-center sm:text-left">
              <h4 className="font-serif font-black text-foreground mb-4 sm:mb-6 text-base sm:text-lg">
                {t("footer.products")}
              </h4>
              <ul className="space-y-2 sm:space-y-3 text-muted-foreground text-sm sm:text-base">
                <li className="hover:text-primary transition-colors cursor-pointer">
                  Natural Hair Oil
                </li>
                <li className="hover:text-primary transition-colors cursor-pointer">
                  Sulfur-Free Formula
                </li>
                <li className="hover:text-primary transition-colors cursor-pointer">
                  Hibiscus Blend
                </li>
                <li className="hover:text-primary transition-colors cursor-pointer">
                  Coconut Oil Base
                </li>
              </ul>
            </div>
            <div className="text-center sm:text-left">
              <h4 className="font-serif font-black text-foreground mb-4 sm:mb-6 text-base sm:text-lg">
                {t("footer.support")}
              </h4>
              <ul className="space-y-2 sm:space-y-3 text-muted-foreground text-sm sm:text-base">
                <li className="hover:text-primary transition-colors cursor-pointer">
                  Contact: 6381248615
                </li>
                <li className="hover:text-primary transition-colors cursor-pointer">
                  WhatsApp Support
                </li>
                <li className="hover:text-primary transition-colors cursor-pointer">
                  Instagram: @kpnaturals.official
                </li>
                <li className="hover:text-primary transition-colors cursor-pointer">
                  Usage Guidelines
                </li>
              </ul>
            </div>
            <div className="text-center sm:text-left">
              <h4 className="font-serif font-black text-foreground mb-4 sm:mb-6 text-base sm:text-lg">
                {t("footer.connect")}
              </h4>
              <ul className="space-y-2 sm:space-y-3 text-muted-foreground text-sm sm:text-base">
                <li>
                  <a
                    href="https://instagram.com/kpnaturals.official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleWhatsAppClick}
                    className="hover:text-primary transition-colors text-left"
                  >
                    WhatsApp
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 mt-12 sm:mt-16 pt-6 sm:pt-8 text-center text-muted-foreground">
            <p className="font-medium text-sm sm:text-base">
              &copy; 2024 KP Naturals. {t("footer.rights")}
            </p>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
