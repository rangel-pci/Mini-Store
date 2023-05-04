<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://raw.githubusercontent.com/rangel-pci/files/master/vue-ministore.png" alt="Project logo"></a>
</p>

<h3 align="center">Mini Store</h3>

<div align="center">

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Stripe](https://img.shields.io/badge/stripe-635BFF.svg?style=for-the-badge&logo=stripe&logoColor=white)

</div>

## 🗒️ Table of Contents

- [About](#about)
  - [Stripe Testing Card](#stripe_testing_card)
- [Built Using](#built_using)
- [Getting Started / Setup](#getting_started)
- [Final Thoughts](#Final_Thoughts)

## 💡 About <a name = "about"></a>
As the name suggests, just a small and simple store (and sort of a database-less application).<br>
When visiting Stripe's website, I became curious about how its API worked. So I decided to combine the useful with pleasant, integrating its payment API and in the process, improve some skills such as TS+Node and TS+Vue, as well as learning new tools such as Tailwind CSS.

- Features
  - Products data are stored in Stripe
  - Mobile-Friendly
  - PWA
  - Webhooks (At the moment, only for payment confirmation event. 🫠)
- Stripe Testing Card <a name = "stripe_testing_card"></a>
  - You can use this card to test the application under development or at [MiniStore.rangelpereira.com](https://ministore.rangelpereira.com/)<br>
  
  | BRAND | NUMBER | CVC | DATE |
  | --- | --- | --- | --- |
  | Mastercard | 5555 5555 5555 4444 | Any 3 digits | Any future date |

## ⛏️ Built Using <a name = "built_using"></a>

- NPM
- [Stripe CLI](https://stripe.com/docs/stripe-cli)
- [Cyclic.sh (Free API deploy)](https://www.cyclic.sh/)
- [Readme Pattern (Readme.md template generator)](https://marketplace.visualstudio.com/items?itemName=thomascsd.vscode-readme-pattern)
- Backend
  - [TypeScript](https://www.typescriptlang.org)
  - [Node.js](https://nodejs.org/en/)
  - [Express](https://expressjs.com/)
  - [Stripe-node](https://github.com/stripe/stripe-node)
- Frontend
  - [TypeScript](https://www.typescriptlang.org)
  - [Vue.js](https://vuejs.org/)
  - [Pinia](https://pinia.vuejs.org/)
  - [Vite PWA](https://vite-pwa-org.netlify.app/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Stripe-js](https://stripe.com/docs/js)


## 🏁 Getting Started / Setup<a name = "getting_started"></a>

These instructions will set the project up and running on your local machine for development and testing purposes.

1. Use /frontend/.env.example & /backend/.env.example to set up your environment.

### Backend Prerequisites
1. Stripe secret key
2. Stripe endpoint secret key (if you want to use webhooks)
3. To make webhooks work on development env, it is necessary to use [Stripe CLI](https://stripe.com/docs/webhooks/test).
4. Make sure that your products are in this format within Stripe.

```json
{
  "id": "generated_by_strip",
  "name": "name",
  "images": ["image_url"],
  "metadata": {
  "description_en": "description.",
  "description_pt": "description.",
  "maximum_brl": "25000",
  "maximum_usd": "5000",
  "minimum_brl": "1399",
  "minimum_usd": "269",
  "title_en": "product title",
  "title_pt": "product title",
  "total_raised_brl": "0",
  "total_raised_usd": "0",
  "total_sold": "0"
  }
}
```
5. Now you can follow [these steps](https://github.com/rangel-pci/Mini-Store/blob/master/backend/README.md) to get the server running.

### Frontend Prerequisites
1. Stripe public key
5. Now you can follow [these steps](https://github.com/rangel-pci/Mini-Store/blob/master/frontend/README.md) to get the client running.

## 📝 Final Thoughts <a name = "Final_Thoughts"></a>
- The Stripe service has a limit on the number of requests per second, which can ruin the user experience and even bring the system down if the application has a high volume of traffic.<br> Considering this, a solution that comes to mind and that I plan to study and implement in the future would be storing products in cache and updating them every 30/60 seconds, possibly using Redis.
- Well, at the moment the application doesn't use any database, but obviously in a real scenario where the level of complexity increases and the data structure must follow a business rule, a storage solution beyond Stripe would be necessary.