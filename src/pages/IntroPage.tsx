import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react'
import { bookOutline, extensionPuzzleOutline, trendingUpOutline } from 'ionicons/icons'
import './IntroPage.css'

const features = [
  {
    icon: bookOutline,
    title: 'The grammar other apps skip',
    text: 'Articles, endings, pronouns and tenses, explained in short rule cards you can come back to.',
  },
  {
    icon: extensionPuzzleOutline,
    title: 'Practice that feels like play',
    text: 'Fill the blank, fix the mistake, sort the words. Quick games with instant feedback.',
  },
  {
    icon: trendingUpOutline,
    title: 'One step at a time',
    text: 'Small units that build on each other, so the tricky bits finally stick.',
  },
]

export default function IntroPage() {
  return (
    <IonPage>
      <IonContent className="intro-content">
        <div className="intro-card">
          <div className="intro-flag" aria-hidden="true" />

          <div className="intro-body">
            <header className="intro-header">
              <span className="intro-eyebrow">Learn Italian</span>
              <h1 className="intro-title">
                Italian grammar, <span className="intro-highlight">without the groan.</span>
              </h1>
              <p className="intro-lead">
                Most apps teach you words. This one teaches you how they fit together, in bite-sized
                lessons that stay light and fun.
              </p>
            </header>

            <ul className="intro-features">
              {features.map((feature) => (
                <li key={feature.title} className="intro-feature">
                  <div className="intro-feature-icon">
                    <IonIcon icon={feature.icon} aria-hidden="true" />
                  </div>
                  <div className="intro-feature-text">
                    <span className="intro-feature-title">{feature.title}</span>
                    <span className="intro-feature-desc">{feature.text}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="intro-footer">
              <IonButton expand="block" className="intro-continue">
                Continue
              </IonButton>
              <p className="intro-note">Andiamo! It only takes a few minutes a day.</p>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
