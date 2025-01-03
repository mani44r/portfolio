# Deploy Manikanta Portfolio

> Last updated: Jan 2025

Production build verified: `npm run build`

## Fastest: Vercel (recommended)

Free HTTPS URL in ~5 minutes. No VPS required.

### 1. Push code to your GitHub

```powershell
cd "c:\Users\manik\OneDrive\Desktop\portfolioo\mani"

# Create a new repo at https://github.com/new named e.g. portfolio
# Then:
git remote set-url origin https://github.com/mani44r/portfolio.git
git add .
git commit -m "Manikanta AI engineer portfolio — ready for deploy"
git push -u origin main
```

### 2. Import on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Sign in with GitHub → import `mani44r/portfolio`
3. Framework: **Next.js** (auto-detected)
4. **Environment variables** → add:
   - `NEXT_PUBLIC_SITE_URL` = `https://your-project.vercel.app` (update after first deploy with the real URL)
5. Click **Deploy**

### 3. After deploy

- Open the Vercel URL and hard-refresh
- Update `NEXT_PUBLIC_SITE_URL` in Vercel → Settings → Environment Variables to match your live URL
- Redeploy once (Deployments → ⋯ → Redeploy)

### Custom domain (optional)

Vercel → Project → Settings → Domains → add your domain and follow DNS steps.

---

## Alternative: VPS (GitHub Actions)

Use only if you have your own server (not brother's `veeshal.me` VPS unless you own it).

### GitHub secrets (repo → Settings → Secrets)

| Secret | Example |
|--------|---------|
| `VPS_HOST` | `123.45.67.89` |
| `VPS_USER` | `www-data` or your SSH user |
| `VPS_SSH_KEY` | Private key (full PEM) |
| `VPS_PATH` | `/var/www/portfolio` |

### One-time on VPS

```bash
# Node 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs git nginx

sudo mkdir -p /var/www/portfolio
sudo chown $USER:$USER /var/www/portfolio
git clone https://github.com/mani44r/portfolio.git /var/www/portfolio
cd /var/www/portfolio
npm ci && npm run build

# .env.local on server
nano .env.local   # NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### systemd service (`/etc/systemd/system/mani-next.service`)

```ini
[Unit]
Description=Manikanta Portfolio Next.js
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/portfolio
ExecStart=/usr/bin/npm run start
Restart=always
Environment=NODE_ENV=production
Environment=PORT=3003

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now mani-next
```

Point nginx `proxy_pass` to `http://127.0.0.1:3003`.

Update `.github/workflows/deploy.yml` → change `veeshal-next` to `mani-next`.

---

## CLI deploy (no GitHub)

```powershell
cd mani
npx vercel login
npx vercel --prod
```

Set `NEXT_PUBLIC_SITE_URL` when prompted or in the Vercel dashboard afterward.
