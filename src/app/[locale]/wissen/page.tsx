import { useTranslations } from 'next-intl';
import { BookOpen, Siren, Building2, Banknote, ShieldAlert, Wrench, User, UserCheck, Home, Megaphone, ClipboardList, FileCheck, Brain, FileText, TrendingUp, Shield, GraduationCap, FileSearch, Table, FileSignature, Calculator, Award, Truck, FileBarChart, Key, Cloud, BarChart3, Image, Radar, UserCog, Code2, Factory, ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { getAllPillars } from '@/lib/pillars/registry';
import '@/lib/pillars/init';
import { PillarCard } from '@/components/pillars/pillar-card';

const QUICK_LINKS = [
  { href: '/wissen/notfall-kontakte', icon: Siren, colorClass: 'bg-red-500/10 text-red-500', labelKey: 'notfallKontakte' },
  { href: '/wissen/anlaufstellen', icon: Building2, colorClass: 'bg-blue-500/10 text-blue-500', labelKey: 'anlaufstellen' },
  { href: '/wissen/foerdermittel', icon: Banknote, colorClass: 'bg-emerald-500/10 text-emerald-500', labelKey: 'foerdermittel' },
  { href: '/wissen/mythen-faq', icon: ShieldAlert, colorClass: 'bg-amber-500/10 text-amber-500', labelKey: 'mythenFaq' },
  { href: '/wissen/tool-stack', icon: Wrench, colorClass: 'bg-violet-500/10 text-violet-500', labelKey: 'toolStack' },
  { href: '/wissen/freelancer-basics', icon: User, colorClass: 'bg-cyan-500/10 text-cyan-500', labelKey: 'freelancerBasics' },
  { href: '/wissen/solo-check', icon: UserCheck, colorClass: 'bg-rose-500/10 text-rose-500', labelKey: 'soloCheck' },
  { href: '/wissen/home-office', icon: Home, colorClass: 'bg-indigo-500/10 text-indigo-500', labelKey: 'homeOffice' },
  { href: '/wissen/hinweisgeberschutz', icon: Megaphone, colorClass: 'bg-orange-500/10 text-orange-500', labelKey: 'hinschg' },
  { href: '/wissen/checklisten', icon: ClipboardList, colorClass: 'bg-teal-500/10 text-teal-500', labelKey: 'checklisten' },
  { href: '/wissen/selbsterklaerung', icon: FileCheck, colorClass: 'bg-pink-500/10 text-pink-500', labelKey: 'selbsterklaerung' },
  { href: '/wissen/ki-check', icon: Brain, colorClass: 'bg-purple-500/10 text-purple-500', labelKey: 'kiCheck' },
  { href: '/wissen/vorlagen', icon: FileText, colorClass: 'bg-slate-500/10 text-slate-500', labelKey: 'vorlagen' },
  { href: '/wissen/fortschritt', icon: TrendingUp, colorClass: 'bg-lime-500/10 text-lime-500', labelKey: 'fortschritt' },
  { href: '/wissen/awareness-quiz', icon: Brain, colorClass: 'bg-fuchsia-500/10 text-fuchsia-500', labelKey: 'awarenessQuiz' },
  { href: '/wissen/schulungsnachweis', icon: GraduationCap, colorClass: 'bg-sky-500/10 text-sky-500', labelKey: 'schulungsnachweis' },
  { href: '/wissen/angriffspfade', icon: Shield, colorClass: 'bg-red-500/10 text-red-600', labelKey: 'angriffspfade' },
  { href: '/wissen/bedrohungen', icon: ShieldAlert, colorClass: 'bg-rose-500/10 text-rose-600', labelKey: 'bedrohungen' },
  { href: '/wissen/dsfa', icon: FileSearch, colorClass: 'bg-red-500/10 text-red-500', labelKey: 'dsfa' },
  { href: '/wissen/vvt', icon: Table, colorClass: 'bg-blue-500/10 text-blue-600', labelKey: 'vvt' },
  { href: '/wissen/avv', icon: FileSignature, colorClass: 'bg-violet-500/10 text-violet-600', labelKey: 'avv' },
  { href: '/wissen/cyber-versicherung', icon: Shield, colorClass: 'bg-emerald-500/10 text-emerald-600', labelKey: 'cyberVersicherung' },
  { href: '/wissen/kostenrechner', icon: Calculator, colorClass: 'bg-amber-500/10 text-amber-600', labelKey: 'kostenrechner' },
  { href: '/wissen/score-badge', icon: Award, colorClass: 'bg-yellow-500/10 text-yellow-600', labelKey: 'scoreBadge' },
  { href: '/wissen/lieferanten-ampel', icon: Truck, colorClass: 'bg-orange-500/10 text-orange-600', labelKey: 'lieferantenAmpel' },
  { href: '/wissen/jahresbericht', icon: FileBarChart, colorClass: 'bg-blue-500/10 text-blue-600', labelKey: 'jahresbericht' },
  { href: '/wissen/digitaler-nachlass', icon: Key, colorClass: 'bg-gray-500/10 text-gray-600', labelKey: 'digitalerNachlass' },
  { href: '/wissen/cloud-check', icon: Cloud, colorClass: 'bg-sky-500/10 text-sky-500', labelKey: 'cloudCheck' },
  { href: '/wissen/benchmark', icon: BarChart3, colorClass: 'bg-indigo-500/10 text-indigo-600', labelKey: 'benchmark' },
  { href: '/wissen/poster', icon: Image, colorClass: 'bg-pink-500/10 text-pink-600', labelKey: 'poster' },
  { href: '/wissen/radar', icon: Radar, colorClass: 'bg-red-500/10 text-red-500', labelKey: 'radar' },
  { href: '/wissen/berater-modus', icon: UserCog, colorClass: 'bg-emerald-500/10 text-emerald-600', labelKey: 'beraterModus' },
  { href: '/wissen/widget', icon: Code2, colorClass: 'bg-cyan-500/10 text-cyan-600', labelKey: 'widget' },
] as const;

export default function WissenPage() {
  const t = useTranslations();
  const tPages = useTranslations('wissenPages');
  const pillars = getAllPillars();

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <BookOpen className="size-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('pillars.title')}
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            {t('pillars.subtitle')}
          </p>
        </div>
      </section>

      {/* Quick Links to standalone Wissen pages */}
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {QUICK_LINKS.map(({ href, icon: Icon, colorClass, labelKey }) => (
            <Link
              key={href}
              href={href as any}
              className="group flex flex-col items-center gap-2 rounded-lg border p-3 text-center transition-colors hover:bg-muted/50 hover:border-primary/30"
            >
              <div className={`rounded-lg p-2 ${colorClass}`}>
                <Icon className="size-5" />
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors leading-tight">
                {tPages(`${labelKey}.title`)}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Industry-specific pages */}
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Link href={'/wissen/branchen' as any} className="group flex items-center justify-between rounded-xl border-2 border-primary/20 bg-primary/5 p-5 transition-colors hover:border-primary/40 hover:bg-primary/10">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <Factory className="size-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-base">{tPages('branchen.hub.title')}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">{tPages('branchen.hub.subtitle')}</p>
            </div>
          </div>
          <ArrowRight className="size-5 text-primary group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

      {/* 8 Pillars */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-xl font-bold text-center">{t('pillars.title')}</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pillars.map(pillar => (
            <PillarCard key={pillar.id} pillar={pillar} />
          ))}
        </div>
      </section>
    </div>
  );
}
