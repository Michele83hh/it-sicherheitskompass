import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { BookOpen, Truck, Heart, Factory, ShoppingCart, Monitor, Zap, Car, Landmark } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const INDUSTRIES = [
  { id: 'logistik', icon: Truck, color: 'bg-blue-500/10 text-blue-600' },
  { id: 'gesundheit', icon: Heart, color: 'bg-red-500/10 text-red-500' },
  { id: 'fertigung', icon: Factory, color: 'bg-amber-500/10 text-amber-600' },
  { id: 'handel', icon: ShoppingCart, color: 'bg-emerald-500/10 text-emerald-600' },
  { id: 'it-dienstleister', icon: Monitor, color: 'bg-violet-500/10 text-violet-600' },
  { id: 'energie', icon: Zap, color: 'bg-yellow-500/10 text-yellow-600' },
  { id: 'automotive', icon: Car, color: 'bg-orange-500/10 text-orange-600' },
  { id: 'finanzen', icon: Landmark, color: 'bg-cyan-500/10 text-cyan-600' },
] as const;

// Map URL slugs to i18n keys (kebab-case to camelCase where needed)
const SLUG_TO_KEY: Record<string, string> = {
  'logistik': 'logistik',
  'gesundheit': 'gesundheit',
  'fertigung': 'fertigung',
  'handel': 'handel',
  'it-dienstleister': 'itDienstleister',
  'energie': 'energie',
  'automotive': 'automotive',
  'finanzen': 'finanzen',
};

export default function BranchenHubPage() {
  const t = useTranslations('wissenPages.branchen.hub');
  const tB = useTranslations('wissenPages.branchen');

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 text-center flex flex-col items-center justify-center min-h-[14rem] sm:min-h-[16rem]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <BookOpen className="size-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <p className="mb-10 text-base leading-relaxed text-muted-foreground">{t('intro')}</p>

        <div className="grid gap-4 sm:grid-cols-2">
          {INDUSTRIES.map(({ id, icon: Icon, color }) => {
            const key = SLUG_TO_KEY[id];
            return (
              <Link key={id} href={`/wissen/branchen/${id}` as any}>
                <Card className="h-full border-2 transition-colors hover:border-primary/40 hover:bg-muted/30 cursor-pointer">
                  <CardContent className="flex items-start gap-4 pt-5">
                    <div className={`rounded-lg p-3 ${color}`}>
                      <Icon className="size-6" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-bold text-base">{tB(`${key}.title` as any)}</h2>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{tB(`${key}.subtitle` as any)}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
