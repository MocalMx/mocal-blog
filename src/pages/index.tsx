import * as React from "react";
import { graphql } from "gatsby";
import { getImage, type IGatsbyImageData } from "gatsby-plugin-image";
import type { HeadFC, PageProps } from "gatsby";
import { Layout } from "../components/layout/Layout";
import { Seo } from "../components/seo";
import {
  Shield,
  Calendar,
  Headphones,
  BookOpen,
  Building2,
  Users,
} from "lucide-react";
import {
  CategoriesSection,
  type CategoryCard,
  FeaturedArticlesSection,
  type FeaturedArticle,
  FinalCtaSection,
  HeroSection,
  HostCtaSection,
  HowItWorksSection,
  type HowItWorksStep,
  NewsletterSection,
  WhyMocalSection,
  type WhyMocalItem,
} from "../components/home";
import type { MyQueryQuery } from "../graphql/__generated__/types";

const categories: CategoryCard[] = [
  {
    title: "Oficinas Privadas",
    description: "Consejos para elegir la oficina perfecta para tu equipo.",
    icon: Building2,
    colorClassName: "bg-primary/10 text-primary",
  },
  {
    title: "Coworking",
    description: "Tendencias y guías sobre espacios de coworking.",
    icon: Users,
    colorClassName: "bg-brand/10 text-brand",
  },
  {
    title: "Salas de Juntas",
    description: "Tips para organizar reuniones productivas.",
    icon: BookOpen,
    colorClassName: "bg-highlight text-highlight-foreground",
  },
];

const whyMocal: WhyMocalItem[] = [
  {
    title: "Reservas seguras",
    description: "Pago protegido y cancelación flexible.",
    icon: Shield,
  },
  {
    title: "Flexibilidad",
    description: "Por hora, día o mes según lo que necesites.",
    icon: Calendar,
  },
  {
    title: "Soporte 24/7",
    description: "Estamos aquí cuando nos necesites.",
    icon: Headphones,
  },
];

const howItWorks: HowItWorksStep[] = [
  {
    step: "1",
    title: "Busca",
    description: "Explora espacios por ubicación, precio y disponibilidad.",
  },
  {
    step: "2",
    title: "Reserva",
    description: "Elige fecha y hora y confirma tu reserva al instante.",
  },
  {
    step: "3",
    title: "Disfruta",
    description: "Gestiona tus reservas y reseñas desde tu panel.",
  },
];

function estimateReadTimeFromRawRichText(
  raw: string | null | undefined,
): string {
  if (!raw) return "";
  const text = raw.replace(/\\s+/g, " ").trim();
  if (!text) return "";
  // Very rough estimate: Contentful Rich Text JSON is noisy; we approximate by character length.
  const words = Math.max(1, Math.round(text.length / 5));
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

type IndexPageProps = PageProps<MyQueryQuery>;

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const featuredArticles: FeaturedArticle[] = (
    data.allContentfulBlogPost.nodes ?? []
  ).map((node: MyQueryQuery["allContentfulBlogPost"]["nodes"][number]) => {
    const firstCategory = node.categories?.title ?? "General";
    const readTime = estimateReadTimeFromRawRichText(node.content?.raw);
    const coverImage = getImage(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      (node.coverImage?.gatsbyImage as IGatsbyImageData | null) ?? null,
    );
    return {
      title: node.title ?? "",
      excerpt: node.abstract ?? "",
      category: firstCategory,
      readTime,
      slug: node.slug ?? "",
      coverImage: coverImage ?? undefined,
    };
  });

  return (
    <Layout>
      <HeroSection backgroundImageUrl="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80" />
      <HowItWorksSection steps={howItWorks} />
      <CategoriesSection categories={categories} />

      <FeaturedArticlesSection articles={featuredArticles} />

      <HostCtaSection
        cta={{
          label: "Lista tu espacio",
          href: "https://mocal.com.mx/about/publish-your-space",
        }}
      />
      <WhyMocalSection items={whyMocal} />
      <FinalCtaSection
        cta={{ label: "Explorar espacios", href: "https://mocal.com.mx/search" }}
      />
      <NewsletterSection />
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC<MyQueryQuery> = ({ data, location }) => {
  const siteUrl = data.site?.siteMetadata?.siteUrl ?? "https://blog.mocal.com.mx";
  const siteName = data.site?.siteMetadata?.title ?? "Blog de Mocal";
  const title = data.site?.siteMetadata?.title ?? "Blog de Mocal";
  const description = data.site?.siteMetadata?.description ?? "";

  return (
    <Seo
      siteUrl={siteUrl}
      siteName={siteName}
      title={title}
      description={description}
      pathname={location.pathname}
      type="website"
    />
  );
};

export const query = graphql`
  query MyQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allContentfulBlogPost(limit: 3, sort: { updatedAt: ASC }) {
      nodes {
        ...ContentfulBlogPostFragment
      }
    }
  }
`;
