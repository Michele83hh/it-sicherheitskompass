'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Calculator, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { calculatePenalty, formatEur } from '@/lib/nis2/bussgeld';

interface BussgeldSectionProps {
  classification: 'besonders-wichtig' | 'wichtig';
  annualRevenue: number;
}

export function BussgeldSection({ classification, annualRevenue }: BussgeldSectionProps) {
  const t = useTranslations('bussgeld');
  const [revenue, setRevenue] = useState(annualRevenue || 0);

  const penalty = calculatePenalty(classification, revenue);

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center gap-2">
        <Calculator className="size-6 text-primary" />
        <h2 className="text-2xl font-bold">{t('title')}</h2>
      </div>
      <p className="mb-6 text-sm text-muted-foreground">{t('subtitle')}</p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Input */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t('classification')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Badge className={classification === 'besonders-wichtig' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
              {t(classification === 'besonders-wichtig' ? 'besondersWichtig' : 'wichtig')}
            </Badge>
            <div>
              <Label htmlFor="revenue">{t('annualRevenue')}</Label>
              <Input
                id="revenue"
                type="number"
                value={revenue || ''}
                onChange={(e) => setRevenue(Number(e.target.value))}
                placeholder="50000000"
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Result */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-base text-red-900">{t('maxPenalty')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-red-800">{t('fixedMax')}</span>
              <span className="font-semibold text-red-900">{formatEur(penalty.maxPenaltyAbsolute)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-red-800">{t('revenuePercentage')} ({penalty.revenuePercentage}%)</span>
              <span className="font-semibold text-red-900">{formatEur(penalty.maxPenaltyRevenueBased)}</span>
            </div>
            <div className="border-t border-red-200 pt-3">
              <div className="flex justify-between">
                <span className="font-semibold text-red-900">{t('applicableMax')}</span>
                <span className="text-2xl font-bold text-red-900">{formatEur(penalty.effectiveMaxPenalty)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        {t(`explanation.${classification === 'besonders-wichtig' ? 'besondersWichtig' : 'wichtig'}`)}
      </p>
      <p className="mt-2 text-xs text-muted-foreground">{t('note')}</p>
      <p className="mt-1 text-xs text-muted-foreground">{t('legalBasis')}</p>
    </section>
  );
}
