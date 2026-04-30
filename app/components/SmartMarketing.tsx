import Image from 'next/image'
import { BusinessIcon } from '@/components/icons/business'
import { DatabaseIcon } from '@/components/icons/database'
import { MessageIcon } from '@/components/icons/message'
import { StarIcon } from '@/components/icons/star'

const features = [
  {
    icon: BusinessIcon,
    title: 'Branded Tracking',
    description:
      'Keep your brand front-and-center with live tracking links that look and feel exactly like your business.',
  },
  {
    icon: DatabaseIcon,
    title: 'Own Your Data',
    description:
      'Capture marketing opt-ins with every order to build a loyal database you actually own and control.',
  },
  {
    icon: StarIcon,
    title: 'Auto Reviews',
    description:
      'Keep your brand front-and-center with live tracking links that look and feel exactly like your business.',
  },
  {
    icon: MessageIcon,
    title: 'Integrated SMS',
    description:
      'Launch targeted promotions and "we miss you" campaigns with a fully customizable SMS marketing engine.',
  },
]

export default function SmartMarketing() {
  return (
    <section id="marketing" className="w-full px-4 py-14 sm:py-16 flex flex-col">
      <div className="mx-auto w-full max-w-7xl flex flex-col gap-5">

        {/* Section 1 — Title: 12vh */}
        <div className="h-[12vh] flex flex-col items-center justify-center text-center max-w-4xl mx-auto w-full">
          <h2 className="text-2xl sm:text-3xl md:text-[54px] font-bold text-text-1">
            Smart Marketing Built-In
          </h2>
          <p className="mt-2 text-sm sm:text-base md:text-xl text-text-2 max-w-4xl mx-auto">
            Don&apos;t just deliver food. Deliver experiences that turn first-time customers into
            loyal fans with our automated marketing suite.
          </p>
        </div>

        {/* Section 2 — Images: 60vh */}
        <div className="h-[30vh] sm:h-[55vh] rounded-2xl bg-[#FAFAFB] flex justify-center items-end gap-2 overflow-hidden">
          {/* Left — 80% of panel height */}
          <div className="w-[28%] sm:w-auto h-[80%] flex justify-end items-end">
            <Image
              src="/11 1.png"
              alt="Google review prompt"
              width={150}
              height={200}
              className="w-full h-full object-contain"
            />
          </div>
          {/* Center — 90% of panel height */}
          <div className="w-[44%] sm:w-auto h-[90%] flex justify-center items-end">
            <Image
              src="/22 2.png"
              alt="Delivery tracking"
              width={190}
              height={400}
              className="w-full h-full object-contain"
            />
          </div>
          {/* Right — 80% of panel height */}
          <div className="w-[28%] sm:w-auto h-[80%] flex justify-start items-end">
            <Image
              src="/33 1.png"
              alt="SMS marketing"
              width={150}
              height={200}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Section 3 — Features: 20vh */}
        <div className="h-[48vh] sm:h-[20vh] flex items-start">
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-10">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex flex-col items-center text-center gap-2">
                <div className="h-11 w-11 sm:h-14 sm:w-14 border border-[#E5E7EB] rounded-2xl flex items-center justify-center">
                  <Icon size={28} />
                </div>
                <p className="text-sm sm:text-xl font-semibold text-text-1">{title}</p>
                <p className="text-xs sm:text-sm text-text-2">{description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
