'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Clock, ChevronRight, X, ArrowRight } from 'lucide-react';

const CATEGORIES = ['All', 'Architecture', 'Design', 'Market', 'Lifestyle', 'Investment'];

const FEATURED = {
  category: 'Market',
  title: "The Gulf's New Golden Age: Why Ultra-Prime Buyers Are Choosing Dubai",
  excerpt: "Record transaction volumes, tax-free wealth preservation and a generation of world-class architecture have converged to make Dubai the world's most dynamic luxury property market.",
  author: 'Oliver Drummond',
  authorRole: 'Senior Market Analyst',
  readTime: '12 min read',
  date: 'May 2026',
  image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80',
  body: [
    "Dubai's transformation from a desert trading post to the world's most dynamic luxury real estate market has been one of the defining economic stories of the decade. In the first quarter of 2026 alone, transactions in the AED 10 million-plus bracket outpaced London — a city with three times the population and a property market twice as mature.",
    "What changed? Three things converged simultaneously: a generation of genuinely world-class architecture, a tax regime that makes Switzerland look burdensome, and a critical mass of ultra-high-net-worth buyers who discovered that Dubai was no longer a stepping stone — it was a destination.",
    "\"We're no longer selling Dubai to buyers who couldn't afford London,\" says one senior advisor at a major DIFC brokerage. \"We're selling it to people who could absolutely afford London — and are choosing not to.\"",
    "The numbers bear this out. Average sale prices for prime waterfront units on Palm Jumeirah now exceed £5,000 per square foot — broadly equivalent to Mayfair. The landmark One Za'abeel development, with its $1.3 billion price tag, sold out before the roof was poured.",
    "For private wealth advisors, the calculus is straightforward. A British UHNW individual pays 0% income tax on earnings generated overseas if resident in Dubai. Capital gains tax: 0%. Inheritance tax: 0%. Against a backdrop of rising UK taxes, this arithmetic has become persuasive enough to move families.",
    "The architectural story is equally compelling. Zaha Hadid Architects, Foster + Partners and Bjarke Ingels Group have all delivered landmark projects in Dubai in the past 36 months. The result is a skyline that increasingly challenges Singapore and Hong Kong for sheer visual ambition.",
    "Is it for everyone? No. The climate is extreme, the cultural context very different, and many families find the lack of an established European social ecosystem hard to replicate. But for those whose wealth is genuinely global and portable, Dubai has earned its place at the very top table of luxury property markets.",
  ],
};

