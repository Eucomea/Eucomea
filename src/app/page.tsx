"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Briefcase, Globe, Handshake, ChevronDown } from "lucide-react";

// Traductions
const translations = {
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      contact: "Contact"
    },
    hero: {
      title: "Enter Europe with Ease",
      subtitle: "Accompagnement stratégique et interculturel pour les entreprises coréennes en Europe.",
      ctaPrimary: "Nous contacter",
      ctaSecondary: "En savoir plus"
    },
    services: {
      title: "Ce que nous faisons",
      service1: {
        title: "Accompagnement de marques coréennes en Europe",
        description: "Analyse marché, positionnement, stratégie"
      },
      service2: {
        title: "Traduction & interprétariat business",
        description: "Réunions, salons, négociation"
      },
      service3: {
        title: "Sourcing & mise en relation B2B",
        description: "Mise en réseau, négociation, contrats"
      }
    },
    about: {
      title: "À propos / Nos valeurs",
      description: "Une équipe franco-coréenne, experte en communication et en stratégie business entre l'Asie et l'Europe.",
      founder: "Seoyoung Jeong",
      founderTitle: "Fondatrice – Experte interculturelle & marketing stratégique"
    },
    cta: {
      title: "Envie de développer votre présence en Europe ?",
      button: "Prenons contact"
    },
    footer: {
      address: "Adresse",
      addressValue: "Metz, France",
      email: "Email",
      phone: "Téléphone",
      languages: "Langues"
    },
    contact: {
      title: "Contactez-nous",
      name: "Nom",
      email: "Email",
      company: "Entreprise",
      message: "Message",
      send: "Envoyer",
      namePlaceholder: "Votre nom",
      emailPlaceholder: "votre@email.com",
      companyPlaceholder: "Nom de votre entreprise",
      messagePlaceholder: "Décrivez votre projet..."
    }
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      contact: "Contact"
    },
    hero: {
      title: "Enter Europe with Ease",
      subtitle: "Strategic and intercultural support for Korean companies in Europe.",
      ctaPrimary: "Contact Us",
      ctaSecondary: "Learn More"
    },
    services: {
      title: "What We Do",
      service1: {
        title: "Support for Korean Brands in Europe",
        description: "Market analysis, positioning, strategy"
      },
      service2: {
        title: "Business Translation & Interpretation",
        description: "Meetings, trade shows, negotiations"
      },
      service3: {
        title: "B2B Sourcing & Networking",
        description: "Networking, negotiations, contracts"
      }
    },
    about: {
      title: "About / Our Values",
      description: "A Franco-Korean team, expert in communication and business strategy between Asia and Europe.",
      founder: "Seoyoung Jeong",
      founderTitle: "Founder – Intercultural & Strategic Marketing Expert"
    },
    cta: {
      title: "Want to develop your presence in Europe?",
      button: "Let's Connect"
    },
    footer: {
      address: "Address",
      addressValue: "Metz, France",
      email: "Email",
      phone: "Phone",
      languages: "Languages"
    },
    contact: {
      title: "Contact Us",
      name: "Name",
      email: "Email",
      company: "Company",
      message: "Message",
      send: "Send",
      namePlaceholder: "Your name",
      emailPlaceholder: "your@email.com",
      companyPlaceholder: "Your company name",
      messagePlaceholder: "Describe your project..."
    }
  },
  kr: {
    nav: {
      home: "홈",
      about: "소개",
      contact: "연락처"
    },
    hero: {
      title: "Enter Europe with Ease",
      subtitle: "유럽 진출을 위한 전략적이고 문화간 지원 서비스",
      ctaPrimary: "문의하기",
      ctaSecondary: "더 알아보기"
    },
    services: {
      title: "서비스",
      service1: {
        title: "유럽 진출 한국 기업 지원",
        description: "시장 분석, 포지셔닝, 전략 수립"
      },
      service2: {
        title: "비즈니스 통역 및 번역",
        description: "회의, 전시회, 협상"
      },
      service3: {
        title: "B2B 소싱 및 네트워킹",
        description: "네트워킹, 협상, 계약"
      }
    },
    about: {
      title: "소개 / 가치관",
      description: "아시아와 유럽 간의 커뮤니케이션과 비즈니스 전략 전문 프랑코-코리안 팀",
      founder: "정서영",
      founderTitle: "창립자 – 문화간 커뮤니케이션 및 전략적 마케팅 전문가"
    },
    cta: {
      title: "유럽에서의 사업 확장을 원하시나요?",
      button: "연락하기"
    },
    footer: {
      address: "주소",
      addressValue: "메츠, 프랑스",
      email: "이메일",
      phone: "전화",
      languages: "언어"
    },
    contact: {
      title: "연락처",
      name: "이름",
      email: "이메일",
      company: "회사",
      message: "메시지",
      send: "보내기",
      namePlaceholder: "이름을 입력하세요",
      emailPlaceholder: "your@email.com",
      companyPlaceholder: "회사명을 입력하세요",
      messagePlaceholder: "프로젝트를 설명해주세요..."
    }
  }
};

