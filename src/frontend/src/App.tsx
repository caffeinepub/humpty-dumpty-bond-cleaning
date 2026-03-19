import { ServiceType } from "@/backend";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import {
  CheckCircle2,
  ChevronDown,
  Clock,
  Loader2,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Shield,
  Star,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const WA_LINK = "https://wa.me/61488841883";
const WA_NUM = "0488841883";

function App() {
  const { actor } = useActor();
  const [mobileOpen, setMobileOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  // Contact form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [propSize, setPropSize] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !service) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      const fullMessage = `Service: ${service}\nProperty Size: ${propSize}\n\n${message}`;
      if (actor) {
        await actor.submitEnquiry(
          name,
          phone,
          email,
          fullMessage,
          ServiceType.other,
        );
      }
      // Send via mailto (user's email client) — business email stored only in JS variable
      const bizEmail = ["humptydumptybondcleaning", "gmail.com"].join("@");
      const subject = encodeURIComponent(
        `New Bond Cleaning Enquiry from ${name}`,
      );
      const body = encodeURIComponent(
        `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\nProperty Size: ${propSize}\n\nMessage:\n${message}`,
      );
      window.open(`mailto:${bizEmail}?subject=${subject}&body=${body}`);
      toast.success("Enquiry sent! We'll get back to you shortly.");
      setName("");
      setPhone("");
      setEmail("");
      setService("");
      setPropSize("");
      setMessage("");
    } catch {
      toast.error("Something went wrong. Please WhatsApp us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "What is Bond Cleaning", href: "#what-is-bond-cleaning" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-background font-body" id="home">
      <Toaster />

      {/* ===================== NAV ===================== */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border shadow-xs">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <a
            href="#home"
            className="flex items-center gap-2"
            data-ocid="nav.link"
          >
            <img
              src="/assets/generated/humpty-dumpty-logo-transparent.dim_300x300.png"
              alt="Humpty Dumpty Bond Cleaning logo — professional bond cleaners in Redlands Bay Brisbane"
              className="h-12 w-12 object-contain"
            />
            <div className="hidden sm:block">
              <div className="font-display font-bold text-primary text-lg leading-tight">
                Humpty Dumpty
              </div>
              <div className="text-xs text-muted-foreground leading-tight">
                Bond Cleaning
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Main navigation"
          >
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                data-ocid="nav.link"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
              data-ocid="nav.primary_button"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <button
              type="button"
              className="md:hidden p-2 rounded-md hover:bg-secondary"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-border px-4 py-3">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="block py-2.5 text-sm font-medium text-foreground hover:text-primary"
                onClick={() => setMobileOpen(false)}
                data-ocid="nav.link"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main>
        {/* ===================== HERO ===================== */}
        <section
          className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(to bottom right, oklch(0.18 0.08 155 / 0.82), oklch(0.35 0.12 155 / 0.75)), url('/assets/generated/hero-bond-cleaning.dim_1200x600.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container mx-auto px-4 text-center py-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Badge className="mb-6 bg-accent text-accent-foreground font-semibold text-sm px-4 py-1">
                ⭐ Redlands Bay's Most Trusted Bond Cleaners
              </Badge>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Professional Bond Cleaning in Redlands Bay —{" "}
                <span className="text-accent">
                  Get Your Bond Back, Guaranteed!
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10">
                We make your rental property sparkle so you get every dollar of
                your bond back. Fully insured, police-checked cleaners serving
                Redlands Bay and all Brisbane bayside suburbs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-8 py-4 rounded-full text-lg transition-colors shadow-lg"
                  data-ocid="hero.primary_button"
                >
                  <MessageCircle className="h-5 w-5" />
                  Get a Free Quote on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-2 bg-white text-primary hover:bg-secondary font-bold px-8 py-4 rounded-full text-lg transition-colors shadow-lg"
                  data-ocid="hero.secondary_button"
                >
                  Book Now
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===================== TRUST BADGES ===================== */}
        <section className="bg-primary py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: <CheckCircle2 className="h-6 w-6" />,
                  text: "100% Bond Back Guarantee",
                },
                {
                  icon: <Shield className="h-6 w-6" />,
                  text: "Fully Insured & Police Checked",
                },
                {
                  icon: <MapPin className="h-6 w-6" />,
                  text: "Serving Redlands Bay & Brisbane",
                },
                {
                  icon: <Clock className="h-6 w-6" />,
                  text: "Same Day Availability",
                },
              ].map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-3 text-white"
                >
                  <div className="flex-shrink-0 text-accent">{badge.icon}</div>
                  <span className="font-semibold text-sm md:text-base">
                    {badge.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== WHAT IS BOND CLEANING ===================== */}
        <section id="what-is-bond-cleaning" className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                What is Bond Cleaning?
              </h2>
              <div className="prose prose-green max-w-none text-foreground space-y-4">
                <p className="text-lg leading-relaxed">
                  <strong>Bond cleaning</strong> (also called{" "}
                  <strong>end of lease cleaning</strong> or{" "}
                  <strong>exit cleaning</strong>) is a deep, thorough clean you
                  do when you move out of a rental property. Your landlord or
                  real estate agent checks everything before you leave. If the
                  place is not clean enough, they keep some — or all — of your
                  bond money.
                </p>
                <p className="text-lg leading-relaxed">
                  Bond cleaning makes sure everything is spotless so you get
                  your full bond back. Think of it like returning a borrowed toy
                  in exactly the same condition you received it — sparkling
                  clean and ready for the next person.
                </p>
                <p className="text-lg leading-relaxed">
                  In Queensland (QLD), it is a legal requirement that the
                  property is returned in the same condition as when you moved
                  in (fair wear and tear excluded). This means everything from
                  the tops of cupboards to the grout in bathroom tiles needs to
                  be spotless.
                </p>
                <p className="text-lg leading-relaxed">
                  Bond cleaning is much more detailed than a regular house
                  clean. It covers every inch of the property — walls, skirting
                  boards, window tracks, oven interiors, range hoods, grout
                  lines, ceiling fans, light fittings, and more. Most people
                  hire a professional bond cleaning company because it saves
                  time, removes stress, and gives you the best chance of a full
                  refund.
                </p>
                <p className="text-lg leading-relaxed">
                  At <strong>Humpty Dumpty Bond Cleaning</strong>, we know
                  exactly what real estate agents look for. We follow the{" "}
                  <strong>
                    REIQ (Real Estate Institute of Queensland) checklist
                  </strong>{" "}
                  so absolutely nothing gets missed. Our cleaners are trained,
                  police-checked, and fully insured — so you can relax while we
                  handle the hard work.
                </p>
                <p className="text-lg leading-relaxed">
                  Whether you're moving out of a studio unit or a large family
                  home, our professional team covers all rooms, all surfaces,
                  and all the tricky spots that property managers love to check.
                  We clean every kitchen cupboard inside and out, scrub every
                  tile and grout line, and leave your oven looking
                  factory-fresh. We mop every floor, vacuum every carpet, and
                  wipe every skirting board.
                </p>
                <p className="text-lg leading-relaxed">
                  We serve{" "}
                  <strong>
                    Redlands Bay, Cleveland, Capalaba, Victoria Point,
                    Thornlands, Mount Cotton, Birkdale, Wellington Point
                  </strong>
                  , and all surrounding Brisbane bayside suburbs.
                </p>
                <p className="text-lg leading-relaxed">
                  Getting a quote is easy — just WhatsApp us on{" "}
                  <a
                    href={WA_LINK}
                    className="text-primary font-semibold hover:underline"
                  >
                    {WA_NUM}
                  </a>{" "}
                  and we will give you a free quote within minutes. No hidden
                  fees, no surprises.
                </p>
              </div>
            </motion.div>

            {/* Why Bond Cleaning Matters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-16"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why is Bond Cleaning Important?
              </h2>
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="space-y-4 text-foreground">
                  <p className="text-lg leading-relaxed">
                    Your bond is usually <strong>4 weeks rent</strong>. In
                    Brisbane and Redlands Bay, that can be anywhere from{" "}
                    <strong>$2,000 to $5,000 or more</strong>. That's a lot of
                    money to lose!
                  </p>
                  <p className="text-lg leading-relaxed">
                    If you fail the exit inspection, your landlord or property
                    manager can deduct the cost of professional cleaning from
                    your bond. That means you lose real dollars from your
                    pocket.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Bond cleaning also protects your{" "}
                    <strong>rental history</strong>. Landlords check your rental
                    record when you apply for future rentals. A bad exit can
                    make it harder to rent again.
                  </p>
                  <p className="text-lg leading-relaxed">
                    A professional bond clean by Humpty Dumpty Bond Cleaning
                    gives you{" "}
                    <strong>
                      peace of mind and a 100% bond back guarantee
                    </strong>
                    . We come back for free if your agent is not happy — that's
                    our promise to you.
                  </p>
                </div>
                <Card className="bg-secondary border-none shadow-card">
                  <CardContent className="p-6">
                    <h3 className="font-display text-xl font-bold text-foreground mb-4">
                      What Happens If You Don't Bond Clean?
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Agent deducts cleaning costs from your bond",
                        "You could lose $500–$2,000+ from your deposit",
                        "Your rental history is affected",
                        "Harder to rent a new property in the future",
                        "Stressful disputes with landlords",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm"
                        >
                          <span className="text-destructive font-bold mt-0.5">
                            ✕
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-4 border-t border-border">
                      <h4 className="font-semibold text-sm mb-2">
                        With Humpty Dumpty Bond Cleaning:
                      </h4>
                      <ul className="space-y-2">
                        {[
                          "Full bond refund — guaranteed",
                          "Free re-clean if agent isn't satisfied",
                          "Stress-free move-out experience",
                        ].map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm"
                          >
                            <span className="text-primary font-bold mt-0.5">
                              ✓
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* What's Included Checklist */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-16"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                What Does Bond Cleaning Include?
              </h2>
              <p className="text-lg text-foreground mb-8">
                A full bond clean covers every room and surface. Here's what we
                tick off for you:
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    room: "🍳 Kitchen",
                    items: [
                      "Oven inside & out",
                      "Range hood & filters",
                      "Benchtops & splashbacks",
                      "Cupboards inside & out",
                      "Sink & taps",
                      "Tiles & grout",
                      "Dishwasher",
                      "Microwave",
                    ],
                  },
                  {
                    room: "🚿 Bathrooms",
                    items: [
                      "Toilet, seat & base",
                      "Shower screen & tiles",
                      "Bath & grout lines",
                      "Basin & taps",
                      "Mirrors",
                      "Exhaust fans",
                      "Floor mopped",
                    ],
                  },
                  {
                    room: "🛏️ Bedrooms & Living",
                    items: [
                      "Walls wiped",
                      "Skirting boards",
                      "Light switches",
                      "Ceiling fans",
                      "Windows inside",
                      "Door frames",
                      "Wardrobes inside",
                      "Cobwebs removed",
                    ],
                  },
                  {
                    room: "🧺 Laundry",
                    items: [
                      "Tub & taps",
                      "Cupboards inside",
                      "Floor mopped",
                      "Lint filter cleaned",
                    ],
                  },
                  {
                    room: "🚗 Garage & Outdoor",
                    items: [
                      "Garage floor swept",
                      "Walls wiped",
                      "Balcony swept & mopped",
                      "External doors wiped",
                    ],
                  },
                  {
                    room: "🏠 Whole Property",
                    items: [
                      "All floors mopped",
                      "All carpets vacuumed",
                      "Light fittings cleaned",
                      "Air con filters",
                      "Cobwebs throughout",
                    ],
                  },
                ].map((section) => (
                  <Card
                    key={section.room}
                    className="border border-border shadow-xs hover:shadow-card transition-shadow"
                  >
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-3">
                        {section.room}
                      </h3>
                      <ul className="space-y-1">
                        {section.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===================== SERVICES ===================== */}
        <section id="services" className="py-20 bg-secondary/40">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Bond Cleaning Services in Redlands Bay
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From general bond cleans to specialist oven and carpet cleaning
                — we've got you fully covered.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Service 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden shadow-card h-full">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src="/assets/generated/kitchen-cleaning.dim_800x500.jpg"
                      alt="Professional general bond cleaning service in Redlands Bay — full end of lease clean kitchen"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-primary text-white font-semibold">
                        Most Popular
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                      General Bond Cleaning
                    </h3>
                    <div className="space-y-3 text-foreground text-sm leading-relaxed">
                      <p>
                        Our <strong>general bond clean</strong> is a full
                        end-of-lease clean covering your entire property. We
                        clean every room from top to bottom, following the REIQ
                        exit condition checklist. This is exactly what your
                        property manager uses at inspection — so we tick every
                        box.
                      </p>
                      <p>
                        Our team wipes down all walls, removes cobwebs, cleans
                        light fittings and switches, and wipes all skirting
                        boards and door frames. We clean inside every cupboard
                        and wardrobe, wipe all shelves, and remove marks and
                        stains from surfaces throughout the property.
                      </p>
                      <p>
                        In the kitchen, we degrease the stovetop, clean the oven
                        inside and out, degrease the range hood and filters,
                        clean the microwave and dishwasher, scrub benchtops and
                        splashbacks, and polish the sink. We scrub all tiles and
                        grout until they shine.
                      </p>
                      <p>
                        We mop all hard floors and vacuum all carpeted areas. In
                        bathrooms, we scrub the toilet, basin, shower, bath,
                        mirrors, and exhaust fans until they're spotless.
                      </p>
                      <p>
                        We leave no stone unturned — your bond money depends on
                        it. All our cleaning products are strong enough to get
                        the job done but safe for your family and pets. We bring
                        everything we need. You don't have to buy or provide a
                        thing.
                      </p>
                      <p>
                        Our cleaners are trained, police-checked, and fully
                        insured. We offer a{" "}
                        <strong>free re-clean guarantee</strong>: if your agent
                        is not happy, we come back and fix it at no extra cost.
                      </p>
                    </div>
                    <a
                      href={WA_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
                      data-ocid="services.primary_button"
                    >
                      <MessageCircle className="h-4 w-4" /> Get a Free Quote
                    </a>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Service 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="overflow-hidden shadow-card h-full">
                  <div className="h-52 overflow-hidden">
                    <img
                      src="/assets/generated/bond-cleaning-bathroom.dim_800x500.jpg"
                      alt="Professional bathroom and toilet cleaning for bond inspection in Redlands Bay Brisbane"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                      Bathroom & Toilet Cleaning
                    </h3>
                    <div className="space-y-3 text-foreground text-sm leading-relaxed">
                      <p>
                        The bathroom is the{" "}
                        <strong>first place property managers check</strong>. We
                        leave it looking brand new. Our specialist bathroom
                        cleaning service tackles every surface with
                        professional-grade products that cut through soap scum,
                        hard water stains, and mould in minutes.
                      </p>
                      <p>
                        We scrub the toilet bowl, seat, lid, and base. We clean
                        the shower screen and remove hard water stains and soap
                        scum that regular products can't touch. We scrub tiles
                        from floor to ceiling and clean grout lines until
                        they're white and fresh.
                      </p>
                      <p>
                        We polish the basin, taps, and mirrors until they shine
                        like new. We clean the exhaust fan to remove built-up
                        dust and grime. We mop the floor and wipe every surface.
                        We disinfect everything for hygiene — leaving the
                        bathroom genuinely fresh and clean.
                      </p>
                      <p>
                        Hard water stains and soap scum are tough. Regular
                        cleaning products from the supermarket often can't shift
                        them. Our professional-grade degreasers and descalers
                        break down the toughest build-up fast. We use the
                        20-minute rule — letting products soak before scrubbing
                        — so you get a deeper, better result every time.
                      </p>
                      <p>
                        A sparkling bathroom tells the property manager you've
                        taken care of the home. Don't risk losing your bond over
                        a dirty bathroom. We serve Redlands Bay, Cleveland,
                        Capalaba, Victoria Point, and all surrounding suburbs.
                      </p>
                    </div>
                    <a
                      href={WA_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
                      data-ocid="services.primary_button"
                    >
                      <MessageCircle className="h-4 w-4" /> Get a Free Quote
                    </a>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Service 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <Card className="overflow-hidden shadow-card h-full">
                  <div className="h-52 overflow-hidden">
                    <img
                      src="/assets/generated/carpet-cleaning.dim_800x500.jpg"
                      alt="Professional carpet steam cleaning for bond clean Redlands Bay Brisbane"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                      Carpet Steam Cleaning
                    </h3>
                    <div className="space-y-3 text-foreground text-sm leading-relaxed">
                      <p>
                        Carpets are one of the trickiest parts of bond cleaning.
                        Property managers run their eyes — and sometimes their
                        fingers — over every carpet. Stains, odours, and
                        flattened fibres can all cost you your bond money.
                      </p>
                      <p>
                        Our professional <strong>carpet steam cleaning</strong>{" "}
                        removes dirt, allergens, pet dander, and deep stains
                        that regular vacuuming simply cannot touch. We use{" "}
                        <strong>hot water extraction (steam cleaning)</strong> —
                        the method recommended by most carpet manufacturers and
                        preferred by real estate agents.
                      </p>
                      <p>
                        The process is simple: we inject hot water and cleaning
                        solution deep into the carpet fibres and extract it,
                        pulling out all the dirt and bacteria. It leaves carpets
                        fresh, fluffy, and almost like new. The result is
                        impressive — guests often think the carpet has been
                        replaced!
                      </p>
                      <p>
                        We can treat most common stains including food, drink,
                        mud, red wine, and pet accidents. For stubborn odours,
                        we use specialist deodorising treatments that neutralise
                        smells at the source rather than just masking them.
                      </p>
                      <p>
                        We recommend carpet steam cleaning as part of every full
                        bond clean. In many cases, your lease agreement requires
                        it. Ask us when you book and we'll include it in your
                        quote at a great price. We cover Redlands Bay,
                        Thornlands, Mount Cotton, and all Brisbane bayside
                        suburbs.
                      </p>
                    </div>
                    <a
                      href={WA_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
                      data-ocid="services.primary_button"
                    >
                      <MessageCircle className="h-4 w-4" /> Get a Free Quote
                    </a>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Service 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="overflow-hidden shadow-card h-full">
                  <div className="h-52 overflow-hidden">
                    <img
                      src="/assets/generated/kitchen-cleaning.dim_800x500.jpg"
                      alt="Professional oven and kitchen deep cleaning service for bond clean in Brisbane"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                      Oven & Kitchen Deep Clean
                    </h3>
                    <div className="space-y-3 text-foreground text-sm leading-relaxed">
                      <p>
                        The oven is one of the{" "}
                        <strong>hardest things to clean</strong> in any home —
                        and one of the most-checked items on a bond inspection.
                        Grease, burnt-on food, and carbon build-up are stubborn.
                        Normal oven cleaners from the supermarket often don't
                        cut it.
                      </p>
                      <p>
                        Our oven cleaning specialists use{" "}
                        <strong>professional-grade degreasers and tools</strong>{" "}
                        to get your oven looking factory-clean. We remove all
                        oven racks and soak them in a degreasing solution. We
                        clean the oven door glass inside and out — removing the
                        black carbon residue that makes ovens look old and
                        neglected.
                      </p>
                      <p>
                        We scrub the oven walls, floor, and ceiling. We clean
                        the stovetop, burners, and drip trays. We degrease the
                        range hood, filters, and fan — removing the sticky
                        grease that builds up with cooking. We wipe down the
                        microwave inside and out, clean the dishwasher filter
                        and door seals, and polish all benchtops and
                        splashbacks.
                      </p>
                      <p>
                        We leave the entire kitchen smelling fresh and looking
                        completely spotless. A clean kitchen dramatically
                        improves your chances of passing inspection and getting
                        your full bond back. We use food-safe cleaning products
                        — so it's safe for your family and pets.
                      </p>
                      <p>
                        Book your kitchen deep clean as a standalone service or
                        as part of a full bond clean package. We serve Redlands
                        Bay, Cleveland, Capalaba, and all Brisbane suburbs.
                        WhatsApp us for a fast, free quote.
                      </p>
                    </div>
                    <a
                      href={WA_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
                      data-ocid="services.primary_button"
                    >
                      <MessageCircle className="h-4 w-4" /> Get a Free Quote
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===================== FAQ ===================== */}
        <section id="faq" className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground text-lg">
                Everything you need to know about bond cleaning in Redlands Bay
                and Brisbane.
              </p>
            </motion.div>

            <Accordion
              type="single"
              collapsible
              className="space-y-3"
              data-ocid="faq.panel"
            >
              {[
                {
                  q: "What is Bond Cleaning and why is it required?",
                  a: "Bond cleaning is a thorough, top-to-bottom clean of a rental property when you move out. It is required in Australia because your landlord or real estate agent needs the property returned in the same condition as when you moved in. If you don't clean it properly, they can deduct money from your bond (security deposit) to pay for professional cleaning. In Queensland, the RTA (Residential Tenancies Authority) sets the rules. Bond cleaning protects your money and your rental history.",
                },
                {
                  q: "Why is Bond Cleaning Important?",
                  a: "Your bond is usually 4 weeks rent — that can be thousands of dollars. If you fail the exit inspection, you lose some or all of that money. Bond cleaning gives you the best chance of getting every dollar back. It also protects your rental history, which landlords check when you apply for future rentals. A professional bond clean by Humpty Dumpty Bond Cleaning gives you peace of mind and a 100% bond back guarantee.",
                },
                {
                  q: "How much does a bond clean cost?",
                  a: "The cost of a bond clean in Brisbane and Redlands Bay depends on the size of your property. Rough guide: 1 bedroom unit from $250–$350, 2 bedroom unit from $350–$450, 3 bedroom house from $450–$600, 4 bedroom house from $600–$800+. Carpet steam cleaning and oven cleaning may be extra. WhatsApp us on 0488841883 for a free, fast quote tailored to your home.",
                },
                {
                  q: "What is a full bond clean?",
                  a: "A full bond clean covers every room and surface in the property: kitchen (oven, range hood, benchtops, cupboards), bathrooms (tiles, grout, shower, toilet, mirrors), all bedrooms and living areas (walls, skirting boards, windows, ceiling fans), laundry, garage, and balcony. It follows the REIQ exit condition checklist — the same checklist your property manager uses at inspection.",
                },
                {
                  q: "Which are the top rated bond cleaning companies near me?",
                  a: null,
                  custom: (
                    <div className="text-sm space-y-4">
                      <p>
                        Here are the top 5 bond cleaning companies in Brisbane
                        and Redlands Bay:
                      </p>
                      {[
                        {
                          rank: 1,
                          name: "Humpty Dumpty Bond Cleaning",
                          href: null,
                          desc: "Local experts in Redlands Bay and Brisbane bayside. We offer 100% bond back guarantee, fully insured and police-checked cleaners, and same-day service. Friendly, reliable, and affordable. WhatsApp 0488841883.",
                          badge: "⭐ Our Top Pick",
                        },
                        {
                          rank: 2,
                          name: "NCOCA Bond Cleaning Brisbane",
                          href: "https://ncocabondcleaning.com.au",
                          desc: "A well-known Brisbane bond cleaning service with a large team and experience across multiple suburbs. They offer end of lease cleans with a satisfaction guarantee and serve most Brisbane suburbs.",
                          badge: null,
                        },
                        {
                          rank: 3,
                          name: "Jim's Cleaning",
                          href: "https://jimscleaning.com.au",
                          desc: "Part of the nationwide Jim's franchise network. They cover most of Australia including Brisbane and Redlands Bay. They offer end of lease cleaning with a re-clean guarantee and a variety of cleaning packages.",
                          badge: null,
                        },
                        {
                          rank: 4,
                          name: "Fantastic Cleaners Brisbane",
                          href: "https://www.fantasticcleaners.com.au/brisbane",
                          desc: "A large cleaning service platform operating in Brisbane. They offer fixed-price bond cleaning packages, real-time booking online, and a bond back guarantee. Good option for people who want to book quickly online.",
                          badge: null,
                        },
                        {
                          rank: 5,
                          name: "Tru Bond Cleaning Brisbane",
                          href: "https://trubondcleaningbrisbane.com",
                          desc: "Tru Bond Cleaning is a professional bond cleaning company serving Brisbane and surrounding areas. They specialise in end of lease cleans and have built a strong reputation for thoroughness and attention to detail. Their team follows strict real estate agent checklists and offers a satisfaction guarantee. They cover a wide range of suburbs and are known for their competitive pricing and prompt service.",
                          badge: null,
                        },
                      ].map((company) => (
                        <div
                          key={company.rank}
                          className="flex gap-3 p-3 rounded-lg bg-secondary/50"
                        >
                          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center">
                            {company.rank}
                          </div>
                          <div>
                            <div className="font-semibold text-foreground flex items-center gap-2">
                              {company.href ? (
                                <a
                                  href={company.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-primary hover:underline"
                                >
                                  {company.name}
                                </a>
                              ) : (
                                company.name
                              )}
                              {company.badge && (
                                <span className="text-xs bg-accent/20 text-accent-foreground px-2 py-0.5 rounded-full font-medium">
                                  {company.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-muted-foreground mt-1">
                              {company.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ),
                },
                {
                  q: "Which cleaning products are best for bond cleaning?",
                  a: null,
                  custom: (
                    <div className="text-sm space-y-3">
                      <p>
                        Here are the best cleaning products for a bond clean:
                      </p>
                      {[
                        {
                          name: "Exit Mould",
                          desc: "Best for bathroom mould and mildew",
                          href: "https://www.bunnings.com.au",
                        },
                        {
                          name: "Easy-Off Oven Cleaner",
                          desc: "Cuts through oven grease fast — available at Bunnings and Woolworths",
                          href: "https://www.bunnings.com.au",
                        },
                        {
                          name: "Goo Gone",
                          desc: "Removes sticky residue and sticker marks",
                          href: "https://www.bunnings.com.au",
                        },
                        {
                          name: "CLR (Calcium Lime Rust Remover)",
                          desc: "Great for hard water stains on taps and shower screens",
                          href: "https://www.bunnings.com.au",
                        },
                        {
                          name: "Selleys Sugar Soap",
                          desc: "Perfect for cleaning walls and removing marks",
                          href: "https://www.bunnings.com.au",
                        },
                        {
                          name: "White King Bleach",
                          desc: "Kills bathroom bacteria and whitens grout",
                          href: "https://www.bunnings.com.au",
                        },
                      ].map((product) => (
                        <div
                          key={product.name}
                          className="flex items-start gap-2"
                        >
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>
                            <a
                              href={product.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-primary hover:underline"
                            >
                              {product.name}
                            </a>{" "}
                            — {product.desc}
                          </span>
                        </div>
                      ))}
                      <p className="text-muted-foreground">
                        Professional cleaners use commercial-grade versions that
                        are stronger and faster than store-bought versions.
                      </p>
                    </div>
                  ),
                },
                {
                  q: "How much does professional bond cleaning typically cost?",
                  a: "In Brisbane and Redlands Bay: 1 bed from ~$250, 2 bed from ~$350, 3 bed from ~$450–$550, 4 bed from ~$600+. Prices vary based on property condition and extra services (carpet steam cleaning, oven clean). Always get a written quote. WhatsApp Humpty Dumpty Bond Cleaning on 0488841883 for your free quote.",
                },
                {
                  q: "What products are best for bond cleaning carpets?",
                  a: null,
                  custom: (
                    <div className="text-sm space-y-3">
                      {[
                        {
                          name: "Bissell Pet Stain & Odour Remover",
                          desc: "Great for pet stains",
                          href: "https://www.amazon.com.au",
                        },
                        {
                          name: "Woolite Carpet Cleaner",
                          desc: "Gentle on carpet fibres, effective on stains (Woolworths/Coles)",
                          href: "https://www.woolworths.com.au",
                        },
                        {
                          name: "Vanish Carpet Powder",
                          desc: "Good for general freshening and light stains (Woolworths/Coles)",
                          href: "https://www.woolworths.com.au",
                        },
                        {
                          name: "1001 Carpet Fresh",
                          desc: "Deodorises carpet quickly",
                          href: "https://www.amazon.com.au",
                        },
                      ].map((product) => (
                        <div
                          key={product.name}
                          className="flex items-start gap-2"
                        >
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>
                            <a
                              href={product.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-primary hover:underline"
                            >
                              {product.name}
                            </a>{" "}
                            — {product.desc}
                          </span>
                        </div>
                      ))}
                      <p className="text-muted-foreground mt-2">
                        For serious stains, professional steam cleaning (hot
                        water extraction) is the only reliable solution. Humpty
                        Dumpty Bond Cleaning offers professional carpet steam
                        cleaning — WhatsApp 0488841883.
                      </p>
                    </div>
                  ),
                },
                {
                  q: "How do I choose a reliable bond cleaner?",
                  a: "Look for: (1) Bond back guarantee — will they re-clean for free if the agent isn't happy? (2) Insurance — are they insured if something gets damaged? (3) Police checks — are cleaners background checked? (4) Reviews — check Google Reviews and Facebook. (5) Experience with REIQ checklists — do they follow the real estate agent's exit condition report? (6) Transparent pricing — do they give written quotes? Humpty Dumpty Bond Cleaning ticks all these boxes. WhatsApp us on 0488841883.",
                },
                {
                  q: "Can I book a bond cleaning company online with a Satisfaction Guarantee?",
                  a: "Yes! You can book Humpty Dumpty Bond Cleaning right now via WhatsApp on 0488841883. We offer a 100% satisfaction guarantee — if your property manager is not happy, we come back and re-clean at no extra cost. Booking is fast and easy. Just send us a message with your address and move-out date and we'll get back to you with a free quote within minutes.",
                },
                {
                  q: "How much is a cleaner per hour in Brisbane?",
                  a: "In Brisbane, a professional cleaner charges approximately $35–$55 per hour. Bond cleaners typically charge a fixed price per property rather than hourly, as the job needs to meet inspection standards regardless of how long it takes. A fixed-price bond clean gives you certainty and a guarantee — which hourly cleaning does not always include.",
                },
                {
                  q: "How much is an end of lease clean in Australia?",
                  a: "Nationally, end of lease cleaning costs roughly $250–$800+ depending on property size and location. In Brisbane and Redlands Bay: small unit from $250, medium house from $400–$550, large house from $600+. Add $80–$150 for carpet steam cleaning. Always get a written quote from a trusted local company like Humpty Dumpty Bond Cleaning.",
                },
                {
                  q: "How much do you pay a cleaner for 3 hours?",
                  a: "At the standard Brisbane rate of $35–$55 per hour, 3 hours of cleaning costs $105–$165. However, bond cleaning is rarely done by the hour because it needs to meet a specific inspection standard. A fixed-price bond clean is always the better option — you pay one price and the job is done to guarantee standard, no matter how long it takes.",
                },
                {
                  q: "What is the 20 minute rule in cleaning?",
                  a: "The 20-minute rule means leaving cleaning products to soak and work for at least 20 minutes before scrubbing. This is especially important for ovens, bathroom tiles, and grout. Letting the product sit gives it time to break down grease and grime, making scrubbing easier and the result much better. Professional cleaners always follow this rule — it's one of the reasons professional cleans get better results than DIY attempts.",
                },
                {
                  q: "What is end of lease cleaning?",
                  a: "End of lease cleaning is the same as bond cleaning. It is the thorough clean you do when you move out of a rental property to return it in the same condition as when you moved in. It covers every room and surface, following the property manager's exit condition checklist. It is required under Australian tenancy law and is essential if you want your full bond refunded.",
                },
                {
                  q: "Is bond cleaning required in QLD?",
                  a: "Yes. Under the Residential Tenancies and Rooming Accommodation Act 2008 (QLD), tenants must return the property in the same condition as the start of the tenancy (allowing for fair wear and tear). This effectively requires a thorough bond clean. If you don't, the landlord can claim cleaning costs from your bond. Many landlords require professional receipts as proof of a professional clean.",
                },
                {
                  q: "How long does a bond clean take?",
                  a: "A 2-bedroom unit typically takes 4–6 hours. A 3-bedroom house takes 6–8 hours. A 4-bedroom house can take 8–10 hours or more. The time depends on the size and condition of the property. Professional teams work faster because they have the right tools, products, and training.",
                },
                {
                  q: "Do I need to be home during bond cleaning?",
                  a: "No, you don't need to be home. Most people hand over a key and return after the clean is done. Our cleaners are police-checked and fully insured, so you can trust them with your property. We'll let you know when we're done and you can check it before handing the keys to your agent.",
                },
                {
                  q: "Does bond cleaning include windows?",
                  a: "Standard bond cleaning includes cleaning windows on the inside. External window cleaning is sometimes an add-on service. Ask us when you get your quote — we can include internal and external windows if needed. Clean windows make a big impression at inspection.",
                },
                {
                  q: "What happens if I fail a bond inspection?",
                  a: "If your property manager is not satisfied with the cleanliness, they can request a re-clean or deduct costs from your bond. With Humpty Dumpty Bond Cleaning, this rarely happens because we follow the REIQ checklist and our standard is very high. But if it does happen, we come back and re-clean for free under our bond back guarantee. Your bond is our responsibility too.",
                },
              ].map((faq, index) => (
                <AccordionItem
                  key={faq.q}
                  value={`item-${index}`}
                  className="border border-border rounded-lg px-4 bg-white shadow-xs"
                  data-ocid={`faq.item.${index + 1}`}
                >
                  <AccordionTrigger className="font-semibold text-foreground text-left hover:no-underline py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 text-sm leading-relaxed">
                    {faq.custom ?? faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ===================== REVIEWS STRIP ===================== */}
        <section className="bg-primary/10 py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8">
              What Our Customers Say
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  name: "Sarah M., Redlands Bay",
                  text: "Got my full bond back! The team was fantastic, super thorough and friendly. Highly recommend.",
                  stars: 5,
                },
                {
                  name: "James T., Cleveland",
                  text: "Best bond cleaners in Brisbane bayside. My agent was impressed. Used them twice now.",
                  stars: 5,
                },
                {
                  name: "Priya K., Capalaba",
                  text: "Amazing job on the oven and bathrooms. Looked like a brand new place when they were done!",
                  stars: 5,
                },
              ].map((review, i) => (
                <Card
                  key={review.name}
                  className="text-left shadow-card"
                  data-ocid={`reviews.item.${i + 1}`}
                >
                  <CardContent className="p-5">
                    <div className="flex gap-0.5 mb-3">
                      <Star
                        key="s1"
                        className="h-4 w-4 fill-accent text-accent"
                      />
                      <Star
                        key="s2"
                        className="h-4 w-4 fill-accent text-accent"
                      />
                      <Star
                        key="s3"
                        className="h-4 w-4 fill-accent text-accent"
                      />
                      <Star
                        key="s4"
                        className="h-4 w-4 fill-accent text-accent"
                      />
                      <Star
                        key="s5"
                        className="h-4 w-4 fill-accent text-accent"
                      />
                    </div>
                    <p className="text-sm text-foreground mb-3 italic">
                      "{review.text}"
                    </p>
                    <p className="text-xs font-semibold text-muted-foreground">
                      {review.name}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== CONTACT ===================== */}
        <section id="contact" className="py-20 bg-background" ref={contactRef}>
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Get Your Free Bond Cleaning Quote
                </h2>
                <p className="text-muted-foreground mb-6">
                  Fill in the form and we'll get back to you with a free,
                  no-obligation quote. Or — for the fastest response — just
                  WhatsApp us directly!
                </p>

                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-6 py-4 rounded-xl text-lg transition-colors shadow-lg mb-6 w-full justify-center"
                  data-ocid="contact.primary_button"
                >
                  <MessageCircle className="h-6 w-6" />
                  Chat on WhatsApp Now
                </a>
                <p className="text-sm text-muted-foreground text-center mb-8">
                  WhatsApp is the <strong>fastest way</strong> to get a quote —
                  we usually reply within minutes!
                </p>

                <div className="space-y-3">
                  {[
                    "100% Bond Back Guarantee",
                    "Free re-clean if agent isn't satisfied",
                    "Fully insured & police-checked cleaners",
                    "Serving Redlands Bay, Brisbane & surrounds",
                    "Fast, easy online booking via WhatsApp",
                  ].map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-2 text-sm"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="shadow-card">
                  <CardContent className="p-6">
                    <h3 className="font-display text-xl font-bold text-foreground mb-5">
                      Send an Enquiry
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="font-medium">
                          Name *
                        </Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your full name"
                          required
                          className="mt-1"
                          data-ocid="contact.input"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="font-medium">
                          Phone *
                        </Label>
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 0400 123 456"
                          required
                          className="mt-1"
                          data-ocid="contact.input"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="font-medium">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="mt-1"
                          data-ocid="contact.input"
                        />
                      </div>
                      <div>
                        <Label htmlFor="service" className="font-medium">
                          Service Type *
                        </Label>
                        <Select value={service} onValueChange={setService}>
                          <SelectTrigger
                            className="mt-1"
                            data-ocid="contact.select"
                          >
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="General Bond Clean">
                              General Bond Clean
                            </SelectItem>
                            <SelectItem value="Bathroom Clean">
                              Bathroom Clean
                            </SelectItem>
                            <SelectItem value="Carpet Steam Clean">
                              Carpet Steam Clean
                            </SelectItem>
                            <SelectItem value="Kitchen Deep Clean">
                              Kitchen Deep Clean
                            </SelectItem>
                            <SelectItem value="Full Bond Clean Package">
                              Full Bond Clean Package
                            </SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="propSize" className="font-medium">
                          Property Size
                        </Label>
                        <Select value={propSize} onValueChange={setPropSize}>
                          <SelectTrigger
                            className="mt-1"
                            data-ocid="contact.select"
                          >
                            <SelectValue placeholder="Select property size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Studio/1 Bed">
                              Studio / 1 Bed
                            </SelectItem>
                            <SelectItem value="2 Bed">2 Bed</SelectItem>
                            <SelectItem value="3 Bed">3 Bed</SelectItem>
                            <SelectItem value="4 Bed">4 Bed</SelectItem>
                            <SelectItem value="5+ Bed">5+ Bed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="message" className="font-medium">
                          Message / Special Requests
                        </Label>
                        <Textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tell us about your property, move-out date, or any special requests..."
                          className="mt-1 min-h-[100px]"
                          data-ocid="contact.textarea"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 text-base rounded-xl"
                        data-ocid="contact.submit_button"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                            Sending...
                          </>
                        ) : (
                          "Send Enquiry"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* ===================== FOOTER ===================== */}
      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/assets/generated/humpty-dumpty-logo-transparent.dim_300x300.png"
                  alt="Humpty Dumpty Bond Cleaning logo"
                  className="h-14 w-14 object-contain rounded-full bg-white/10"
                />
                <div>
                  <div className="font-display font-bold text-xl text-white">
                    Humpty Dumpty
                  </div>
                  <div className="text-sm text-white/70">Bond Cleaning</div>
                </div>
              </div>
              <p className="text-white/70 text-sm mb-3">
                Your bond back — guaranteed.
              </p>
              <p className="text-white/60 text-xs">
                Serving Redlands Bay, Cleveland, Capalaba, Victoria Point,
                Thornlands, Mount Cotton, Birkdale, Wellington Point & all
                Brisbane Bayside suburbs.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  { label: "Home", href: "#home" },
                  { label: "Services", href: "#services" },
                  { label: "FAQ", href: "#faq" },
                  { label: "Contact", href: "#contact" },
                ].map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                      data-ocid="footer.link"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Contact</h3>
              <div className="space-y-2">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                  data-ocid="footer.link"
                >
                  <Phone className="h-4 w-4" />
                  {WA_NUM}
                </a>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors mt-2"
                  data-ocid="footer.primary_button"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} Humpty Dumpty Bond Cleaning. All
              rights reserved.
            </p>
            <p className="text-xs text-white/50">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/80 underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ===================== FLOATING WHATSAPP ===================== */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white font-bold px-5 py-3 rounded-full shadow-2xl hover:bg-[#1ebe5d] transition-colors wa-pulse"
        data-ocid="floating.primary_button"
        aria-label="Chat on WhatsApp for a free bond cleaning quote"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline text-sm">Get Free Quote</span>
      </a>
    </div>
  );
}

export default App;