const ARTICLES = [
  {
    category: 'Architecture',
    title: "The Architecture of Privacy: Inside the World's Most Discreet Homes",
    excerpt: "From underground bunkers to concealed cliff-top retreats, the wealthiest buyers are commissioning homes that cannot be seen, found — or photographed. We explore the new architecture of invisibility.",
    author: 'Cecilia Hartmann',
    authorRole: 'Architecture Correspondent',
    readTime: '8 min read',
    date: 'May 2026',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    body: [
      "The most coveted homes in the world share an unusual characteristic: they are almost impossible to find. Not because their owners wish to be anti-social, but because in an era of satellite photography, social media and increased scrutiny of private wealth, invisibility has become the ultimate luxury.",
      "Architects specialising in ultra-prime residential work describe a significant shift in client briefs over the past five years. Where once clients wanted statement architecture — visible from the road, photogenic from the air — the new ultra-prime buyer wants the opposite. They want a home that could be a farm building, a woodland, a hillside.",
      "The technical approaches vary. In the Scottish Highlands, one architect built a £28 million lodge that appears, from any angle, to be a natural granite outcrop. The windows are concealed within folds of the stone cladding. Solar panels are embedded beneath a living sedum roof. Even the driveway was designed to appear as a farm track.",
      "In London, the conversation is different. Here, the quest for privacy is played out underground. Basements are now a well-established feature of prime London property, but the new generation goes far beyond the swimming pool and cinema room of the 2010s. Several properties currently under construction beneath Belgravia and Mayfair extend to seven floors below street level, with footprints that dwarf the house above.",
    ],
  },
  {
    category: 'Design',
    title: "Inside a Monaco Penthouse: Casamidy Meets Uninterrupted Sea Views",
    excerpt: "A Hong Kong developer and a Belgian design duo create the principality's most talked-about interior — one that manages to be simultaneously theatrical and deeply personal.",
    author: 'Sophie Lenard',
    authorRole: 'Design Editor',
    readTime: '6 min read',
    date: 'May 2026',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
    body: [
      "There are very few interiors that make you stop breathing when you walk in. The penthouse at Le Rocher — Monaco's newest ultra-prime residential address — is one of them. Floor-to-ceiling glazing on three sides frames the Mediterranean in a way that makes the horizon feel like wallpaper. But it is not the view that stops you. It is what Anne-Marie and Piero Casamidy have done with everything else.",
      "The Brussels-based design duo, beloved by the international interior design set for their ability to create spaces that feel simultaneously ancient and new, were given an unusually free brief by the Hong Kong-based developer. 'Make it feel like it has always been here,' they were told. 'And make it feel like nowhere else on earth.'",
      "They responded with a palette drawn entirely from the landscape outside: the bleached limestone of the Cap d'Antibes, the silver-grey of the Mediterranean at dusk, the warm ochre of the old town's rooftops. Every piece of furniture was either commissioned or found — nothing was bought from a catalogue.",
    ],
  },
  {
    category: 'Market',
    title: "London's Super-Prime Rebound: What £20 Million Buys Today",
    excerpt: "After three years of cautious inactivity, buyers in the £10M-plus bracket are returning to Mayfair, Knightsbridge and Chelsea — and the market has changed significantly around them.",
    author: 'James Whitmore',
    authorRole: 'Head of Research',
    readTime: '10 min read',
    date: 'April 2026',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    body: [
      "London's super-prime residential market has spent the past three years in a holding pattern — buyers watching nervously as interest rates climbed, sterling wobbled and the government debated further property taxation. That period, by most accounts, is over.",
      "Transaction volumes in the £10 million-plus bracket are up 34% year-on-year in the first quarter of 2026. More significantly, the buyer profile has changed. The retreat of Russian buyers following 2022 sanctions has been more than offset by Indian, American and Middle Eastern buyers — many of whom are acquiring London property as a hedge against domestic political uncertainty.",
      "For sellers, the shift has been whiplash-inducing. Properties that sat quietly on discreet agents' lists for 18 months have suddenly acquired competitive interest. Several have sold above guide price — a rarity in this tier.",
      "So what does £20 million buy today? In Mayfair, it acquires approximately 4,000-5,000 square feet of lateral living, typically across a single floor of a converted period house or a modern purpose-built development. In Chelsea, the same money goes somewhat further — 5,000-6,500 square feet in a house rather than a flat. In Knightsbridge, the Hyde Park frontage commands a significant premium: a garden square overlooking the park will cost £25-30 million for a comparable footprint.",
    ],
  },
  {
    category: 'Lifestyle',
    title: "The New Rules of Country Living",
    excerpt: "Helicopter pads, gin distilleries and gigabit broadband. The English country house is being reinvented by a generation of buyers who refuse to choose between city and country.",
    author: 'Annabel Cross',
    authorRole: 'Lifestyle Editor',
    readTime: '7 min read',
    date: 'April 2026',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    body: [
      "The traditional country house buyer of the 1990s and 2000s had a clear formula: Georgian house, walled garden, trout stream, Aga, and a two-hour commute to London on Fridays. Their children — who inherited both the wealth and, often, the properties — have written an entirely different playbook.",
      "The new country house is productive. It earns its keep. The estate that once existed for weekend shooting parties now supports a working farm, a glamping operation, a wedding venue and, in more than a few cases, a distillery. Gin, whisky and cider have become the preferred agricultural diversification of the super-prime landowner, providing both revenue and a story to tell at dinner.",
      "Technology has changed everything. The arrival of satellite broadband — fast, reliable, available everywhere — has severed the last remaining umbilical cord between prime professional talent and city living. A hedge fund analyst who once needed to be within cycling distance of a Bloomberg terminal can now run the same screens from a barn conversion in the Cotswolds.",
      "The result is a genuine decoupling of location from career. Buyers who would previously have limited themselves to within 90 minutes of London are now looking at Scotland, Wales, Devon and Northumberland. The only non-negotiable is infrastructure: a good primary school, a helicopter pad or fast rail connection, and, of course, excellent broadband.",
    ],
  },
  {
    category: 'Investment',
    title: "Build-to-Rent: The Institutional Bet That Reshaped the London Market",
    excerpt: "How Blackstone, Greystar and a new generation of UK developers turned the rented sector into a £40 billion asset class — and what it means for the individual landlord.",
    author: 'Marcus Reid',
    authorRole: 'Investment Analyst',
    readTime: '9 min read',
    date: 'March 2026',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    body: [
      "When Greystar opened its first purpose-built rental tower in Canary Wharf in 2019, most of the buy-to-let community dismissed it as an American experiment that wouldn't translate. Seven years later, Build-to-Rent has quietly become one of the defining forces reshaping urban property investment in the United Kingdom.",
      "The numbers are now too large to ignore. The UK Build-to-Rent sector contains over 110,000 completed units and a pipeline of a further 200,000. Institutional capital — from US private equity, Canadian pension funds and Gulf sovereign wealth funds — has deployed over £40 billion into the sector since 2015. In 2025 alone, BTR attracted more institutional investment than any other real estate sector in the UK.",
      "For individual landlords, the picture is more complex. The professional management, amenity-rich offer and guaranteed occupancy of institutional BTR means it competes directly with the traditional buy-to-let flat for the same tenant pool. And it is winning.",
      "Yield compression in the buy-to-let market — driven by mortgage rate increases, stamp duty surcharges and increased regulatory burden — has pushed gross yields in prime London boroughs below 3.5%. Against this, an institutional BTR operator, benefiting from economies of scale and a lower cost of capital, can run profitably at yields that would destroy a private landlord's returns.",
    ],
  },
  {
    category: 'Design',
    title: "Wabi-Sabi and the Return of Natural Materials",
    excerpt: "In deliberate reaction to the polished minimalism of the 2010s, the world's most influential interior designers are embracing imperfection, texture and the honest beauty of raw materials.",
    author: 'Hana Miyamoto',
    authorRole: 'Contributing Editor',
    readTime: '5 min read',
    date: 'March 2026',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    body: [
      "There is a moment, in almost every conversation with a leading interior designer right now, when the word 'wabi-sabi' appears. The Japanese concept — which prizes the beauty of imperfection, transience and incompleteness — has become the animating philosophy of a generation of designers who grew up idolising the clean, polished, frictionless aesthetic of Jony Ive-era Apple and the Axel Vervoordt school of Belgian minimalism.",
      "They loved that world. And then they grew tired of it.",
      "The reaction has been swift and comprehensive. Hand-thrown ceramics instead of precision-machined tableware. Rough-sawn oak instead of lacquered cabinetry. Lime plaster walls instead of perfect Farrow & Ball. Stone that has not been polished to a reflective finish. Linen that has not been pressed. Timber that shows its grain, its knots, its age.",
      "For luxury residential property, the implications are significant. The ultra-smooth, ultra-white kitchen that was the universal aspiration of the 2010s buyer is now being stripped out and replaced — often at considerable cost — by something that looks, paradoxically, far more modest. Riven slate worktops. Hand-made bricks. Furniture that was clearly made by an individual rather than a machine.",
      "The irony is that this natural, imperfect, artisanal aesthetic is, if anything, more expensive to achieve than the polished minimalism it replaced. A bespoke hand-thrown ceramic tile programme for a master bathroom can cost three times as much as imported Italian marble.",
    ],
  },
];

