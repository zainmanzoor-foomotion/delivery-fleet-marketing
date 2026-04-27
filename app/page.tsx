import Header from './components/Header'
import HowItWorks from './components/HowItWorks'
import BoostSales from './components/BoostSales'
import SmartMarketing from './components/SmartMarketing'
import SavingsCalculator from './components/SavingsCalculator'
import CutCosts from './components/CutCosts'
import ContactForm from './components/ContactForm'

export default function Home() {
  return (
    <>
      <main className="flex-1 bg-white">
        <Header />
        <HowItWorks />
        <BoostSales />
        <CutCosts/>
        <SmartMarketing />
        <SavingsCalculator />
        <ContactForm />
      </main>
    </>
  )
}
