"use client";
import Script from "next/script";

/**
 * Analytics — Yandex Metrica + GA4
 *
 * Активируется только при наличии переменных окружения:
 *   NEXT_PUBLIC_YM_ID   — счётчик Яндекс Метрики (числовой ID)
 *   NEXT_PUBLIC_GA4_ID  — измерительный ID Google Analytics 4 (G-XXXXXXXXXX)
 *
 * Без переменных компонент ничего не рендерит — безопасно в dev.
 */
export function Analytics() {
  const ymId = process.env.NEXT_PUBLIC_YM_ID;
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;

  return (
    <>
      {/* ── Yandex Metrica ── */}
      {ymId && (
        <>
          <Script
            id="ym-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0];
                  k.async=1;k.src=r;a.parentNode.insertBefore(k,a)
                })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                ym(${ymId}, "init", {
                  clickmap: true,
                  trackLinks: true,
                  accurateTrackBounce: true,
                  webvisor: false
                });
              `,
            }}
          />
          <noscript>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://mc.yandex.ru/watch/${ymId}`}
                style={{ position: "absolute", left: "-9999px" }}
                alt=""
                width={1}
                height={1}
              />
            </div>
          </noscript>
        </>
      )}

      {/* ── Google Analytics 4 ── */}
      {ga4Id && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ga4Id}', { send_page_view: true });
              `,
            }}
          />
        </>
      )}
    </>
  );
}
