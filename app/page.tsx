import Navbar from './components/Navbar'
import Header from './components/Header'
import HowItWorks from './components/HowItWorks'
import BoostSales from './components/BoostSales'
import SmartMarketing from './components/SmartMarketing'
import SavingsCalculator from './components/SavingsCalculator'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        <Header />
        <HowItWorks />
        <BoostSales />
        <SmartMarketing />
        <SavingsCalculator />
      </main>
      <Footer />
    </>
  )
}
