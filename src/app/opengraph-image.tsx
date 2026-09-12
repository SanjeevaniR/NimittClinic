import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';

/**
 * Social share card, rendered at request time and cached by Next.
 * Uses only system fonts so no font file has to be fetched at build.
 */
export const alt = `${siteConfig.name}, ${siteConfig.address.city} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: '68px 72px',
          background:
            'linear-gradient(112deg, #2b0a31 0%, #43124c 34%, #6b2a7b 64%, #b8912c 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 62,
              height: 62,
              borderRadius: 18,
              background: 'linear-gradient(135deg, #ebc965, #b8912c)',
              color: '#2b0a31',
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            N
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#fffdf8', fontSize: 34, fontWeight: 700 }}>
              {siteConfig.name}
            </span>
            <span
              style={{
                color: '#ebc965',
                fontSize: 17,
                letterSpacing: 4,
                textTransform: 'uppercase',
              }}
            >
              {siteConfig.address.city}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              color: '#fffdf8',
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Leading Specialists,
          </span>
          <span
            style={{
              color: '#ebc965',
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Personalized Care
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            paddingTop: 26,
            borderTop: '1px solid rgba(255,253,248,0.22)',
          }}
        >
          <span style={{ color: 'rgba(255,253,248,0.9)', fontSize: 25 }}>
            Obstetrics · Gynaecology · Internal Medicine
          </span>
        </div>
      </div>
    ),
    size,
  );
}
