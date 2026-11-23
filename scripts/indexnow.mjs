// Signale à IndexNow (Bing, Yandex, Seznam, Naver…) toutes les URL du sitemap de production.
// Usage : node scripts/indexnow.mjs [https://www.vit-global.tech]
// La clé est publique par conception : elle est servie à la racine du site (/<clé>.txt) pour prouver la propriété.
const INDEXNOW_KEY = "8801c3130e61e299a248d1be553b7c75";
const site = (process.argv[2] ?? process.env.SITE_URL ?? "https://www.vit-global.tech").replace(/\/$/, "");
const host = new URL(site).host;

const keyResponse = await fetch(`${site}/${INDEXNOW_KEY}.txt`);
if (!keyResponse.ok || (await keyResponse.text()).trim() !== INDEXNOW_KEY) {
  console.error(`Clé IndexNow introuvable sur ${site}/${INDEXNOW_KEY}.txt : soumission annulée.`);
  process.exit(1);
}

const sitemap = await (await fetch(`${site}/sitemap.xml`)).text();
const urlList = [...new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]))].filter(
  (url) => new URL(url).host === host
);

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key: INDEXNOW_KEY, keyLocation: `${site}/${INDEXNOW_KEY}.txt`, urlList })
});

console.log(`IndexNow : ${urlList.length} URL envoyées, réponse HTTP ${response.status}`);
// 200 = accepté, 202 = reçu (clé en cours de vérification). Tout autre code est une erreur.
if (![200, 202].includes(response.status)) {
  console.error(await response.text());
  process.exit(1);
}
