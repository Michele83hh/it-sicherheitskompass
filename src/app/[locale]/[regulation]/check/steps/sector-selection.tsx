'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { useWizardStore } from '@/stores/wizard-store';
import { getSectorsByAnlage } from '@/lib/regulations/nis2/sectors';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { WizardNavigation } from '../components/navigation';

export function SectorSelectionStep() {
  const t = useTranslations('check.sectorStep');
  const tNav = useTranslations('check.navigation');
  const tSectors = useTranslations('sectors');
  const { formData, updateFormData, nextStep, setStep } = useWizardStore();

  // Schema defined inside component to access t()
  const sectorSchema = z.object({
    sectorId: z.string().min(1, t('sectorRequired')),
    subsectorId: z.string().nullable(),
  });

  type SectorFormData = z.infer<typeof sectorSchema>;

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SectorFormData>({
    resolver: zodResolver(sectorSchema),
    mode: 'onSubmit',
    defaultValues: {
      sectorId: formData.sectorId || '',
      subsectorId: formData.subsectorId || null,
    },
  });

  const selectedSectorId = watch('sectorId');

  // Get all sectors
  const anlage1Sectors = getSectorsByAnlage(1);
  const anlage2Sectors = getSectorsByAnlage(2);
  const allSectors = [...anlage1Sectors, ...anlage2Sectors];

  // Find selected sector to check for subsectors
  const selectedSector = allSectors.find((s) => s.id === selectedSectorId);

  // Reset subsectorId when sector changes
  useEffect(() => {
    if (selectedSectorId && selectedSectorId !== 'not-listed') {
      setValue('subsectorId', null);
    }
  }, [selectedSectorId, setValue]);

  const onSubmit = (data: SectorFormData) => {
    // Handle "not listed" shortcut
    if (data.sectorId === 'not-listed') {
      updateFormData({ sectorId: 'not-listed' });
      setStep(2); // Jump to result
      return;
    }

    updateFormData(data);
    nextStep();
  };

  // Helper to translate sector/subsector names
  const getSectorName = (nameKey: string) => {
    // nameKey is like "sectors.energy.name", we need "energy.name" for scoped translation
    const scopedKey = nameKey.split('.').slice(1).join('.');
    return tSectors(scopedKey);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        {/* Sector selection */}
        <div className="space-y-2">
          <Label htmlFor="sector">{t('sectorLabel')}</Label>
          <Controller
            name="sectorId"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="sector"
                  className={errors.sectorId ? 'border-red-500' : ''}
                  aria-invalid={!!errors.sectorId}
                  aria-describedby={errors.sectorId ? 'sector-error' : undefined}
                >
                  <SelectValue placeholder={t('sectorPlaceholder')} />
                </SelectTrigger>
                <SelectContent position="popper" className="max-h-[60vh]">
                  <SelectGroup>
                    <SelectLabel>{t('anlage1Group')}</SelectLabel>
                    {anlage1Sectors.map((sector) => (
                      <SelectItem key={sector.id} value={sector.id}>
                        {getSectorName(sector.nameKey)}
                      </SelectItem>
                    ))}
                  </SelectGroup>

                  <Separator className="my-2" />

                  <SelectGroup>
                    <SelectLabel>{t('anlage2Group')}</SelectLabel>
                    {anlage2Sectors.map((sector) => (
                      <SelectItem key={sector.id} value={sector.id}>
                        {getSectorName(sector.nameKey)}
                      </SelectItem>
                    ))}
                  </SelectGroup>

                  <Separator className="my-2" />

                  <SelectItem value="not-listed">{t('notListed')}</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.sectorId && (
            <p id="sector-error" className="text-sm text-red-600">
              {errors.sectorId.message}
            </p>
          )}
        </div>

        {/* Conditional subsector selection */}
        {selectedSector && selectedSector.subsectors.length > 0 && (
          <div className="space-y-2">
            <Label htmlFor="subsector">{t('subsectorLabel')}</Label>
            <Controller
              name="subsectorId"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value || undefined}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger id="subsector">
                    <SelectValue placeholder={t('subsectorPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent position="popper" className="max-h-[60vh]">
                    {selectedSector.subsectors.map((subsector) => (
                      <SelectItem key={subsector.id} value={subsector.id}>
                        {getSectorName(subsector.nameKey)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        )}
      </div>

      <WizardNavigation
        isFirstStep={true}
        isLastStep={false}
        nextLabel={tNav('next')}
      />
    </form>
  );
}
