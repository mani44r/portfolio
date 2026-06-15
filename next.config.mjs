/** @type {import('next').NextConfig} */
const nextConfig = {
  // We reproduce the PHP site exactly; no eslint/type build gates while migrating.
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
  // Allow Supabase storage + R2 media as plain <img> (we keep markup identical, no next/image).
  images: { unoptimized: true },
  // Static chaicode microsites (cursor, mintlify, february) live in /public.
  // Their asset paths were absolutised, so we just serve index.html at the
  // clean URL (no trailing slash — avoids Next's slash-normalisation loop).
  async rewrites() {
    return [
      { source: '/chaicode/cursor', destination: '/chaicode/cursor/index.html' },
      { source: '/chaicode/mintlify', destination: '/chaicode/mintlify/index.html' },
      { source: '/chaicode/february', destination: '/chaicode/february/index.html' },
    ];
  },
  async headers() {
    return [
      {
        // Static assets we copied verbatim from the PHP site get long cache + immutable.
        // Edits bust the cache via the ?v=<buildId> query our Scripts component appends.
        source: '/:all*(css|js|svg|png|jpg|jpeg|webp|ico|woff|woff2|mp4|pdf)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
