import Container from "@/components/container/Container";
import Features from "@/components/features/Features";
import Header from "@/components/header/Header";
import Introduction from "@/components/introduction/Introduction";
import Services from "@/components/services/Services";

export default function Home() {
  return (
    <div>
      <Container>
        <Header />
        <Features />
        <Services />
        <Introduction />
      </Container>
    </div>
  );
}
