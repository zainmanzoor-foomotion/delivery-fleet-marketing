import Navbar from './components/Navbar'
import Header from './components/Header'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        <Header />
      </main>
      <Footer />
    </>
  )
}
