"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PostCard } from "@/components/ui/PostCard";
import { Pagination } from "@/components/ui/Pagination";
import Image from "next/image";
import Link from "next/link";
import { blogPageContent } from "@/lib/constants";

export default function BlogPage() {
  const { hero, featured, categories, posts } = blogPageContent;
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");
  const postsPerPage = 6;

  // Filter posts based on category
  const filteredPosts =
    activeCategory === "all"
      ? posts
      : posts.filter((post) => post.category.toLowerCase() === activeCategory);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage,
  );

  return (
    <>
      {/* Hero Section */}
      <Section background="white" className="border-b border-zinc-100">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            // badge={hero.badge}
            title={hero.title}
            description={hero.description}
            align="center"
          />
        </div>
      </Section>

      {/* Featured Article */}
      <Section>
        <Link href={`/blog/${featured.slug}`} className="group cursor-pointer">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 overflow-hidden rounded-lg">
              <div className="aspect-video bg-zinc-200 relative transition-transform duration-700 group-hover:scale-105">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-accent-burgundy text-xs font-bold uppercase tracking-widest">
                  {featured.category}
                </span>
                <span className="text-zinc-300">•</span>
                <span className="text-zinc-500 text-xs font-medium uppercase tracking-widest">
                  Featured
                </span>
              </div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-primary mb-6 leading-tight group-hover:text-accent-burgundy transition-colors">
                {featured.title}
              </h2>
              <p className="text-zinc-600 text-base leading-relaxed mb-8">
                {featured.description}
              </p>
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-full bg-zinc-200 relative overflow-hidden">
                  <Image
                    src={featured.author.image}
                    alt={featured.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-primary">
                    {featured.author.name}
                  </p>
                  <p className="text-xs text-zinc-500 font-sans uppercase tracking-tight">
                    {featured.date} • {featured.readTime}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </Section>

      {/* Article Grid */}
      <Section background="gray" className="border-t border-zinc-200">
        <div className="flex items-end justify-between mb-12">
          <h3 className="text-2xl font-bold text-primary uppercase tracking-tighter">
            Latest Stories
          </h3>
          <div className="hidden md:flex gap-4">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => {
                  setActiveCategory(category.value);
                  setCurrentPage(1);
                }}
                className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                  activeCategory === category.value
                    ? "text-accent-burgundy border-b-2 border-accent-burgundy"
                    : "text-zinc-400 hover:text-primary"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {paginatedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Section>
    </>
  );
}
