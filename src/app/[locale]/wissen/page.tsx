import { useTranslations } from 'next-intl';
import { BookOpen } from 'lucide-react';
import { getAllPillars } from '@/lib/pillars/registry';
import '@/lib/pillars/init';
import { PillarCard } from '@/components/pillars/pillar-card';

export default function WissenPage() {
  const t = useTranslations();
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

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pillars.map(pillar => (
            <PillarCard key={pillar.id} pillar={pillar} />
          ))}
        </div>
      </section>
    </div>
  );
}
