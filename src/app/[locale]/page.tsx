import { useTranslations } from "next-intl"

export default function Home() {
  const t = useTranslations("home")

  return (
    <main>
      <h1 className="mt-16">{t("test")}</h1>
    </main>
  )
}
