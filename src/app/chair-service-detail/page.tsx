import Comment from '@/components/comment-section/Comment'
import Container from '@/components/container/Container'
import Reservation from '@/components/Reservation-Detail/Reservation'
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
        <Comment/>
      </Container>
    </div>
  )
}
