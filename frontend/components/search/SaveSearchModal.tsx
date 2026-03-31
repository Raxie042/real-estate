'use client';

import { useTranslations } from 'next-intl';

interface SaveSearchModalProps {
  isOpen: boolean;
  searchName: string;
  onSearchNameChange: (value: string) => void;
  saveNotifications: boolean;
  onSaveNotificationsChange: (value: boolean) => void;
  isSavingSearch: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function SaveSearchModal({
  isOpen,
  searchName,
  onSearchNameChange,
  saveNotifications,
  onSaveNotificationsChange,
  isSavingSearch,
  onClose,
  onSave,
}: SaveSearchModalProps) {
  const t = useTranslations('Search');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg p-6">
        <h3 className="text-xl font-semibold text-[#1C1A17] mb-4">{t('saveCurrentSearch')}</h3>
        <input
          type="text"
          value={searchName}
          onChange={(e) => onSearchNameChange(e.target.value)}
          placeholder={t('nameThisSearch')}
          className="lux-input mb-4"
        />
        <label className="flex items-center gap-2 text-sm text-[#5F5448] mb-6">
          <input
            type="checkbox"
            checked={saveNotifications}
            onChange={(e) => onSaveNotificationsChange(e.target.checked)}
          />
          {t('enableNotifications')}
        </label>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="lux-button-outline"
          >
            {t('cancel')}
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={isSavingSearch || !searchName.trim()}
            className="lux-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSavingSearch ? t('saving') : t('save')}
          </button>
        </div>
      </div>
    </div>
  );
}
