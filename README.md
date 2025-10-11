# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Environment variables (Razorpay)

This project uses Razorpay for donations. To run the donate flow locally you must provide keys for the frontend and backend.

Frontend (Vite) — create a `.env` file in the project root with:

```env
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id_here
```

Backend — create a `.env` file inside the `backend/` folder with:

```env
RAZORPAY_KEY_ID=rzp_test_your_key_id_here
RAZORPAY_SECRET=your_razorpay_secret_here
```

Notes:

- The frontend should only contain the Razorpay key id (no secret). Vite exposes variables that begin with `VITE_` to client code.
- Never commit `.env` files with real secrets. Use `.env.example` files (already included) and a secret manager for production.
- If you see "Payment not configured: missing VITE_RAZORPAY_KEY_ID in environment." in the browser, confirm the `.env` file is present in the frontend root and you restarted the dev server after adding it.
