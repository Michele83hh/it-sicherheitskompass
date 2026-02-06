'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { NumericFormat } from 'react-number-format';
import { Info } from 'lucide-react';
import { useWizardStore } from '@/stores/wizard-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { WizardNavigation } from '../components/navigation';

export function CompanySizeStep() {
  const t = useTranslations('check.sizeStep');
  const tNav = useTranslations('check.navigation');
  const { formData, updateFormData, nextStep, prevStep } = useWizardStore();

  // Schema defined inside component to access t()
  const companySizeSchema = z.object({
    employees: z
      .number({ message: t('employeesRequired') })
      .min(1, t('employeesRequired')),
    annualRevenue: z
      .number({ message: t('revenueRequired') })
      .min(0, t('revenueRequired')),
    balanceSheet: z.number(),
    isKritis: z.boolean(),
  });

  type CompanySizeFormData = z.infer<typeof companySizeSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanySizeFormData>({
    resolver: zodResolver(companySizeSchema),
    mode: 'onSubmit',
    defaultValues: {
      employees: formData.employees || 0,
      annualRevenue: formData.annualRevenue || 0,
      balanceSheet: formData.balanceSheet || 0,
      isKritis: formData.isKritis || false,
    },
  });

  const onSubmit = (data: CompanySizeFormData) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        {/* Employee count */}
        <div className="space-y-2">
          <Label htmlFor="employees">{t('employeesLabel')}</Label>
          <Controller
            name="employees"
            control={control}
            render={({ field }) => (
              <NumericFormat
                id="employees"
                customInput={Input}
                type="text"
                inputMode="numeric"
                thousandSeparator="."
                decimalSeparator=","
                allowNegative={false}
                decimalScale={0}
                placeholder={t('employeesPlaceholder')}
                value={field.value || ''}
                onValueChange={(values) => field.onChange(values.floatValue ?? 0)}
                className={errors.employees ? 'border-red-500' : ''}
                aria-invalid={!!errors.employees}
                aria-describedby={errors.employees ? 'employees-error' : undefined}
              />
            )}
          />
          {errors.employees && (
            <p id="employees-error" className="text-sm text-red-600">
              {errors.employees.message}
            </p>
          )}
        </div>

        {/* Annual revenue */}
        <div className="space-y-2">
          <Label htmlFor="revenue">{t('revenueLabel')}</Label>
          <Controller
            name="annualRevenue"
            control={control}
            render={({ field }) => (
              <NumericFormat
                id="revenue"
                customInput={Input}
                type="text"
                inputMode="numeric"
                thousandSeparator="."
                decimalSeparator=","
                allowNegative={false}
                decimalScale={0}
                placeholder={t('revenuePlaceholder')}
                value={field.value || ''}
                onValueChange={(values) => field.onChange(values.floatValue ?? 0)}
                className={errors.annualRevenue ? 'border-red-500' : ''}
                aria-invalid={!!errors.annualRevenue}
                aria-describedby={errors.annualRevenue ? 'revenue-error' : undefined}
              />
            )}
          />
          {errors.annualRevenue && (
            <p id="revenue-error" className="text-sm text-red-600">
              {errors.annualRevenue.message}
            </p>
          )}
        </div>

        {/* Balance sheet (optional) */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="balanceSheet">
              {t('balanceSheetLabel')} <span className="text-muted-foreground">{t('balanceSheetOptional')}</span>
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger type="button" asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{t('balanceSheetTooltip')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Controller
            name="balanceSheet"
            control={control}
            render={({ field }) => (
              <NumericFormat
                id="balanceSheet"
                customInput={Input}
                type="text"
                inputMode="numeric"
                thousandSeparator="."
                decimalSeparator=","
                allowNegative={false}
                decimalScale={0}
                placeholder={t('balanceSheetPlaceholder')}
                value={field.value || ''}
                onValueChange={(values) => field.onChange(values.floatValue ?? 0)}
              />
            )}
          />
        </div>

        {/* KRITIS checkbox */}
        <div className="flex items-start gap-3 rounded-lg border bg-muted/50 p-4">
          <Controller
            name="isKritis"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="kritis"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <Label
                htmlFor="kritis"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t('kritisLabel')}
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger type="button" asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{t('kritisTooltip')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>

      <WizardNavigation
        isFirstStep={false}
        isLastStep={true}
        onBack={prevStep}
        backLabel={tNav('back')}
        submitLabel={tNav('submit')}
      />
    </form>
  );
}
