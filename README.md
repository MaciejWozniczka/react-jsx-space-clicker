# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Deployment

Pushes to `main` or `master` publish the static Vite build to
`https://space-clicker.mwozniczka.net` through `.github/workflows/deploy.yml`.

Before the first deployment:

1. In Cloudflare, keep the proxied `AAAA` record `space-clicker` pointing to the
   Mikrus IPv6 address and set **SSL/TLS encryption mode** to **Full (strict)**.
2. Create a Cloudflare Origin Certificate for `space-clicker.mwozniczka.net`.
   On Mikrus, install the certificate and private key at
   `/etc/ssl/cloudflare/space-clicker.mwozniczka.net.pem` and
   `/etc/ssl/cloudflare/space-clicker.mwozniczka.net.key`. The directory and key
   must be readable only by root (for example, directory mode `700`, key mode
   `600`).
3. Allow inbound HTTP/HTTPS traffic on ports 80 and 443 to the Mikrus server.
4. Add the GitHub repository secrets `SSH_HOST`, `SSH_USERNAME`, `SSH_PORT`, and
   `SSH_PRIVATE_KEY`. The SSH user needs passwordless `sudo` access for the
   Nginx configuration and `/var/www/react-space-clicker-game`.

The workflow leaves other Nginx sites untouched, deploys each build to a unique
release directory, and switches the `current` symlink only after validating the
Nginx configuration.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
