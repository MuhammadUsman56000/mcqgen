import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BlogPostsSection from '@/components/BlogPostsSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <BlogPostsSection />
      <Footer />
    </main>
  );
}
