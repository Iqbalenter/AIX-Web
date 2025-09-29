import { useEffect } from 'react'
import { useTranslation, Trans } from 'react-i18next'

const Home = () => {
    const { t, i18n } = useTranslation() // defaultNS: 'common'

    // sinkronkan <html lang> dan <title>
    useEffect(() => {
        document.documentElement.lang = i18n.language
        document.title = t('title')
    }, [i18n.language, t])

    const changeLang = (lng) => i18n.changeLanguage(lng)
    
    return (
        <div>
            <h1>{t('title')}</h1>
            <p>{t('hello', { name: 'Iqbal' })}</p>

            <nav style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                <a href="/">{t('nav.home')}</a>
                <a href="/about">{t('nav.about')}</a>
            </nav>

            <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => changeLang('id')}>Bahasa Indonesia</button>
                <button onClick={() => changeLang('en')}>English</button>
            </div>

            <section style={{ marginTop: 24 }}>
                {/* Contoh rich text dengan <Trans/> */}
                {/* Tambahkan di JSON:
                    "welcomeRich": "Selamat datang di <bold>{{app}}</bold> — mulai <link>pelajari</link> sekarang!"
                */}
                <Trans
                i18nKey="welcomeRich"
                values={{ app: t('title') }}
                components={{
                    bold: <strong />,
                    link: <a href="/docs" />
                }}
                />
            </section>
        </div>
    )
}

export default Home;