import { notFound } from "next/navigation";

// Toute URL inconnue sous /fr, /en ou /ar affiche la page 404 localisée et aux couleurs du site
// (au lieu de la page 404 générique de Next.js, en anglais).
export default function CatchAllNotFound() {
  notFound();
}
