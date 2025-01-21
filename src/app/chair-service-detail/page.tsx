import Container from '@/components/container/Container'
import Reservation from '@/components/reservation-detail/Reservation'
import ReservFeature from '@/components/reservation-features/ReservFeature'
import ReservIntroduction from '@/components/reservation-introduction/ReservIntroduction'
import ReversColumn from '@/components/reservColumn/ReversColumn'
import React from 'react'

export default function ServiceDetails() {
  return (
    <div className='mt-[80px] bg-[#F4F5FC]'>
      <Container>
        <Reservation />
        <ReservIntroduction/>
        <ReservFeature />
        <ReversColumn />
      </Container>
    </div>
  )
}
