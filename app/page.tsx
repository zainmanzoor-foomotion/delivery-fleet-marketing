import Navbar from './components/Navbar'
import Header from './components/Header'
import SavingsCalculator from './components/SavingsCalculator'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        <Header />
        <SavingsCalculator />
      </main>
      <Footer />
    </>
  )
}
