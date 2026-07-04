import { useState } from 'react';
import { classNames } from '../../utils/helpers';

export default function Tabs({ tabs = [], defaultIndex = 0, onChange }) {
  const [active, setActive] = useState(defaultIndex);

  const select = (i) => {
    setActive(i);
    onChange?.(i);
  };

  return (
    <div>
      <div className="flex gap-1 border-b border-base-300 overflow-x-auto">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            onClick={() => select(i)}
            className={classNames(
              'px-4 py-2.5 text-sm font-medium border-b-2 -mb-px whitespace-nowrap transition-colors',
              active === i
                ? 'border-primary text-primary'
                : 'border-transparent text-base-content/60 hover:text-base-content'
            )}
          >
            {t.label}
            {t.count !== undefined && (
              <span className="ml-2 badge badge-sm badge-ghost">{t.count}</span>
            )}
          </button>
        ))}
      </div>
      <div className="pt-5">{tabs[active]?.content}</div>
    </div>
  );
}