export default function Home() {
  const [currentLang, setCurrentLang] = useState<'fr' | 'en' | 'kr'>('fr');
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    entreprise: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>("idle");
  const [formMessage, setFormMessage] = useState("");
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langRefDesktop = useRef<HTMLDivElement>(null);
  const langRefMobile = useRef<HTMLDivElement>(null);

  const t = translations[currentLang];

  // Configuration Brevo
  const BREVO_API_KEY = process.env.NEXT_PUBLIC_BREVO_API_KEY;
  const TO_EMAIL = "contact@eucomea.com";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    setFormMessage("");
    
    if (!BREVO_API_KEY) {
      setFormStatus("error");
      setFormMessage("Configuration manquante. Merci de nous écrire à contact@eucomea.com.");
      return;
    }

    try {
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "api-key": BREVO_API_KEY
        },
        body: JSON.stringify({
          sender: {
            name: "Eucomea Website",
            email: "noreply@eucomea.com"
          },
          to: [
            {
              email: TO_EMAIL,
              name: "Eucomea Team"
            }
          ],
          subject: `Nouveau message de ${formData.nom} - Eucomea`,
          htmlContent: `
            <h2>Nouveau message de contact</h2>
            <p><strong>Nom :</strong> ${formData.nom}</p>
            <p><strong>Email :</strong> ${formData.email}</p>
            <p><strong>Entreprise :</strong> ${formData.entreprise || 'Non renseigné'}</p>
            <p><strong>Message :</strong></p>
            <p>${formData.message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><em>Envoyé depuis le site web Eucomea le ${new Date().toLocaleString('fr-FR')}</em></p>
          `
        })
      });

      if (res.ok) {
        setFormStatus("success");
        setFormMessage("Merci, votre message a bien été envoyé !");
        setFormData({ nom: "", email: "", entreprise: "", message: "" });
      } else {
        const errorData = await res.json();
        console.error("Brevo API error:", errorData);
        setFormStatus("error");
        setFormMessage("Une erreur est survenue. Merci de réessayer ou de nous écrire à contact@eucomea.com.");
      }
    } catch (error) {
      console.error("Send email error:", error);
      setFormStatus("error");
      setFormMessage("Une erreur est survenue. Merci de réessayer ou de nous écrire à contact@eucomea.com.");
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const changeLanguage = (lang: 'fr' | 'en' | 'kr') => {
    setCurrentLang(lang);
  };

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langDropdownOpen) {
        if (
          (langRefDesktop.current && langRefDesktop.current.contains(e.target as Node)) ||
          (langRefMobile.current && langRefMobile.current.contains(e.target as Node))
        ) {
          return;
        }
        setLangDropdownOpen(false);
      }
    }
    if (langDropdownOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [langDropdownOpen]);

  return (
    <div className="min-h-screen bg-[#fbfaeb] text-[#1E3A8A] font-[Outfit,sans-serif]">
      {/* Header */}
      <header className="fixed top-0 w-full bg-[#fbfaeb] z-50 h-24">
        <div className="relative w-full h-full flex items-center">
          {/* Logo mobile centré */}
          <div className="flex justify-center items-center h-full md:hidden">
            <img
              src="/EUCOMEA-logo.png"
              alt="Logo Eucomea"
              className="w-[250px] max-w-[80vw] h-auto transition-all duration-500 cursor-pointer mx-auto"
              onClick={() => window.location.href = '/'}
            />
          </div>
          {/* Logo desktop aligné à gauche */}
          <div className="hidden md:flex items-center h-full ml-8">
            <img
              src="/EUCOMEA-logo.png"
              alt="Logo Eucomea"
              className="w-[450px] max-w-[90vw] h-auto transition-all duration-500 cursor-pointer"
              onClick={() => window.location.href = '/'}
            />
          </div>
          {/* Menu desktop parfaitement centré verticalement */}
          <div className="flex-1 h-full flex items-center justify-end pr-8">
            <nav className="hidden md:flex items-center space-x-8 text-lg font-medium bg-transparent h-full">
              {/* On retire Accueil */}
              {/* <a href="#" className="hover:text-[#3d75a3] transition-colors">Accueil</a> */}
              <a href="#about" className="hover:text-[#3d75a3] transition-colors">{t.nav.about}</a>
              <button
                onClick={() => setIsContactFormOpen(true)}
                className="hover:text-[#3d75a3] transition-colors bg-transparent border-none text-lg font-medium cursor-pointer"
              >
                {t.nav.contact}
              </button>
              {/* Sélecteur de langue ici */}
              {/* Sélecteur de langue desktop */}
              <div ref={langRefDesktop} className="relative">
                <button
                  onClick={() => setLangDropdownOpen((v) => !v)}
                  className="flex items-center gap-1 px-4 py-2 rounded-full bg-transparent border-none shadow-none text-[#365E88] font-medium hover:bg-[#f1f5f9] transition-all focus:outline-none cursor-pointer"
                >
                  {currentLang.toUpperCase()}
                </button>
                {langDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-28 bg-white border border-[#E5E7EB] rounded-xl shadow-lg z-50">
                    <button
                      onClick={() => { changeLanguage('fr'); setLangDropdownOpen(false); }}
                      className={`block w-full text-left px-4 py-2 rounded-t-xl hover:bg-[#f1f5f9] ${currentLang === 'fr' ? 'font-semibold text-[#365E88]' : ''}`}
                    >FR</button>
                    <button
                      onClick={() => { changeLanguage('en'); setLangDropdownOpen(false); }}
                      className={`block w-full text-left px-4 py-2 hover:bg-[#f1f5f9] ${currentLang === 'en' ? 'font-semibold text-[#365E88]' : ''}`}
                    >EN</button>
                    <button
                      onClick={() => { changeLanguage('kr'); setLangDropdownOpen(false); }}
                      className={`block w-full text-left px-4 py-2 rounded-b-xl hover:bg-[#f1f5f9] ${currentLang === 'kr' ? 'font-semibold text-[#365E88]' : ''}`}
                    >KO</button>
                  </div>
                )}
              </div>
            </nav>
          </div>
          {/* Sélecteur de langue mobile centré verticalement */}
          <div className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 z-50 flex items-center">
            <div ref={langRefMobile} className="relative">
              <button
                onClick={() => setLangDropdownOpen((v) => !v)}
                className="flex items-center gap-1 px-3 py-2 rounded-full bg-transparent border-none shadow-none text-[#365E88] font-medium hover:bg-transparent transition-all text-base focus:outline-none"
              >
                {currentLang.toUpperCase()}
              </button>
              {langDropdownOpen && (
                <div className="absolute left-0 mt-2 w-24 bg-white border border-[#E5E7EB] rounded-xl shadow-lg z-50">
                  <button onClick={() => { changeLanguage('fr'); setLangDropdownOpen(false); }} className={`block w-full text-left px-4 py-2 rounded-t-xl hover:bg-[#f1f5f9] ${currentLang === 'fr' ? 'font-semibold text-[#365E88]' : ''}`}>FR</button>
                  <button onClick={() => { changeLanguage('en'); setLangDropdownOpen(false); }} className={`block w-full text-left px-4 py-2 hover:bg-[#f1f5f9] ${currentLang === 'en' ? 'font-semibold text-[#365E88]' : ''}`}>EN</button>
                  <button onClick={() => { changeLanguage('kr'); setLangDropdownOpen(false); }} className={`block w-full text-left px-4 py-2 rounded-b-xl hover:bg-[#f1f5f9] ${currentLang === 'kr' ? 'font-semibold text-[#365E88]' : ''}`}>KO</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section sans blob SVG */}
      <section id="hero" className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 bg-[#fbfaeb] text-[#1E3A8A] font-[Outfit,sans-serif] overflow-hidden">
        {/* Blob SVG supprimé */}
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight mb-6 text-[#1E3A8A]">{t.hero.title}</h1>
          <p className="text-xl mb-10 max-w-2xl mx-auto font-medium" style={{ color: '#fb9982' }}>{t.hero.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setIsContactFormOpen(true)}
              className="group bg-gradient-to-r from-[#3d75a3] to-[#2c5a7a] text-white px-6 sm:px-12 py-3 sm:py-5 rounded-full font-semibold text-lg sm:text-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex items-center gap-3"
            >
              {t.hero.ctaPrimary}
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("about")}
              className="border border-[#365E88] text-[#365E88] rounded-full px-6 sm:px-8 py-3 font-semibold text-lg sm:text-xl tracking-wide hover:bg-[#F1F5F9] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#365E88]"
            >
              {t.hero.ctaSecondary}
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fbfaeb]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-semibold text-center mb-12 text-[#1E3A8A] tracking-tight">
            {t.services.title}
          </h2>
          {/* Ligne fine sous le titre conservée */}
          <div className="mx-auto w-16 h-0.5 bg-gradient-to-r from-[#365E88] to-[#E0E7FF] rounded-full mb-12" />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-8 bg-white rounded-2xl border border-[#F1F5F9] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 cursor-pointer">
              <div className="flex justify-center mb-6">
                <Briefcase size={40} className="text-[#365E88] group-hover:scale-110 transition-transform duration-200" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#1E3A8A] tracking-wide">{t.services.service1.title}</h3>
              <p className="text-[#6B7280] text-base leading-relaxed font-medium">{t.services.service1.description}</p>
            </div>
            <div className="group text-center p-8 bg-white rounded-2xl border border-[#F1F5F9] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 cursor-pointer">
              <div className="flex justify-center mb-6">
                <Globe size={40} className="text-[#365E88] group-hover:scale-110 transition-transform duration-200" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#1E3A8A] tracking-wide">{t.services.service2.title}</h3>
              <p className="text-[#6B7280] text-base leading-relaxed font-medium">{t.services.service2.description}</p>
            </div>
            <div className="group text-center p-8 bg-white rounded-2xl border border-[#F1F5F9] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 cursor-pointer">
              <div className="flex justify-center mb-6">
                <Handshake size={40} className="text-[#365E88] group-hover:scale-110 transition-transform duration-200" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#1E3A8A] tracking-wide">{t.services.service3.title}</h3>
              <p className="text-[#6B7280] text-base leading-relaxed font-medium">{t.services.service3.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-[#3d75a3]">{t.about.title}</h2>
          <p className="text-2xl mb-12 text-[#3d75a3]/90 font-light leading-relaxed max-w-4xl mx-auto">
            {t.about.description}
          </p>
          <div className="bg-gradient-to-br from-white/90 to-[#fbfbe4]/90 rounded-3xl p-12 max-w-2xl mx-auto shadow-xl border border-[#3d75a3]/10">
            <div className="w-32 h-32 bg-gradient-to-br from-[#3d75a3]/20 to-[#2c5a7a]/20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl shadow-lg">
              👩‍💼
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-[#3d75a3]">{t.about.founder}</h3>
            <p className="text-[#3d75a3]/80 text-lg">{t.about.founderTitle}</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#3d75a3]/10 to-[#2c5a7a]/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-[#3d75a3]">{t.cta.title}</h2>
          <button
            onClick={() => setIsContactFormOpen(true)}
            className="group bg-gradient-to-r from-[#3d75a3] to-[#2c5a7a] text-white px-12 py-5 rounded-full font-semibold text-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex items-center gap-3 mx-auto"
        >
            {t.cta.button}
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#3d75a3] to-[#2c5a7a] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-8 text-center md:text-left">
            <div className="md:col-span-4 flex flex-col md:flex-row items-center justify-center md:justify-between text-xs sm:text-sm gap-2 md:gap-6">
              <span>{t.footer.address} : {t.footer.addressValue}</span>
              <span>•</span>
              <span>{t.footer.email} : <a href="mailto:contact@eucomea.com" className="underline">contact@eucomea.com</a></span>
              <span>•</span>
              <span>{t.footer.phone} : <a href="tel:+33749353767" className="underline">+33 7 49 35 37 67</a></span>
              <span>•</span>
              <span>{t.footer.languages} : 🇫🇷 🇰🇷 🇬🇧</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Form Modal */}
      {isContactFormOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsContactFormOpen(false);
          }}
        >
          <div className="bg-white rounded-2xl p-4 sm:p-8 max-w-[95vw] sm:max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#3d75a3]/10"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#3d75a3]">{t.contact.title}</h3>
              <button
                onClick={() => setIsContactFormOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl hover:scale-110 transition-transform"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="nom" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                  {t.contact.name} *
                </label>
                <input
                  type="text"
                  id="nom"
                  required
                  value={formData.nom}
                  onChange={(e) => setFormData({...formData, nom: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d75a3] focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder={t.contact.namePlaceholder}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                  {t.contact.email} *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d75a3] focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder={t.contact.emailPlaceholder}
                />
              </div>
              <div>
                <label htmlFor="entreprise" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                  {t.contact.company}
                </label>
                <input
                  type="text"
                  id="entreprise"
                  value={formData.entreprise}
                  onChange={(e) => setFormData({...formData, entreprise: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d75a3] focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder={t.contact.companyPlaceholder}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                  {t.contact.message} *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d75a3] focus:border-transparent transition-all resize-none text-sm sm:text-base"
                  placeholder={t.contact.messagePlaceholder}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#3d75a3] to-[#2c5a7a] text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 font-semibold text-base sm:text-lg disabled:opacity-60"
                disabled={formStatus === 'sending'}
              >
                {formStatus === 'sending' ? 'Envoi en cours...' : t.contact.send}
              </button>
              {formMessage && (
                <div className={`text-center text-xs sm:text-sm mt-2 ${formStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>{formMessage}</div>
              )}
              <div className="text-[10px] sm:text-xs text-center text-[#3d75a3] mt-2 sm:mt-4">
                Ou contactez-nous directement : <a href="mailto:contact@eucomea.com" className="underline">contact@eucomea.com</a>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
