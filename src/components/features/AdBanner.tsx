'use client';

interface AdBannerProps {
  slot?: string;
  format?: 'horizontal' | 'rectangle';
}

// 広告バナー（実際の広告コードは後で差し替え）
export function AdBanner({ slot = 'ad-slot-1', format = 'horizontal' }: AdBannerProps) {
  const isHorizontal = format === 'horizontal';

  return (
    <div
      className={`flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/30 ${
        isHorizontal ? 'h-20 w-full max-w-md' : 'h-64 w-full max-w-xs'
      }`}
      data-ad-slot={slot}
      role="complementary"
      aria-label="広告"
    >
      <div className="text-center">
        <p className="text-xs text-gray-400 dark:text-gray-500">広告スペース</p>
        <p className="text-[10px] text-gray-300 dark:text-gray-600">
          {isHorizontal ? '320x100' : '300x250'}
        </p>
      </div>
    </div>
  );
}

// Google AdSense用のコンポーネント（実装時に使用）
export function GoogleAdBanner({
  client,
  slot,
  format = 'auto',
  responsive = true,
}: {
  client: string;
  slot: string;
  format?: string;
  responsive?: boolean;
}) {
  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    />
  );
}
