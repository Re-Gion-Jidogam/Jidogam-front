"use client";

import TextInput from "@/components/TextInput";
import Toggle from "@/components/Toggle";

const DESCRIPTION_MAX_LENGTH = 300;

interface GuidebookFormSectionProps {
  isPublished: boolean;
  canPublish: boolean;
  description: string;
  onPublishToggle: () => void;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
}

export default function GuidebookFormSection({
  isPublished,
  canPublish,
  description,
  onPublishToggle,
  onTitleChange,
  onDescriptionChange,
}: GuidebookFormSectionProps) {
  return (
    <>
      <section className="py-1">
        <div className="relative inline-flex">
          <div className="pointer-events-none">
            <Toggle
              key={String(isPublished)}
              label="가이드북 출판"
              initial={isPublished}
              disabled={!canPublish}
            />
          </div>
          {canPublish && (
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={onPublishToggle}
            />
          )}
        </div>
      </section>

      <TextInput
        placeholder="가이드북 제목"
        maxLength={20}
        onChange={(e) => onTitleChange(e.target.value)}
      />

      <DescriptionTextarea value={description} onChange={onDescriptionChange} />
    </>
  );
}

interface DescriptionTextareaProps {
  value: string;
  onChange: (value: string) => void;
}

function DescriptionTextarea({ value, onChange }: DescriptionTextareaProps) {
  const isBlank = value.length === 0;

  return (
    <div className="group flex flex-col gap-1 font-medium text-gray-600 transition-all">
      <div className="relative flex flex-col bg-gray-0 px-4.5 py-4.5 transition-all border border-gray-300 focus-within:border-primary-300 rounded-xl">
        {isBlank && (
          <label className="absolute left-4.5 top-4.5 text-sm font-medium text-gray-600 pointer-events-none">
            가이드북 설명
          </label>
        )}

        <textarea
          value={value}
          rows={6}
          onChange={(e) => {
            if (e.target.value.length <= DESCRIPTION_MAX_LENGTH) {
              onChange(e.target.value);
            }
          }}
          className="relative flex-1 outline-none text-sm font-medium text-gray-800 resize-none bg-transparent z-10"
        />

        <div className="flex justify-end mt-1">
          <span className="text-xs">
            {value.length} / {DESCRIPTION_MAX_LENGTH}
          </span>
        </div>
      </div>
    </div>
  );
}
