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
    <section id="marketing" className="w-full px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl text-center mb-14">
        <h2 className="text-3xl sm:text-4xl md:text-[54px] font-bold text-text-1">
          Smart Marketing Built-In
        </h2>
        <p className="mt-4 text-base sm:text-2xl text-text-2 max-w-4xl mx-auto">
          Don&apos;t just deliver food. Deliver experiences that turn first-time customers into
          loyal fans with our automated marketing suite.
        </p>
      </div>

      <div className="mx-auto max-w-7xl mb-16 rounded-2xl bg-[#FAFAFB] px-4 sm:px-10 pt-6 sm:pt-10 flex flex-col md:flex-row items-center md:items-end justify-center gap-2 overflow-hidden">
        <div className="w-40 sm:w-52 md:w-60 shrink-0">
          <Image
            src="/11 1.png"
            alt="Google review prompt"
            width={190}
            height={380}
            className="w-full h-auto drop-shadow-xl"
          />
        </div>
        <div className="w-48 sm:w-60 md:w-70 shrink-0">
          <Image
            src="/22 2.png"
            alt="Delivery tracking"
            width={230}
            height={460}
            className="w-full h-auto drop-shadow-xl"
          />
        </div>
        <div className="w-40 sm:w-52 md:w-60 shrink-0">
          <Image
            src="/33 1.png"
            alt="SMS marketing"
            width={190}
            height={380}
            className="w-full h-auto drop-shadow-xl"
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {features.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex flex-col items-center text-center gap-3">
            <div className={`h-14 w-14 border border-[#E5E7EB] rounded-2xl flex items-center justify-center`}>
              <Icon size={34} />
            </div>
            <p className="text-base sm:text-xl font-semibold text-text-1">{title}</p>
            <p className="text-xs sm:text-sm text-text-2">{description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