function ArticleModal({ article, onClose }: {
  article: typeof ARTICLES[0] | null;
  onClose: () => void;
}) {
  if (!article) return null;
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-black/70 p-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative bg-[#F6F2EC] max-w-3xl w-full rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-64 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/80 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <X size={18} />
          </button>
          <div className="absolute bottom-4 left-6">
            <span className="inline-block px-2 py-0.5 text-xs font-medium bg-[#C9A96A] text-[#1C1A17] rounded mb-2">{article.category}</span>
            <h2 className="text-2xl font-light text-white lux-heading max-w-xl">{article.title}</h2>
          </div>
        </div>
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#E8E1D7]">
            <div>
              <p className="font-semibold text-[#1C1A17] text-sm">{article.author}</p>
              <p className="text-xs text-[#9A8B7A]">{article.authorRole}</p>
            </div>
            <div className="ml-auto flex items-center gap-4 text-xs text-[#9A8B7A]">
              <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
              <span>{article.date}</span>
            </div>
          </div>
          <div className="space-y-5">
            {article.body.map((para, i) => (
              <p key={i} className={`text-[#3B342D] leading-relaxed ${i === 0 ? 'text-lg font-light' : 'text-base'}`}>
                {para}
              </p>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-[#E8E1D7] flex justify-between items-center">
            <p className="text-xs text-[#9A8B7A]">Raxie Zenith Estate Editorial · {article.date}</p>
            <button onClick={onClose} className="lux-button-outline text-sm">Close</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function MagazinePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedFeatured, setExpandedFeatured] = useState(false);
  const [openArticle, setOpenArticle] = useState<typeof ARTICLES[0] | null>(null);

  const filtered = activeCategory === 'All'
    ? ARTICLES
    : ARTICLES.filter(a => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero Header */}
      <div className="bg-[#1C1A17] py-16 border-b border-[#C9A96A]/20">
        <div className="max-w-6xl mx-auto px-6 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-3">Editorial</p>
            <h1 className="text-5xl md:text-6xl font-light text-white lux-heading">The Magazine</h1>
          </div>
          <p className="hidden md:block text-[#9A8B7A] text-sm max-w-xs text-right font-light leading-relaxed">
            Architecture, design, markets and the art of exceptional living.
          </p>
        </div>
      </div>

      {/* Featured Article */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-0 lux-card overflow-hidden group">
            <div className="relative h-72 md:h-auto overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={FEATURED.image}
                alt={FEATURED.title}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1C1A17]/20 md:block hidden" />
            </div>
            <div className="bg-[#1C1A17] p-8 md:p-10 flex flex-col">
              <span className="inline-block self-start px-2 py-0.5 text-xs font-medium bg-[#C9A96A] text-[#1C1A17] rounded mb-4">
                {FEATURED.category} · Cover Story
              </span>
              <h2 className="text-2xl md:text-3xl font-light text-white lux-heading leading-snug mb-5">
                {FEATURED.title}
              </h2>
              <p className="text-[#9A8B7A] leading-relaxed text-sm mb-6 flex-1">
                {FEATURED.excerpt}
              </p>

              <AnimatePresence>
                {expandedFeatured && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mb-6"
                  >
                    <div className="space-y-4 border-t border-white/10 pt-6">
                      {FEATURED.body.map((para, i) => (
                        <p key={i} className="text-[#9A8B7A] text-sm leading-relaxed">{para}</p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                <div>
                  <p className="text-white text-sm font-medium">{FEATURED.author}</p>
                  <p className="text-[#C9A96A] text-xs">{FEATURED.authorRole}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[#5F5448] text-xs flex items-center gap-1">
                    <Clock size={11} /> {FEATURED.readTime}
                  </span>
                  <button
                    onClick={() => setExpandedFeatured(v => !v)}
                    className="flex items-center gap-1 text-[#C9A96A] text-sm hover:text-white transition-colors"
                  >
                    {expandedFeatured ? 'Collapse' : 'Read'}
                    <ChevronRight size={14} className={`transition-transform ${expandedFeatured ? 'rotate-90' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Category Filter */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-medium border transition-colors ${activeCategory === cat
                  ? 'bg-[#1C1A17] text-[#C9A96A] border-[#1C1A17]'
                  : 'bg-transparent text-[#7A6E60] border-[#E8E1D7] hover:border-[#C9A96A] hover:text-[#1C1A17]'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <ScrollReveal key={article.title}>
              <div className="lux-card overflow-hidden group flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 text-xs font-medium bg-[#C9A96A] text-[#1C1A17] rounded">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base font-semibold text-[#1C1A17] leading-snug mb-2 lux-heading">
                    {article.title}
                  </h3>
                  <p className="text-[#7A6E60] text-sm leading-relaxed flex-1 mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#E8E1D7]">
                    <div>
                      <p className="text-xs font-medium text-[#1C1A17]">{article.author}</p>
                      <p className="text-xs text-[#9A8B7A] flex items-center gap-1 mt-0.5">
                        <Clock size={10} /> {article.readTime} · {article.date}
                      </p>
                    </div>
                    <button
                      onClick={() => setOpenArticle(article)}
                      className="flex items-center gap-1 text-[#C9A96A] text-xs font-medium hover:text-[#1C1A17] transition-colors"
                    >
                      Read <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Article Modal */}
      <AnimatePresence>
        {openArticle && (
          <ArticleModal article={openArticle} onClose={() => setOpenArticle(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
