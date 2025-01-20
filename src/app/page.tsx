import CommonQuestion from "@/components/commonQuestion/CommonQuestion";
import Container from "@/components/container/Container";
import Features from "@/components/features/Features";
import Header from "@/components/header/Header";
import Introduction from "@/components/introduction/Introduction";
import Map from "@/components/map/Map";
import Reviews from "@/components/reviews/Reviews";
import Services from "@/components/services/Services";

export default function Home() {
  return (
    <div>
      <Container>
        <Header />
        <Features />
        <Services />
        <Introduction />
        <Reviews />
        <CommonQuestion />
        <Map />
      </Container>
    </div>
  );
}
